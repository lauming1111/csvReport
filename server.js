const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const moment = require('moment');
const { Promise } = require('bluebird');
const NodeCache = require("node-cache");
const os = require('os');

const config = require('./config');
const { generator } = require('./generator');
const app = express();
const cache = new NodeCache();

// native json parser
app.use(express.json());

app.get('/listFile', cors(), async (req, res) => {
  try {
    console.log(`list file from ${config.csvExportTo}`);
    const filesInDir = await fs.promises.readdir(config.csvExportTo);
    const csvFiles = filesInDir.filter(r => path.extname(r) === '.csv');
    const monthRange = moment(config.workingDate.to, config.workingDate.format).diff(moment(config.workingDate.since, config.workingDate.format), 'months') + 1;

    const groupBy = {};
    await Promise.map([...Array(monthRange).keys()], async (newMonth) => {
      const month = moment(config.workingDate.since, config.workingDate.format).add(newMonth, 'months').format('YYYY-MM');
      groupBy[month] = csvFiles.filter(r => r.startsWith(month));
    }, { concurrency: config.maxConcurrency || os.cpus().length }); // run in parallel

    res.json(groupBy);
  } catch (e) {
    res.json({});
  }
});

app.post('/readFile', cors(), async (req, res) => {
  try {
    const { month, data } = req.body;
    let csvInMonths = [];

    if (!cache.has(month)) {
      console.log(`read ${month} from ${config.csvExportTo}`);
      for (const date of data[month]) {
        console.log(`reading ${date}`);
        csvInMonths.push({
          filename: date,
          data: fs.readFileSync(path.join(config.csvExportTo, date), 'utf8')
        });
      }
      console.log(`add csv in ${month} to cache `);
      cache.set(month, csvInMonths, 30000);
    } else {
      console.log(`using cache to read ${month}`);
      csvInMonths = cache.get(month);
    }

    res.json({
      month,
      data: csvInMonths,
    });
  } catch (e) {
    console.error(e);
    res.json({
      month: null,
      data: [],
    });
  }
});

app.post('/readCSVs', cors(), async (req, res) => {
  console.log(`readCSVs ${path.join(config.csvExportTo, req.body.date)}`);
  res.json({
    data: fs.readFileSync(path.join(config.csvExportTo, req.body.date), 'utf8'),
  });
});

app.get('/runGenertor', cors(), async (req, res) => {
  // clear all cache before regeneration
  cache.flushAll();
  // generate follow by config.js settings
  generator();

  res.json({
    running: true,
    config,
    range: moment(config.workingDate.to, config.workingDate.format).diff(moment(config.workingDate.since, config.workingDate.format), 'days'), // count days in the range
    status: 0,
  });
});

// count CSVs in folder for progress bar
app.get('/statusGenertor', cors(), async (req, res) => {
  const filesInDir = await fs.promises.readdir(config.csvExportTo);
  const csvFiles = filesInDir.filter(r => path.extname(r) === '.csv');

  res.json({
    running: true,
    config,
    status: csvFiles.length
  });
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
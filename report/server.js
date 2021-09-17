const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const moment = require('moment');
const { Promise } = require('bluebird');

const config = require('../config');
const app = express();

// native json parser
app.use(express.json());

app.get('/listFile', cors(), async (req, res) => {
  console.log(`read file from ${config.csvExportTo}`);
  const filesInDir = await fs.promises.readdir(config.csvExportTo);
  const csvFiles = filesInDir.filter(r => path.extname(r) === '.csv');
  const monthRange = moment(config.workingDate.to, config.workingDate.format).diff(moment(config.workingDate.since, config.workingDate.format), 'months') + 1;

  const groupBy = {};
  await Promise.map([...Array(monthRange).keys()], async (newMonth) => {
    const month = moment(config.workingDate.since, config.workingDate.format).add(newMonth, 'months').format('YYYY-MM');
    groupBy[month] = csvFiles.filter(r => r.startsWith(month));
  }, { concurrency: 8 }); // run in parallel
  // const groupByMonth = csvFiles.filter

  res.json(groupBy);
});

app.post('/readFile', cors(), async (req, res) => {
  console.log(`read file from ${config.csvExportTo}`);

  // for (const csvName of req.body.csvList) {
  //   console.log(req.body, path.join(config.csvExportTo, csvName));

  // fs.createReadStream(path.join(config.csvExportTo, csvName));
  // }
  console.log(req.body.filename);

  res.json({
    filename: req.body.filename,
    data: fs.readFileSync(path.join(config.csvExportTo, req.body.filename), 'utf8')
  });
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
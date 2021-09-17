import React, { useEffect, useRef, Component, classes } from 'react';
import { Promise } from 'bluebird';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { Chart } from './chart';
import DateRangeIcon from '@mui/icons-material/DateRange';
import TodayIcon from '@mui/icons-material/Today';
import './ListFiles.css';
import csv from 'csvtojson';

function ListFiles() {
  const [data, setData] = React.useState([]);
  const [csvData, setCsvData] = React.useState([]);
  const [month, setMonth] = React.useState('');
  useEffect(() => {
    fetch('listFile')
      .then(async (r) => {
        setData(await r.json());
      });
  }, []);

  // pass selected month
  const handleClickMonth = async month => {
    setMonth(month);
    const cache = [];

    for (const date of data[month]) {
      // console.log(date);
      fetch('/readFile', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: date
        }),
      })
        .then(async (r) => {
          r = await r.json();
          // console.log(r, JSON.stringify(csvData));
          await csv()
            .fromString(r.data)
            .then((jsonObj) => {
              // return jsonObj;
              cache.push({
                date: r.filename,
                data: jsonObj
              });
              /**
               * [
               * 	{a:"1", b:"2", c:"3"},
               * 	{a:"4", b:"5". c:"6"}
               * ]
               */
            });
          // cache.push(r);
        });
      await Promise.delay(150);
    }
    setCsvData(cache);
  };

  return {
    renderListFiles: (<div><div className={'list bgc'}>
      <List
        className={'dateNav'}
        sx={{ width: '100%', maxWidth: '100%' }}
        component="nav"
        // aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader sx={{ bgcolor: 'rgb(213, 211, 211)', 'font-size': '1.75rem' }} component="div" id="nested-list-subheader">
            Month
          </ListSubheader>
        }
      >
        {
          Object.keys(data).sort().map((month, index) => <div>
            <ListItemButton key={index} onClick={() => handleClickMonth(month)}>
              <ListItemIcon>
                <DateRangeIcon />
              </ListItemIcon>
              <ListItemText primary={month} />
            </ListItemButton>
          </div>)
        }
      </List>
    </div>
      <div className={'chart'}>
        <h1>{month}</h1>

        {
          // JSON.stringify(csvData.flat(1))
          // JSON.stringify()
        }
        <Chart chartData={{
          labels: csvData.flat(1).map(r => r.date.replace('.csv', '')),
          datasets: [
            {
              label: "Usage",
              data: csvData.flat(1).map(r => {
                console.log(r);
                return r.data.map(r => {
                  return r.usage;
                });
              }).flat(1),
            },
            // {
            //   label: "customerID",
            //   data: csvData.flat(1).map((r) => r.data.filter(r => r.customerID).length),
            // }
          ]
        }} />
      </div>
    </div>)
  };
}

export default ListFiles;

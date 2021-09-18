import React, { useEffect, useRef, Component, classes } from 'react';
import { Promise } from 'bluebird';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ListIcon from '@mui/icons-material/List';
import DateRangeIcon from '@mui/icons-material/DateRange';
import './body.css';
import csv from 'csvtojson';

function ListFiles() {
  const [data, setData] = React.useState([]);
  const [csvData, setCsvData] = React.useState([]);
  const [csvFile, setCsvFile] = React.useState('');
  const [date, setDate] = React.useState('');
  const [month, setMonth] = React.useState('');
  const [config, setConfig] = React.useState({});
  const [status, setStatus] = React.useState(0);
  const [csvShowTable, setShowTable] = React.useState(false);
  const [fetching, setFetching] = React.useState(false);
  const [generating, setGenerating] = React.useState(false);

  useEffect(() => {
    listFile();
  }, []);

  // list all csv group by month
  const listFile = () => {
    fetch('listFile')
      .then(async (r) => {
        setData(await r.json());
      });
  };

  // pass selected month
  const handleClickMonth = async (month) => {
    setMonth(month);
    // drawChartAction('');
    setFetching(true);

    await fetch('/readFile', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data,
        month,
      }),
    })
      .then(async (r) => {
        const { month, data } = await r.json();

        await Promise.map(data, (rr) => csv()
          .fromString(rr.data)
          .then((jsonObj) => {
            return {
              filename: rr.filename,
              data: jsonObj
            };
          }))
          .then((rr) => {
            setCsvData(rr);
          });

        setFetching(false);
      });
  };

  // track generator status
  const getStatus = async (range, count = 0) => {
    // const range = ;
    while (count < range) {
      await Promise.delay(1000);
      // console.log(`status ${count}/${range}`);

      fetch('/statusGenertor')
        .then((r) => r.json())
        .then(async (r) => {
          // console.log(`statusGenertor status ${r.status}/${range}`);
          setStatus((count / range * 100).toFixed(2));
          count = r.status;
          listFile();
        });
    }
    setStatus(0);
  };

  const handleClickGenertor = () => {
    if (generating) {
      console.log(`already generating`);
      return;
    }
    setGenerating(true);
    fetch('/runGenertor')
      .then((r) => r.json())
      .then(async (r) => {
        setConfig(r.config);
        await getStatus(r.range);
        setGenerating(false);
        await handleClickMonth(month);
      });
  };

  const handleListCSVs = async (date) => {
    setShowTable(true);
    await fetch('/readCSVs', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date,
      }),
    })
      .then(async (r) => {
        r = await r.json();
        console.log(r);
        setDate(date);
        setCsvFile(r.data.split('\n').map((r, i) => (
          <p key={i}>{r}</p>
        )));
      });
  };

  return {
    selected: {
      config,
      csvData,
      status,
      month,
      date,
      csvFile,
    },
    action: {
      listFile,
      csvShowTable,
      fetching,
      generating,
    },
    renderListFiles: (<div className={'list bgc'}>
      <List
        // className={'dateNav'}
        sx={{ width: '100%', maxWidth: '100%' }}
        component="nav"
        // aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader sx={{ bgcolor: 'rgb(213, 211, 211)', 'font-size': '1.75rem' }} component="div" id="nested-list-subheader">
            Month
          </ListSubheader>
        }
      >
        <ListItemButton onClick={() => handleClickGenertor()}>
          <ListItemIcon>
            <DateRangeIcon />
          </ListItemIcon>
          <ListItemText primary={'Generator'} />
        </ListItemButton>
        {
          Object.keys(data).sort().map((month, index) => <div>
            <ListItemButton key={index} onClick={() => handleClickMonth(month)}>
              <ListItemIcon>
                <DateRangeIcon />
              </ListItemIcon>
              <ListItemText primary={month} />
            </ListItemButton>

            {/* {
              data[month].map((date, index) => (<List component="div" >
                <ListItemButton sx={{ pl: 4 }} onClick={() => handleListCSVs(date)}>
                  <ListIcon />
                  <ListItemText primary={date.replace('.csv', '')} />
                </ListItemButton>
              </List>))
            } */}

          </div>)
        }
      </List>
    </div>
    )
  };
};

export default ListFiles;

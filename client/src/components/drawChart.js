import React, { useEffect, useRef, Component, classes } from 'react';
import { Promise } from 'bluebird';
import Button from '@mui/material/Button';
import { Chart } from './chart';
import Stack from '@mui/material/Stack';
import TodayIcon from '@mui/icons-material/Today';
import './body.css';
import csv from 'csvtojson';

function DrawChart(selected) {
  const [usingChart, setUsingChart] = React.useState(false);
  const { month, csvData } = selected;


  let chart = null;

  switch (usingChart) {
    case 'mur':
      chart = <Chart chartData={{
        labels: csvData.map(r => r.filename.replace('.csv', '')),
        datasets: [
          {
            label: "Usage",
            data: csvData.map(r => r.data.map(rr => rr.usage).reduce((acc, value) => +acc + +value, 0)).flat(1),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)'
            ]
          },
        ]
      }} />;
      break;
    case 't3smur':
      chart = null;
      break;
    case 'cmudr':
      chart = null;
      break;
    default:
      chart = <Chart chartData={{
        labels: csvData.map(r => r.filename.replace('.csv', '')),
        datasets: [
          {
            label: "Usage",
            data: csvData.map(r => r.data.map(rr => rr.usage).reduce((acc, value) => +acc + +value, 0)).flat(1),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)'
            ]
          },
        ]
      }} />;
  }


  return {
    renderCharts: (
      <div className={'main'}>
        <h1 className={'title'}>{month}</h1>
        <div>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" className={'reportButton'} onClick={() => setUsingChart('mur')}>Customer Monthly Usage report</Button>
            <Button variant="contained" className={'reportButton'} onClick={() => setUsingChart('t3smur')}>Customer Top 3 Services Monthly Usage report</Button>
            <Button variant="contained" className={'reportButton'} onClick={() => setUsingChart('cmudr')}>Country Monthly Usage % Distribution report</Button>
          </Stack>
        </div>
        <div className={'chart'}>
          {chart}

        </div>
      </div>
    )
  };
};

export default DrawChart;

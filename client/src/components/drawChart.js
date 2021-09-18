import React, { useEffect, useRef, Component, classes } from 'react';
import { Promise } from 'bluebird';
import Button from '@mui/material/Button';
import { Chart } from './chart';
import Stack from '@mui/material/Stack';
import './body.css';

function DrawChart(selected, action) {
  const { month, csvData } = selected;
  useEffect(() => {
    setUsingChart(mur(csvData));
  }, [selected.csvData]);

  const mur = (csvArray) => <Chart chartData={{
    labels: csvArray.map(r => r.filename.replace('.csv', '')),
    datasets: [
      {
        label: "Usage",
        data: csvArray.map(r => { console.log(r); return r.data.map(rr => rr.usage).reduce((acc, value) => +acc + +value, 0); }).flat(1),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)'
        ]
      },
    ]
  }} title={"Customer Monthly Usage report"} />;

  const t3smur = (csvArray) => <Chart chartData={{
    labels: csvArray.map(r => r.filename.replace('.csv', '')),
    datasets: [
      {
        label: "Usage",
        data: csvArray.map(r => r.data.map(rr => rr.usage).reduce((acc, value) => +acc + +value, 0)).flat(1),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)'
        ]
      },
    ]
  }} title={"Customer Top 3 Services Monthly Usage report"} />;

  const cmudr = (csvArray) => <Chart chartData={{
    labels: csvArray.map(r => r.filename.replace('.csv', '')),
    datasets: [
      {
        label: "Usage",
        data: csvArray.map(r => r.data.map(rr => rr.usage).reduce((acc, value) => +acc + +value, 0)).flat(1),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)'
        ]
      },
    ]
  }} title={"Country Monthly Usage % Distribution report"} />;
  const [usingChart, setUsingChart] = React.useState(mur(csvData));


  return {
    drawChartAction: {
      setUsingChart
    },
    renderCharts: (
      <div className={'main'}>
        <h1 className={'title'}>{month}</h1>
        <a style={{ color: 'grey' }} >Data will be cached in server for 60 sec when you fetch a new selection.</a>
        <div>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" className={'reportButton'} onClick={() => setUsingChart(mur(csvData))}>Customer Monthly Usage report</Button>
            <Button variant="contained" className={'reportButton'} onClick={() => setUsingChart(t3smur(csvData))}>Customer Top 3 Services Monthly Usage report</Button>
            <Button variant="contained" className={'reportButton'} onClick={() => setUsingChart(cmudr(csvData))}>Country Monthly Usage % Distribution report</Button>
          </Stack>
        </div>
        <div className={'chart'}>
          {usingChart}

        </div>
      </div>
    )
  };
};

export default DrawChart;

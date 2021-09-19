import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { Bar, Doughnut, PolarArea } from "react-chartjs-2";
import Stack from '@mui/material/Stack';
import './body.css';

function DrawChart(selected, action) {
  const { month, csvData } = selected;
  const countriesCode = [...new Set(csvData.map(r => r.data.map(r => r.country).flat(1)).flat(1))];
  useEffect(() => {
    setUsingChart(mur(csvData));
  }, [selected.csvData]);

  const mur = (csvArray) => <Bar
    className={'bar'}
    data={{
      labels: csvArray.map(r => r.filename.replace('.csv', '')),
      datasets: [
        {
          label: "Usage",
          data: csvArray.map(r => { return r.data.map(rr => rr.usage).reduce((acc, value) => +acc + +value, 0); }).flat(1),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)'
          ]
        },
      ]
    }}
    options={{
      plugins: {
        title: {
          display: true,
          text: "Customer Monthly Usage report"
        },
        subtitle: {
          display: true,
          text: `Total Usage ${csvArray.map(r => { return r.data.map(rr => rr.usage).reduce((acc, value) => +acc + +value, 0); }).flat(1).reduce((acc, value) => +acc + +value, 0)}`
        },
        legend: {
          display: true,
          position: "bottom"
        }
      }
    }}
  />;

  const t3smur = (csvArray) => {
    // count all serviceId
    const count = {};
    csvArray.forEach(r => {
      r.data.forEach((a) => {
        count[a.serviceID] = (count[a.serviceID] || 0) + 1;
      });
    });

    // find the top 3 service
    const top3ServicesIdInMonth = Object.keys(count).sort((a, b) => count[a] - count[b])
      .slice(Math.max(Object.keys(count).length - 3, 1)).reverse();

    // add total usage
    const totalUsage = top3ServicesIdInMonth.map(servicesId => {
      return csvArray.map(r => r.data.filter(rr => rr.serviceID === servicesId)).flat(1).reduce((acc, value) => acc + +value.usage, 0);
    });

    const data = {
      labels: top3ServicesIdInMonth,
      datasets: [
        {
          "label": top3ServicesIdInMonth.map(r => `Service ID: ${r}`),
          "data": totalUsage,
          "backgroundColor": [
            'rgba(255, 99, 132, 0.3)',
            'rgba(54, 162, 235, 0.3)',
            'rgba(255, 206, 86, 0.3)',
          ]
        }
      ],
    };

    const options = {
      plugins: {
        title: {
          display: true,
          text: "Customer Top 3 Services Monthly Usage report"
        },
        legend: {
          display: true,
          position: "bottom"
        }
      }
    };

    return <PolarArea className={'pie'} data={data} options={options} />;;
  };

  const cmudr = (csvArray) => {
    const totalUsage = csvArray.map(r => { return r.data.reduce((acc, value) => +acc + +value.usage, 0); }).flat(1).reduce((acc, value) => +acc + +value, 0);
    const countriesUsage = countriesCode.map(code => {
      const usageNumner = csvArray.map(r => { return r.data.filter(rr => rr.country === code).reduce((acc, value) => +acc + +value.usage, 0); }).flat(1).reduce((acc, value) => +acc + +value, 0);
      return ((usageNumner / totalUsage) * 100).toFixed(2);
    });

    return <Doughnut
      className={'pie'}
      data={{
        labels: countriesCode,
        datasets: [
          {
            label: "Usage %",
            data: countriesUsage,
            backgroundColor: [
              'rgba(255, 99, 132, 0.3)',
              'rgba(54, 162, 235, 0.3)',
              'rgba(255, 206, 86, 0.3)',
              'rgba(75, 192, 192, 0.3)',
              'rgba(153, 102, 255, 0.3)',
              'rgba(255, 159, 64, 0.3)',
              'rgba(255, 86, 0, 0.3)',
              'rgba(140, 86, 0,  0.3)',
              'rgba(150, 0, 80, 0.4)',
              'rgba(55, 0, 150, 0.4)',
              'rgba(230, 0, 150, 0.4)',
            ]
          },
        ]
      }}
      options={{
        plugins: {
          title: {
            display: true,
            text: "Country Monthly Usage % Distribution report"
          },
          legend: {
            display: true,
            position: "bottom"
          }
        }
      }}
    />;
  };

  const [usingChart, setUsingChart] = React.useState(mur(csvData));


  return {
    drawChartAction: {
      setUsingChart
    },
    renderCharts: (
      <div className={'main'}>
        <a className={'title'}>{month}</a>
        <a className={'description'} >Data will be cached in server for 60 sec when you selected the month</a>
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

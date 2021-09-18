import React, { useEffect, useRef, Component, classes } from 'react';
import { CsvToHtmlTable } from 'react-csv-to-table';
import { Promise } from 'bluebird';
import Button from '@mui/material/Button';
import { Chart } from './chart';
import Stack from '@mui/material/Stack';
import TodayIcon from '@mui/icons-material/Today';
import './body.css';

function CsvTable(selected, action) {
  const { date, csvFile } = selected;

  console.log(csvFile);
  return {
    renderCsvTable: (
      <div className={'main'}>
        <h1 className={'title'}>{date}</h1>
        {/* <p className={'csv'}>
          {csvFile}
        </p> */}
        {
          csvFile
        }
      </div>
    )
  };
};

export default CsvTable;

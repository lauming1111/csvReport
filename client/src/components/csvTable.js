import React, { useEffect, useRef, Component, classes } from 'react';
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

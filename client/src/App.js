import React, { useEffect } from 'react';
import ListFiles from './components/listFiles';
import DrawChart from './components/drawChart';
import Status from './components/status';
// import CsvTable from './components/csvTable';
import './App.css';

function App() {
  const { action, selected, renderListFiles } = ListFiles();
  const { renderCharts } = DrawChart(selected, action);
  const { renderStatus } = Status(selected, action);
  // const { renderCsvTable } = CsvTable(selected, action);

  useEffect(() => {
    document.title = "CSVs";
  }, []);

  return (
    <div className={'flex'}>
      <div className={'list'}>
        {renderListFiles}
      </div>
      <div className={'body'}>
        <div className={'progress'}> {(action.fetching || action.generating) && renderStatus}</div>
        {!action.fetching && !action.generating && selected.month && renderCharts}
        {/* {action.csvShowTable && renderCsvTable} */}
      </div>
    </div>
  );
}

export default App;

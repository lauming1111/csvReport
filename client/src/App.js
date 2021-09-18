import ListFiles from './components/listFiles';
import DrawChart from './components/drawChart';
import Status from './components/status';
// import CsvTable from './components/csvTable';
import './App.css';

function App() {
  const { action, selected, renderListFiles } = ListFiles();
  const {  renderCharts } = DrawChart(selected, action);
  const { renderStatus } = Status(selected, action);
  // const { renderCsvTable } = CsvTable(selected, action);

  return (
    <div className={'loading'}>
      {renderListFiles}
      {(action.fetching || action.generating) && renderStatus}
      {!action.fetching && !action.generating && selected.month && renderCharts}
      {/* {action.csvShowTable && renderCsvTable} */}
    </div>
  );
}

export default App;

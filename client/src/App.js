import ListFiles from './components/listFiles';
import DrawChart from './components/drawChart';
import Status from './components/status';

import './App.css';

function App() {
  const { action, selected, renderListFiles } = ListFiles();
  const { renderCharts } = DrawChart(selected);
  const { renderStatus } = Status(selected, action);
  console.log('App', selected);
  // const { renderReadFiles } =  ReadFiles(month, monthlyFiles);
  //   const override = css`
  //   display: block;
  //   margin: 0 auto;
  //   border-color: red;
  // `;

  return (
    <div className={'loading'}>
      {renderListFiles}
      {action.generating && renderStatus}
      {!action.fetching && selected.month && renderCharts}
    </div>
  );
}

export default App;

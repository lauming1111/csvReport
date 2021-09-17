import ListFiles from './components/listFiles';
// import ReadFiles from './components/readFiles';

function App() {
  const { month, monthlyFiles, renderListFiles } = ListFiles();
  console.log('App', month, monthlyFiles);
  // const { renderReadFiles } =  ReadFiles(month, monthlyFiles);
  return (
    <div>
        {renderListFiles}
    </div>
  );
}

export default App;

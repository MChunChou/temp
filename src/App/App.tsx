import './App.css';

import View from '../View/View';

import testData from '../test.json'
import 'font-awesome/css/font-awesome.min.css'

const selected = {
  List: testData.list,
  Info: testData.info,
  Task: testData.task
}

const taskOption = testData.taskOption;

function App() {

  //useMemo
  const node = taskOption.filter((task)=>{
    return task.dateSource === task.keyStage;
  });

  return (
    <div className="App">
      <View
        selected={selected}
        node={node}
        taskOptions={taskOption}
      />

    </div>
  );
}

export default App;

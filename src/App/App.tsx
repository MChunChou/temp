import View from '../View/View';

import testData from '../test.json'
import 'font-awesome/css/font-awesome.min.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css';

import Calendar from '../Calendar/Calendar';

const selected = {
  List: testData.list,
  Info: testData.info,
  Task: testData.task
}

const taskOption = testData.taskOption;

function App() {

  // 可以使用 useMemo
  // 從 task 中取得大節點資料
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

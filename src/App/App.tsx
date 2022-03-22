import View from '../View/View';
import 'font-awesome/css/font-awesome.min.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css';
import { Routes, Route, Link } from "react-router-dom";


import testData from '../test.json'


import Calendar from '../Calendar/Calendar';
import React, { useState } from 'react';
import { Provider } from 'react-redux'
import createStore from '../Reducer'

import store from '../Reducer/index'
import Filter from '../Filter'
const selected = {
  List: testData.list,
  Info: testData.info,
  Task: testData.task
}

const taskOption = testData.taskOption;

export const MyContext = React.createContext<{
  controlOpen: number | undefined,
  setControlOpen: (idx: any, open: any) => void,
  getControlOpen: (idx: any) => boolean
}>({
  controlOpen: undefined,
  setControlOpen: (idx: any, open: any) => { },
  getControlOpen: (idx: any): boolean => { return false }
});

function App() {

  // const [controlOpen,setControlOpen] = useState<{[idx:string]: boolean}>({})
  const [controlOpen, setControlOpen] = useState<number | undefined>(undefined)
  // 可以使用 useMemo
  // 從 task 中取得大節點資料
  const node = taskOption.filter((task) => {
    return task.dateSource === task.keyStage;
  });

  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path="/" element={<View
            selected={selected}
            node={node}
            taskOptions={taskOption}
          />} />
          <Route path="filter" element={<Filter />} />
        </Routes>
      </div>

    </Provider>
  );
}

export default App;

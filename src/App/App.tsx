import View from '../View/View';
import 'font-awesome/css/font-awesome.min.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css';
import { Routes, Route, Link } from "react-router-dom";
import {getData} from '../FakeDoc/createSelection'
import testData from '../test.json'
import Calendar from '../Calendar/Calendar';
import React, { useState } from 'react';
import { Provider } from 'react-redux'
import createStore from '../Reducer'

import store from '../Reducer/index'
import Filter from '../Filter'
import Progress from '../Progress/Progress';

const selected = {
  List: testData.list,
  Info: testData.info,
  Task: testData.task
}

const filterData = getData();

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
          <Route path="/filter" element={<Filter
            filter={[

            ]}
          />} />
          <Route path='/swiper' element={<Progress cards={[
            {title: 'PHK', value: 20, max: 60},
            {title: 'T1', value: 20, max: 60},
            {title: 'T2', value: 20, max: 60},
          ]}/>}/>
        </Routes>
      </div>

    </Provider>
  );
}

export default App;

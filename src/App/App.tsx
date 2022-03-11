import View from '../View/View';

import testData from '../test.json'
import 'font-awesome/css/font-awesome.min.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css';

import Calendar from '../Calendar/Calendar';
import React, { useState } from 'react';
// import { Context } from 'ag-grid-community';

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
  setControlOpen: (idx:any, open: any) => {},
  getControlOpen: (idx: any):boolean => {return false}
});

function App() {

  // const [controlOpen,setControlOpen] = useState<{[idx:string]: boolean}>({})
  const [controlOpen,setControlOpen] = useState<number|undefined>(undefined)
  // 可以使用 useMemo
  // 從 task 中取得大節點資料
  const node = taskOption.filter((task)=>{
    return task.dateSource === task.keyStage;
  });

  return (
    <MyContext.Provider value={{
      controlOpen: controlOpen,
      setControlOpen: (idx:any, open: any): void => {
        // setControlOpen({...controlOpen, [idx+'']: open})
        setControlOpen(idx)
      },
      getControlOpen: (idx) => {
        // return controlOpen[idx]
        return controlOpen? true: false
      }
    }}>
    <div className="App">
      <View
        selected={selected}
        node={node}
        taskOptions={taskOption}
      />
    </div>
    </MyContext.Provider>
  );
}

export default App;

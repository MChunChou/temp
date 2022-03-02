import React, { useEffect, useState } from 'react';
import './App.css';

import GridTable from '../GridTable/GridTable';
import * as fh from '../utils/fetch-helper';

const Test = (props: any) => {
  return (
    <div style={{
      height: '100px',
      display: 'flex',
      flexDirection: 'column'
    }}>

      <div>{props.value.planDateStart}</div>
      <div>{props.value.planDateEnd}</div>
    </div >
  )
}

const selected = {
  List: ['PDAPK2', 'PDAPK3', 'PDAPK1'],
  Info: ['locId', 'bookNo', 'deptName', 'facCd'],
  Task: [{ taskName: 'PIP check form', taskId: 1002, keyStage: 'PHK' }, { taskName: 'ICP-MASS', taskId: 1000, keyStage: 'PHK' }, { taskName: '取水測值', taskId: 1001, keyStage: 'T1' }]
}

function App() {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    fh.post('http://localhost:8000/myschedule/main', {})
      .then(res => {
        setData(res)
      });
  }, [])

  const sortData = () => {
    if (data.length > 0) {
      const afterSort = data.sort((a: any, b: any) => {
        const ai = selected.List.indexOf(a.toolInfo.facCd)
        const bi = selected.List.indexOf(b.toolInfo.facCd)
        return ai - bi
      });

      const gridData = data.map((d: any) => {
        const newData = { ...d.toolInfo };
        d.taskList.forEach((task: { taskId: string | number; }) => {
          newData[task.taskId + ''] = task
        })

        return newData
      })

      return gridData;
    }

    return []
  }

  const getInfoColumn = (): any[] => {
    const res = selected.Info.map((info) => {
      return {
        field: info,
        pinned: 'left',
        columnGroupShow: info === 'facCd' ? 'close' : 'open',
      }
    })
    return res
  }

  const getTaskColumn = () => {

    const res = selected.Task.map((task) => {
      return {
        field: task.taskId + '',
        headerName: task.taskName,
        cellRenderer: Test,
        cellRendererParams: task,

      }
    })

    return res
  }


const CustomHeaderGroup: React.FC = () => {
  return <span></span>
}

  const getColumn = (): any => {
    const columns: any[] = [];
    columns.push({
      headerName: '',
      children: getInfoColumn()
    })
    return [...columns, ...getTaskColumn()]
  }

  return (
    <div className="App">
      <GridTable
        dataDefs={{
          data: sortData()
        }}
        columnDefs={{
          groups: getColumn()
        }}
      />
    </div>
  );
}

export default App;

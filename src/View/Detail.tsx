import React from 'react'
import GridTable from '../GridTable/GridTable';

const Detail: React.FC<any> = (props: any) => {

  const setisDetail = props.setisDetail

  const data = props.sortData(false);
  const columns = props.detailColumn;
  return <div className="dd" >
    <button onClick={()=>{setisDetail(false)}}>X</button>
    <div style={{
        height: '80%',
        width: '80%'
    }}>
    <GridTable
        dataDefs={{
            data: data
        }}
        columnDefs={{
            groups: columns
        }}
    />
    </div>
    </div>
}

export default Detail;
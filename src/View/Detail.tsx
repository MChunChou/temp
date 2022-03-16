import React from 'react'
import GridTable from '../GridTable/GridTable';
import { Breadcrumbs } from '@mui/material';
import Link from '@mui/material/Link';

const Detail: React.FC<any> = (props: any) => {

  const setisDetail = props.setisDetail

  const data = props.sortData(false);
  const columns = props.detailColumn;
  return <div className="dd" >
    <button onClick={()=>{setisDetail(false)}}>X</button>

    {/* 這邊只是先寫個大概 */}
    <Breadcrumbs aria-label="breadcrumb">
    <Link underline="hover">
        A
    </Link>
    <Link
        underline="hover">
        B
    </Link>
    </Breadcrumbs>


    <div className='dd-table'>
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
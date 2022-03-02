import React, { useEffect, useState } from "react";

import { AgGridReact } from 'ag-grid-react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './GridTable.css';

import { ColDef, ColGroupDef } from "ag-grid-community";

const GridTable: React.FC<GridTableProps> = (props: GridTableProps) => {

    const [columnDefs, setColumnDefs]: any[] = useState([]);
    const [rowData, setRowData]: any = useState();


    useEffect(() => {
        createColumns();
    }, []);

    useEffect(() => {
        getData();
    }, [props.dataDefs.data])

    const getData = () => {
        if (props.dataDefs.data) {
            setRowData(props.dataDefs.data);
        }
    }

    const createColumns = () => {
        setColumnDefs(props.columnDefs.groups)
    }

    return (
        <div className='grid-table ag-theme-alpine' style={{ height: '100vh' }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={{
                    resizable: true,
                    autoHeight: true,
                    suppressAutoSize: true,
                    suppressSizeToFit: true,
                    // suppressMenu: true,
                    // floatingFilter: true,
                    filter: 'agTextColumnFilter',
                    filterValueGetter: (params) => {
                        const d = params.data[params.colDef.field as string]
                        return d.planDateEnd + ' ' + d.planDateStart;
                    },
                    // floatingFilterComponentParams: {
                        // suppressFilterButton: true,
                    // },
                    // floatingFilterComponent: Filter
                }}
            />
        </div>
    );
}

export default GridTable;
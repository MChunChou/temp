import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { AgGridReact } from 'ag-grid-react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './GridTable.css';
import CustomHeader from "./CustomHeader";
// import CustomHeader from "./Header";
import FullWidthCellRenderer from '../Control/Control'


const GridTable: React.FC<GridTableProps> = (props: GridTableProps) => {
    const gridRef = useRef<any>();

    const [columnDefs, setColumnDefs]: any[] = useState([]);
    const [rowData, setRowData]: any = useState();
    const [gridAPI, setGridAPI] = useState<any>();
    const [isExpand, setIsExpand] = useState(false)
    const [isShrink, setIsShrink] = useState(false)

    const [defaultColDef] = useState({
        resizable: true,
        wrapText: true,
        autoHeight: true,
        minWidth: 150,
        sortable: true,
        pagination: true,
        paginationAutoPageSize: 2,
        suppressAutoSize: true,
        suppressSizeToFit: true,
        filter: 'agTextColumnFilter',
        // Default Use filter in first row
        // suppressMenu: true,
        // floatingFilter: true,
        headerComponentParams: {
            enableMenu: true,
        },
    });

    useEffect(() => {
        console.log(columnDefs)
    }, [columnDefs])

    const components = useMemo(() => {
        return {
            agColumnHeader: CustomHeader,
        };
    }, []);

    useEffect(() => {
        createColumns();
    }, []);

    useEffect(() => {
        getData();
    }, [props.dataDefs.data])

    const onGridReady = (api: any) => {
        setGridAPI(api)
    }

    const getData = () => {
        if (props.dataDefs.data) {
            setRowData(props.dataDefs.data);
        }
    }

    const createColumns = () => {
        setColumnDefs(props.columnDefs.groups)
    }

    const handleClickExpand = () => {
        if (props.getExpandColumns) {
            const newColumnsDef = props.getExpandColumns(!isExpand);
            gridRef.current.api.setColumnDefs(newColumnsDef)
            setIsExpand(!isExpand);
        }
    }

    const handleClickShrink = () => {
        if (props.getShrinkColumns) {
            const newColumnsDef = props.getShrinkColumns(!isShrink);
            gridRef.current.api.setColumnDefs(newColumnsDef)
            setIsShrink(!isShrink);
        }
    }

    const isFullWidth = (data: any) => {
        return data.fullWitdth
    }

    const isFullWidthCell = useCallback(function (rowNode) {
        return isFullWidth(rowNode.data);
      }, []);
      const fullWidthCellRenderer = useMemo(() => {
        return FullWidthCellRenderer;
      }, []);

      const getRowHeight = useCallback(function (params) {
        // return 100px height for full width rows
        if (isFullWidth(params.data)) {
          return 100;
        }
      }, []);
    return (
        <div className='grid-table ag-theme-alpine'>

            {
                props.isExpandComponent ?
                    <button onClick={handleClickExpand}>
                        {isExpand ? "<<" : ">>"}
                    </button>
                    : <></>
            }

            {
                props.isExpandComponent ?
                <button onClick={handleClickShrink}>
                    {isShrink ? ">>>" : "<<<"}
                </button>
                : <></>
            }

            <AgGridReact
                ref={gridRef}
                onGridReady={onGridReady}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                components={components}
                // getRowHeight={getRowHeight}
                isFullWidthCell={isFullWidthCell}
                fullWidthCellRenderer={fullWidthCellRenderer}
            />


        </div>
    );
}

export default GridTable;
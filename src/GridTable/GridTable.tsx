import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { AgGridReact } from 'ag-grid-react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './GridTable.css';
import CustomHeader from "./CustomHeader";
// import CustomHeader from "./Header";
import FullWidthCellRenderer from '../Control/Control'
import icons from './icon.svg';
import { ConnectedOverlayScrollHandler } from "primereact/utils";

const ToolTip = (props: any) => {
//     const data = useMemo(
//         () => props.api.getDisplayedRowAtIndex(props.rowIndex).data,
//         []
//     );
// console.log(data, props)
    return (
    <div
        className="custom-tooltip"
        style={{ backgroundColor: props.color || 'white' }}
    >
        {props.value}
    </div>
    );
}

const GridTable: React.FC<GridTableProps> = (props: GridTableProps) => {
    const gridRef = useRef<any>();

    const [columnDefs, setColumnDefs]: any[] = useState([]);
    const [rowData, setRowData]: any = useState();
    const [gridAPI, setGridAPI] = useState<any>();
    const [isExpand, setIsExpand] = useState(false)
    const [isShrink, setIsShrink] = useState(false)

    const [defaultColDef] = useState({
        resizable: false,
        wrapText: true,
        // autoHeight: true,
        // minWidth: 100,
        sortable: true,
        // pagination: true,
        // paginationAutoPageSize: 2,
        suppressAutoSize: true,
        suppressSizeToFit: true,
        filter: 'agTextColumnFilter',
        // Default Use filter in first row
        // suppressMenu: true,
        // floatingFilter: true,
        alwaysShowHorizontalScroll: true,
        alwaysShowVerticalScroll: true,
        headerComponentParams: {
            enableMenu: true,
        },
        tooltipComponent: ToolTip,
    });

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
        // return 120px height for full width rows
        if (isFullWidth(params.data)) {
            return 120;
        }
        return 80;
    }, []);



    const Icon = (props: any) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/2000/xlink"
                className={`icon-${props.name}`}
            >
                <use xlinkHref={`${icons}#${props.name}`} />
            </svg>
        )
    }

    return (
        <div className='grid-table ag-theme-alpine'>

            {
                props.isExpandComponent ?
                    <button className={'expand ' + (isExpand ? 'close' : 'open')} onClick={handleClickExpand}>
                        {isExpand ? <Icon name='expandClose' /> : <Icon name='expandOpen' />}
                        <span className="messageE">Expand column</span>
                        <span className="messageC">Collapse column</span>
                    </button>
                    : <></>
            }

            {
                props.isExpandComponent ?
                    <button className={'splitter ' + (isShrink ? 'close' : 'open')} onClick={handleClickShrink}>
                        {isShrink ? <i className="fa fa-caret-right"><span className="message">Expand left freeze column</span><span className="messageV">Tool Information</span></i> : <i className="fa fa-caret-left"><span className="message">Collapse left freeze column</span></i>}
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
                getRowHeight={getRowHeight}
                isFullWidthCell={isFullWidthCell}
                fullWidthCellRenderer={fullWidthCellRenderer}
                onRowSelected={()=>{}}
                onSelectionChanged={()=>{}}
                tooltipShowDelay={0}
                tooltipHideDelay={8000}
                // asyncTransactionWaitMillis={10}
            />


        </div>
    );
}

export default GridTable;
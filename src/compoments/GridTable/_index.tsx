import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import { AgGridReact } from "ag-grid-react";
import { ColDef, GridReadyEvent } from "ag-grid-community";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import CellHeaderAction from "./components/CellHeaderAction";
import CellFooterAction from "./components/CellFooterAction";

interface GridTableProps {
    columnDef: ColDef;
}

const defaultColDef = {
    resizable: false,
    sortable: true,
    lockPinned: true,

}

const components = {
    cellHeaderAction: CellHeaderAction,
    cellFooterAction: CellFooterAction
}

const GridTable = (props: GridTableProps) => {
    const gridRef = useRef<AgGridReact>(null);


    const [rowData, setRowData] = useState();
    const [gridAPI, setGridAPI] = useState<GridReadyEvent>();

    const onGridReady = useCallback((api: GridReadyEvent) => {
        setGridAPI(api);

    }, []);

    let tableControl: React.ReactNode | null = null;
    return (
        <div className="grid-table ag-theme-alpine">
            {tableControl}
            <AgGridReact
                ref={gridRef}
                defaultColDef={defaultColDef}
                rowData={rowData}
                //row Drag
                rowDragManaged={true}
                suppressMoveWhenRowDragging={true}
                animateRows={true}
                // event
                onGridReady={onGridReady}
            />
        </div>
    );
};

export default GridTable;

import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

interface GridTableProps {
    columnDef: ColDef;
}

const GridTable = (props: GridTableProps) => {
    const gridRef = useRef<AgGridReact>(null);

    const [rowData, setRowData] = useState();
    const [defaultColDef] = useState({
        resizable: false,
        wrapText: true,
        sortable: true,
        // alwaysShowHorizontalScroll: true,
        // alwaysShowVerticalScroll: true,
        filter: "agTextColumnFilter",
        /* Set not dnd for pinned*/
        lockPinned: true,
        headerComponentParams: {
            enableMenu: true,
        },

        /* Default Use filter in first row */
        // suppressMenu: true,
        // floatingFilter: true,

        /* Using in paginatoion */
        // pagination: true,
        // paginationAutoPageSize: 2,
        // suppressAutoSize: true,
        // suppressSizeToFit: true,
    });

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
            />
        </div>
    );
};

export default GridTable;

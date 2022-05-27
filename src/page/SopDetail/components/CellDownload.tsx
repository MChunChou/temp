import React from "react";

import { ICellRendererParams } from "ag-grid-community";

const CellDownload = (props: ICellRendererParams) => {
    return (
        <div>
            <a>{props.value}</a>
        </div>
    );
};

export default CellDownload;

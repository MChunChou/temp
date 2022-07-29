import React from "react";

import { ICellRendererParams } from "ag-grid-community";

const CellHeaderAction = (props: ICellRendererParams) => {

    const handleDeleteRow = () => {
        props.api.applyTransaction({ remove: [props.data] })
    }

    return (
        <div>
            <button>X</button>
        </div>
    );
};

export default CellHeaderAction;

import React from "react";

interface DataViewProps {}
const DataView: React.FC<DataViewProps> = (props: DataViewProps) => {
    return (
        <div className="view">
            Schedule Data View
            <div className="control"></div>
            <div className="grid-table"></div>
        </div>
    );
};

export default DataView;

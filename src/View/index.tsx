import React, { useState, useEffect, useMemo, useCallback } from "react";
import GridTable from "../GridTable/GridTable";
import Detail from "./Detail";

const View: React.FC = () => {
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    let detail = null;
    if (isDetailOpen) {
        detail = <Detail></Detail>;
    }
    return (
        <div className="view">
            <div className="control"></div>
            <div className="card">{/* <GridTable /> */}</div>

            {detail}
        </div>
    );
};
export default {};

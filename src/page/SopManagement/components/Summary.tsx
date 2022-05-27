import React, { useMemo, useState, useEffect } from "react";
import GridTable from "../../../compoments/GridTable/GridTable";

import CellLink from "./CellLink";

interface SummaryProps {
    titleClass?: string;
    title: string;
}

const Summary = (props: SummaryProps) => {
    const [summaryData, setSummaryData] = useState<any>(null);

    useEffect(() => {
        fetch("http://localhost:8000/sop")
            .then((res) => res.json())
            .then((res) => {
                setSummaryData(res.sop);
            });
    }, []);

    const columnDefs = useMemo(() => {
        return [
            {
                headerName: "Task ID",
                field: "make",
                cellRenderer: CellLink,
            },
            { headerName: "Key Stage", field: "key" },
            { headerName: "Task Name", field: "model" },
            { headerName: "Task Description", minWidth: 300, field: "desc" },
            {
                headerName: "SOP Count",
                field: "scount",
                cellRenderer: CellLink,
            },
        ];
    }, []);

    return (
        <div className="summary">
            <span className={`title ${props.titleClass}`}>{props.title}</span>
            <div className="view">
                <GridTable
                    dataDefs={{
                        data: summaryData,
                    }}
                    columnDefs={{
                        groups: columnDefs,
                    }}
                />
            </div>
        </div>
    );
};

export default Summary;

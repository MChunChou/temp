import React, { useMemo, useState, useEffect } from "react";
import GridTable from "../../../compoments/GridTable/GridTable";
import CellDownload from "../../SopDetail/components/CellDownload";

import CellLink from "./CellLink";

interface SummaryProps {
    titleClass?: string;
    title: string;
    by: string;
}

const Summary = (props: SummaryProps) => {
    const [summaryData, setSummaryData] = useState<any>(null);

    useEffect(() => {
        const by = props.by;

        fetch("http://localhost:8000/sop?by=" + by)
            .then((res) => res.json())
            .then((res) => {
                switch (by) {
                    default:
                        setSummaryData(res.sop);
                        break;
                }
            });
    }, []);

    const taskColumnDefs = useMemo(() => {
        return [
            {
                headerName: "Task ID",
                field: "make",
                cellRenderer: CellLink,
                cellRendererParams: {
                    by: props.by,
                },
            },
            { headerName: "Key Stage", field: "key" },
            { headerName: "Task Name", field: "model" },
            { headerName: "Task Description", minWidth: 300, field: "desc" },
            {
                headerName: "SOP Count",
                field: "scount",
                cellRenderer: CellLink,
                cellRendererParams: {
                    pathField: "make",
                    by: props.by,
                },
            },
        ];
    }, []);

    const sopColumnDefs = useMemo(() => {
        return [
            { headerName: "Fab", field: "fab" },
            { headerName: "Dept.", field: "dept" },
            {
                headerName: "Sop File Name",
                field: "file",
                cellRenderer: CellDownload,
            },
            { headerName: "Description", minWidth: 300, field: "desc" },
            {
                headerName: "Count",
                field: "count",
                cellRenderer: CellLink,
                cellRendererParams: {
                    pathField: "file",
                    by: props.by,
                },
            },
        ];
    }, []);

    const columnDefs = useMemo(() => {
        switch (props.by) {
            case "task":
                return taskColumnDefs;
            case "sop":
                return sopColumnDefs;
            default:
                return [];
        }
    }, [props.by]);

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

import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

import { ICellRendererParams } from "ag-grid-community";

function LinkComponent(props: ICellRendererParams) {
    return (
        <a
            // target="_blank"
            rel="noopener noreferrer"
            href={"/" + props.value}
        >
            {props.value}
        </a>
    );
}
const View = () => {
    const [rowData] = useState([
        {
            id: "aa",
            make: "0121",
            key: "EDI-A08",
            model: "Celica",
            desc: "PR Coating(ArF/ EUV, UDO)",
            scount: 2,
        },
        {
            id: "bb",
            make: "0125",
            key: "EDI-A11",
            model: "Mondeo",
            desc: "PR Coating (KrF / Arf / Imme)",
            scount: 5,
        },
        {
            id: "cc",
            make: "0124",
            key: "EDI-A14",
            model: "Boxster",
            desc: "",
            scount: 4,
        },
        {
            id: "dd",
            make: "0126",
            key: "EDI-D11",
            model: "Angel",
            desc: "Use for ETCH1 pre-hookup tools",
            scount: 6,
        },
        {
            id: "ee",
            make: "0128",
            key: "EDI-A17",
            model: "Challanger",
            desc: "PR Coating",
            scount: 0,
        },
        {
            id: "ff",
            make: "0150",
            key: "PHK",
            model: "Kristin",
            desc: "",
            scount: 1,
        },
    ]);
    const [columnDefs] = useState([
        { headerName: "Task ID", field: "make", cellRenderer: "LinkComponent" },
        { headerName: "Key Stage", field: "key" },
        { headerName: "Task Name", field: "model" },
        { headerName: "Task Description", minWidth: 300, field: "desc" },
        { headerName: "SOP Count", field: "scount" },
    ]);

    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            editable: true,
            sortable: true,
            filter: true,
        };
    }, []);

    //tabs
    const [activeIndex, setActiveIndex] = useState(0);

    const icon = <FontAwesomeIcon icon={faLink} />;

    return (
        <div className="sop">
            <div className="tabs">
                <TabView
                    activeIndex={activeIndex}
                    onTabChange={(e) => setActiveIndex(e.index)}
                >
                    <TabPanel
                        header={
                            <span>
                                From Task
                                <span className="tabs-icon sop">
                                    {icon}
                                </span>TO <span className="font">SOP</span>
                            </span>
                        }
                    >
                        <span className="title sop">
                            SOP Summary Linked By Task
                        </span>

                        <div className="view">
                            <div className="grid-table ag-theme-alpine">
                                <AgGridReact
                                    rowData={rowData}
                                    columnDefs={columnDefs}
                                    defaultColDef={defaultColDef}
                                    animateRows={true}
                                    rowSelection={"multiple"}
                                    suppressRowClickSelection={true}
                                    suppressAggFuncInHeader={true}
                                    frameworkComponents={{
                                        LinkComponent,
                                    }}
                                ></AgGridReact>
                            </div>
                        </div>
                    </TabPanel>

                    <TabPanel
                        header={
                            <span>
                                From SOP
                                <span className="tabs-icon task">
                                    {icon}
                                </span>TO <span className="font">Task</span>
                            </span>
                        }
                    >
                        <span className="title task">
                            Task Summary Linked By SOP
                        </span>
                        Content II
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
};

export default View;

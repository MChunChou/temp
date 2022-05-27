import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";

import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDown,
    faAngleUp,
    faPlus,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { BreadCrumb } from "primereact/breadcrumb";
import MoodRenderer from "./moodRenderer.jsx";
import TotalValueRenderer from "./totalValueRenderer.jsx";
import Icon from "../../styles/img/icon.svg";

const GridExample = (props: any) => {
    const [rowData] = useState([
        {
            id: "aa",
            make: "0121",
            key: "EDI-A08",
            model: "Celica",
            type: ".xls",
            scope: "dept1",
            desc: "PR Coating(ArF/ EUV, UDO)",
            owner: "KP0T11",
            date: "24/08/2008",
            tcount: 3,
        },
        {
            id: "bb",
            make: "0125",
            key: "EDI-A11",
            model: "Mondeo",
            type: ".ppt",
            scope: "dept2",
            desc: "PR Coating (KrF / Arf / Imme)",
            owner: "KP0T11",
            date: "24/08/2008",
            tcount: 2,
        },
        {
            id: "cc",
            make: "0124",
            key: "EDI-A14",
            model: "Boxster",
            type: ".pdf",
            scope: "de88",
            desc: "",
            owner: "PA091",
            date: "24/08/2008",
            tcount: 5,
        },
        {
            id: "dd",
            make: "0126",
            key: "EDI-D11",
            model: "Angel",
            type: ".xls",
            scope: "dept1",
            desc: "Use for ETCH1 pre-hookup tools",
            owner: "KF0T21",
            date: "24/08/2008",
            tcount: 6,
        },
        {
            id: "ee",
            make: "0128",
            key: "EDI-A17",
            model: "Challanger",
            type: ".doc",
            scope: "de88",
            desc: "PR Coating",
            owner: "KP0T11",
            date: "24/08/2008",
            tcount: 0,
        },
        {
            id: "ff",
            make: "0150",
            key: "PHK",
            model: "Kristin",
            type: ".xls",
            scope: "dept3",
            desc: "",
            owner: "KP02A1",
            date: "24/08/2008",
            tcount: 1,
        },
    ]);
    const [columnDefs] = useState([
        {
            headerName: "Fab",
            field: "make",
            minWidth: 120,
            checkboxSelection: true,
        },
        { headerName: "Dept", field: "key" },
        { headerName: "Task File Name", field: "model" },
        {
            headerName: "File Type",
            cellRenderer: MoodRenderer,
            field: "type",
        },
        { headerName: "Task Scope", field: "scope" },
        { headerName: "Task Description", field: "desc" },
        { headerName: "Owner", field: "owner" },
        { headerName: "Update DT", field: "date" },
        {
            headerName: "Action",
            field: "action",
            cellRenderer: TotalValueRenderer,
        },
    ]);
    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            editable: true,
            sortable: true,
            filter: true,
        };
    }, []);

    //BreadCrumb
    const items = [
        { label: "SOP Summary > ", url: "/" },
        { label: "SOP Management For Task : 0124", url: "./0124" },
    ];

    return (
        <div className="sop">
            <div className="topControl">
                <div className="topMenu">
                    <div className="breadcrumb">
                        <BreadCrumb model={items} />
                        <Button className="previous" onClick={() => {}}>
                            <FontAwesomeIcon icon={faAngleUp} />
                        </Button>
                        <Button className="next" onClick={() => {}}>
                            <FontAwesomeIcon icon={faAngleDown} />
                        </Button>
                    </div>
                    <div className="buttonGroup">
                        <Button
                            className="create info"
                            onClick={() => window.open("/create", "_blank")}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </Button>
                        <Button className="savelink info">
                            <svg className="btn-icon">
                                <use xlinkHref={Icon + "#savelink"} />
                            </svg>
                        </Button>
                    </div>
                </div>
                <div className="close">
                    <Button onClick={() => {}}>
                        <FontAwesomeIcon icon={faTimes} />
                    </Button>
                </div>
            </div>
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
                    ></AgGridReact>
                </div>
            </div>
        </div>
    );
};

export default GridExample;

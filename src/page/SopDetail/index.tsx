import React, { useEffect, useMemo, useState, useRef } from "react";

import {
    faAngleDown,
    faAngleUp,
    faPlus,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "primereact/button";
import { useParams, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import GridTable from "../../compoments/GridTable/GridTable";

import Icon from "../../styles/img/icon.svg";

import SopUpload from "./components/SopUpload";
import CellAction from "./components/CellAction";
import CellDownload from "./components/CellDownload";
import CellSelector from "./components/CellSelectorEditor";
import { FirstDataRenderedEvent } from "ag-grid-community";

const scopes = [
    { name: "dept1", code: "dept1" },
    { name: "dept2", code: "dept2" },
    { name: "dept3", code: "dept3" },
    { name: "de88", code: "de88" },
];

const SopDetail = () => {
    const gridRef = useRef<any>();
    const history = useHistory();
    const params: { taskID: string } = useParams();
    const loaction = useLocation();
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [detailData, setDetailData] = useState<any>([]);
    console.log(loaction);

    const detailColumnDefs = useMemo(() => {
        return [
            {
                headerName: "",
                checkboxSelection: true,
                suppressMenu: false,
                filter: false,
                sortable: false,
            },
            { headerName: "Fab", field: "make" },
            { headerName: "Dept", field: "key" },
            {
                headerName: "Task File Name",
                field: "model",
                cellRenderer: CellDownload,
            },
            {
                headerName: "Task Scope",
                field: "scope",
                editable: true,
                cellEditor: CellSelector,
                // cellEditorPopup: true,
                // cellEditorParams: {
                //     cellHeight: 50,
                //     values ["Ireland", "USA"],
                // },
            },
            { headerName: "Task Description", field: "desc", editable: true },
            { headerName: "Owner", field: "owner" },
            { headerName: "Update DT", field: "date" },
            { headerName: "Action", field: "action", cellRenderer: CellAction },
        ];
    }, []);

    useEffect(() => {
        fetch("http://localhost:8000/sop/detail")
            .then((res) => res.json())
            .then((res) => {
                res.detail.sort((a: any, b: any) => {
                    if (a.selected && b.selected) {
                        return 0;
                    }

                    return a.selected ? -1 : 1;
                });

                setDetailData(res.detail);
            });
    }, []);

    const handleClose = () => {
        history.push("/sop");
    };

    const handleOpenUpload = () => {
        setIsUploadOpen(true);
    };

    const handleCloseUpload = () => {
        setIsUploadOpen(false);
    };

    const handleSaveLink = () => {
        if (gridRef) {
            console.log(gridRef, gridRef.current.api.getSelectedRows());
        }
    };

    const handlePrevious = () => {};

    const handleNext = () => {};

    const onGridReady = (gridApi: any) => {
        gridRef.current = gridApi;
    };

    const onFirstDataRendered = (event: FirstDataRenderedEvent) => {
        gridRef.current.api.forEachNode((node: any) => {
            node.setSelected(node.data.selected);
        });
    };

    return (
        <div className="sop details">
            <div className="topControl">
                <div className="topMenu">
                    <div className="breadcrumb">
                        <Breadcrumbs>
                            <span onClick={handleClose}>SOP Summary</span>
                            <span>
                                SOP Management For Task :
                                <span className="breadfont">
                                    {params.taskID}
                                </span>
                            </span>
                        </Breadcrumbs>

                        <Button className="previous" onClick={handlePrevious}>
                            <FontAwesomeIcon icon={faAngleUp} />
                        </Button>
                        <Button className="next" onClick={handleNext}>
                            <FontAwesomeIcon icon={faAngleDown} />
                        </Button>
                    </div>
                    <div className="buttonGroup">
                        <Button
                            className="create info active"
                            onClick={handleOpenUpload}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </Button>
                        <Button
                            className="savelink info"
                            onClick={handleSaveLink}
                        >
                            <svg className="btn-icon">
                                <use xlinkHref={Icon + "#savelink"} />
                            </svg>
                        </Button>
                    </div>
                </div>
                <div className="close">
                    <Button onClick={handleClose}>
                        <FontAwesomeIcon icon={faTimes} />
                    </Button>
                </div>
            </div>
            <SopUpload
                isOpen={isUploadOpen}
                onClose={handleCloseUpload}
                task={params.taskID}
            />
            <div className="view">
                <GridTable
                    dataDefs={{
                        data: detailData,
                    }}
                    columnDefs={{
                        groups: detailColumnDefs,
                    }}
                    gridDefs={{
                        // editType: "fullRow",
                        onGridReady,
                        onFirstDataRendered,
                        suppressRowClickSelection: true,
                        rowSelection: "multiple",
                    }}
                />
            </div>
        </div>
    );
};

export default SopDetail;

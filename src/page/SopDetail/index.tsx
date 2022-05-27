import React, { useEffect, useMemo, useState } from "react";

import {
    faAngleDown,
    faAngleUp,
    faPlus,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "primereact/button";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import GridTable from "../../compoments/GridTable/GridTable";

import Icon from "../../styles/img/icon.svg";

import SopUpload from "./components/SopUpload";
import CellAction from "./components/CellAction";
import CellDownload from "./components/CellDownload";
import CellSelector from "./components/CellSelector";
const scopes = [
    { name: "dept1", code: "dept1" },
    { name: "dept2", code: "dept2" },
    { name: "dept3", code: "dept3" },
    { name: "de88", code: "de88" },
];

const SopDetail = () => {
    const history = useHistory();
    const params: { taskID: string } = useParams();

    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [detailData, setDetailData] = useState<any>([]);
    const detailColumnDefs = useMemo(() => {
        return [
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
                cellEditorPopup: true,
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
                console.log(res.detail);
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

    const handleSaveLink = () => {};

    const handlePrevious = () => {};

    const handleNext = () => {};

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
                        editType: "fullRow",
                    }}
                />
            </div>
        </div>
    );
};

export default SopDetail;

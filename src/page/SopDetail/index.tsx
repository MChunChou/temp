import React, {
    useEffect,
    useMemo,
    useState,
    useRef,
    useCallback,
} from "react";

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
import { useSelector, useDispatch } from "react-redux";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import GridTable from "../../compoments/GridTable/GridTable";

import Icon from "../../styles/img/icon.svg";

import SopUpload from "./components/SopUpload";
import CellAction from "./components/CellAction";
import CellDownload from "./components/CellDownload";
import CellSelector from "./components/CellSelectorEditor";
import { FirstDataRenderedEvent } from "ag-grid-community";

import queryString from "query-string";
import { RootState } from "../../Reducer";

const scopes = [
    { name: "dept1", code: "dept1" },
    { name: "dept2", code: "dept2" },
    { name: "dept3", code: "dept3" },
    { name: "de88", code: "de88" },
];

const SopDetail = () => {
    const count = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    const gridRef = useRef<any>();
    const history = useHistory();
    const params: { taskID: string } = useParams();
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [detailData, setDetailData] = useState<any>([]);

    const loaction = useLocation();
    const query = queryString.parseUrl(loaction.search).query;
    const queryPage = query.page + "";
    const queryValue = query.value + "";

    const detailColumnDefs = useMemo(() => {
        switch (queryPage) {
            case "task":
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
                    {
                        headerName: "Task Description",
                        field: "desc",
                        editable: true,
                    },
                    { headerName: "Owner", field: "owner" },
                    { headerName: "Update DT", field: "date" },
                    {
                        headerName: "Action",
                        field: "action",
                        cellRenderer: CellAction,
                    },
                ];
            case "sop":
                return [
                    {
                        headerName: "",
                        checkboxSelection: true,
                        suppressMenu: false,
                        filter: false,
                        sortable: false,
                    },
                    { headerName: "TaskID", field: "taskId" },
                    { headerName: "KeyStage", field: "keyStage" },
                    { headerName: "Task Name", field: "taskName" },
                    { headerName: "Task Description", field: "desc" },
                ];
            default:
                return [];
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = useCallback(() => {
        fetch(`http://localhost:8000/sop/detail?by=${queryPage}`)
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
    }, [queryPage]);

    const isUpload = useMemo(() => {
        if (queryPage && queryPage.match(/sop/g)) {
            return false;
        }

        return true;
    }, [queryPage]);

    const isLinkCanBeZero = useMemo(() => {
        if (queryPage && queryPage.match(/sop/g)) {
            return false;
        }

        return true;
    }, [queryPage]);

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
            const links = gridRef.current.api.getSelectedRows();
            if (!isLinkCanBeZero && links.length === 0) {
                console.log("links zero");
                onFirstDataRendered(); // set default link
                return;
            }

            console.log(gridRef, gridRef.current.api.getSelectedRows());
            fetchData();
        }
    };

    const handlePrevious = () => {};

    const handleNext = () => {};

    const onGridReady = (gridApi: any) => {
        gridRef.current = gridApi;
    };

    const onFirstDataRendered = () => {
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
                                <span className="breadfont">{queryValue}</span>
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
                        {isUpload && (
                            <Button
                                className="create info active"
                                onClick={handleOpenUpload}
                            >
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        )}
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

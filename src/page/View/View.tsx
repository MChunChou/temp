import React, {
    useState,
    useEffect,
    useMemo,
    useRef,
    useCallback,
} from "react";
import { AgGridReact } from "ag-grid-react";
import GridTable from "../../compoments/GridTable/GridTable";
import * as fh from "../../utils/fetch-helper";
import { Dropdown } from "primereact/dropdown";
import Select from "@mui/material/Select";
import SelectFilter from "../../compoments/GridTable/components/SelectFilter";

// import TaskComponent from "./TaskComponent";

import TaskComponent from "./ViewTask";

import Detail from "./Detail";
import { Link } from "react-router-dom";
import * as eh from "../../utils/export-helper";
import { format as dateFormat } from "../../utils/date-helper";
import Progress from "../../compoments/Progress/Progress";
import { DesktopDateTimePicker } from "@mui/lab";
import { RowNode } from "ag-grid-community";
import {
    isDateInPlan,
    isDelay,
    isCloseDeadLine,
    isOverDue,
    isOnTime,
} from "../../utils/date-helper";

//測試資料
import testD from "../../test.json";

const citySelectItems = [
    { label: "Ongoing", value: 0 },
    { label: "in 3days", value: 1 },
    { label: "in 7days", value: 2 },
    { label: "overdue", value: 3 },
    { label: "on time", value: 4 },
    { label: "delay", value: 5 },
    { label: "no", value: null },
];

const Status = [
    "date in plan",
    "3 days",
    "7 days",
    "dead line",
    "overdue",
    "on time",
    "delay",
];
const LinkC = (props: any) => {
    return (
        <Link
            to={{
                pathname: "/filter", // 連結的字串
                search: "?sort=name", // 搜尋的表達形式
                hash: "#the-hash", // 將hash放到url上
            }}
        >
            {props.value}
        </Link>
    );
};

//返回 post 用的參數
const getScheduleMainParams = (node: any, selected: any, task: any) => {
    const tool: string[] = [];
    const facCd: string[] = [];

    selected.List.forEach((list: any) => {
        const [t, f] = list.split("|");
        tool.push(t);
        facCd.push(f);
    });

    //先過濾掉Node節點 (其實不用過濾)
    const tasks = selected.Task.filter((task: any) => {
        // console.log(node.some((n: any) => n.taskId === task.taskId));
        return !node.some((n: any) => n.taskId === task.taskId);
    }).map((task: any) => {
        return task.taskId;
    });

    // 取得 Task Node ID
    const nodeSet = new Set();
    selected.Task.forEach((task: any) => {
        //檢查在 selected 中用到的大節點 並取其 taskId
        nodeSet.add(
            node.find((n: any) => {
                return n.keyStage === task.keyStage;
            })?.taskId || null
        );
    });

    return {
        tool,
        facCd,
        tasks: [...tasks, ...Array.from(nodeSet)],
        nodeLen: nodeSet.size,
    };
};

const View: React.FC<any> = (props: any) => {
    const theOrder = useRef<any>({});

    const [data, setData] = useState<any>([]);
    const [isDetail, setisDetail] = useState<any>(false);
    const [detail, setDetail] = useState<any>();
    const [detailColumn, setDetailColumn] = useState<any>({});
    const [detailKeyStage, setDetailKeyStage] = useState<string>("");
    const [ctlDate, setCtlDate] = useState<any>(null);
    const [gridAPI, setGridAPI] = useState<any>();
    const [forceUpdate, setForceUpdate] = useState(false);
    const [status, setStatus] = useState<any>(null);

    useEffect(() => {
        getData();
    }, [props.node, props.selected, props.taskOptions]);

    const getData = () => {
        // 取得 post 用資訊
        const params = getScheduleMainParams(
            props.node,
            props.selected,
            props.taskOptions
        );
        fh.post(
            "http://localhost:8000/myschedule/main",
            {},
            {
                handleError: () => {
                    setData(testD.main);
                },
            }
        ).then((res) => {
            if (res) {
                setData(res);
            }
        });
    };

    const removeColumn = (node: string, taskId: string) => {
        const oldOrder = theOrder.current[node] || props.selected[node];
        const removeIdx = oldOrder.findIndex((element: any) => {
            return element.taskId == taskId;
        });

        if (removeIdx > -1) {
            oldOrder.splice(removeIdx, 1);
            theOrder.current = { ...theOrder.current, [node]: oldOrder };
            // setForceUpdate((old) => !old);
        }
    };

    const getDisplayData = useMemo(() => {
        if (data.length > 0) {
        }
    }, [data]);

    const sortData = (node?: any) => {
        if (data.length > 0) {
            // sort for toolInfo
            const afterSort = data.sort((a: any, b: any) => {
                const ai = props.selected.List.indexOf(a.toolInfo.facCd);
                const bi = props.selected.List.indexOf(b.toolInfo.facCd);
                return ai - bi;
            });

            const gridData = data.map((d: any) => {
                const newData = { ...d.toolInfo };
                d.taskList.forEach((task: { taskId: string | number }) => {
                    newData[task.taskId + ""] = task;
                });
                return newData;
            });

            return filterDate(gridData, node);
            // return gridData;
        }

        return [];
    };

    const filterDate = (data: any, node?: any) => {
        // console.log("key", node, "status", status, props);
        const filter: any[] = [];

        if (status === null) {
            return data;
        }

        data.forEach((d: any, index: number) => {
            const cpData = { ...d };
            let isFitOne = false;
            for (let o of Object.entries(cpData)) {
                let [key, value]: [string, any] = o;

                if (value && typeof value !== "string") {
                    // console.warn(
                    //     node && !(value.keyStaget == node),
                    //     node,
                    //     value.keyStaget
                    // );

                    if (node) {
                        if (!(findNodeWithTaskId(value.taskId + "") == node)) {
                            continue;
                        }

                        if (
                            props.node.some(
                                (n: any) => n.taskId === value.taskId
                            )
                        ) {
                            continue;
                        }
                    }

                    const start = value.planDateStart
                        ? new Date(value.planDateStart)
                        : null;
                    const end = value.planDateEnd
                        ? new Date(value.planDateEnd)
                        : null;
                    const complete = value.actlCompleteDate
                        ? new Date(value.actlCompleteDate)
                        : null;
                    const today = new Date();

                    switch (status) {
                        case 0:
                            if (isDateInPlan(today, start, end)) {
                                isFitOne = true;
                            } else {
                                cpData[key] = {};
                            }
                            break;
                        case 1:
                            if (isCloseDeadLine(end, complete, 3)) {
                                isFitOne = true;
                            } else {
                                cpData[key] = {};
                            }
                            break;
                        case 2:
                            if (isCloseDeadLine(end, complete, 7)) {
                                isFitOne = true;
                            } else {
                                cpData[key] = {};
                            }
                            break;
                        case 3:
                            if (isOverDue(end, complete)) {
                                isFitOne = true;
                            } else {
                                cpData[key] = {};
                            }
                            break;
                        case 4:
                            if (isOnTime(end, complete)) {
                                isFitOne = true;
                            } else {
                                cpData[key] = {};
                            }
                            break;
                        case 5:
                            if (isDelay(end, complete)) {
                                isFitOne = true;
                            } else {
                                cpData[key] = {};
                            }
                            break;
                        default:
                            break;
                    }
                } else {
                }
            }

            if (isFitOne) {
                filter.push({ ...cpData });
            }
        });

        return filter;
    };

    const getInfoColumn = (isExpand: boolean, isShrink?: boolean): any[] => {
        const res: any[] = [];
        const info = theOrder.current?.Info || props.selected.Info;

        console.log(props)
        info.forEach(
            (info: { name: string; header_name: string }, idx: number) => {
                let pinned: string | null = null;
                let cellRenderer = null;
                let rowDrag = false;
                let dndLock = false;
                let filter: React.ReactNode | string = 'agTextColumnFilter';

                if (isShrink && idx > 0) {
                    return;
                }

                if (!isExpand && idx > 2) {
                    return;
                }

                if (idx < 3) {
                    pinned = "left";

                    if (idx === 0) {
                        // cellRenderer = LinkC;
                        rowDrag = true;
                        // dndLock = true;
                        filter = SelectFilter
                    }
                }

                res.push({
                    field: info.name,
                    headerName: info.header_name,
                    pinned: pinned,
                    tooltipField: info.name,
                    cellRenderer: cellRenderer,
                    // suppressAutoSize: true,                    
                    // rowDrag: rowDrag,
                    suppressSizeToFit: true,
                    lockPinned: true,
                    filter: filter,
                    filterParams: {
                        options: [
                            { label: 'bookNo_1', value: 'bookNo_1' },
                            { label: 'bookNo_2', value: 'bookNo_2' },
                            { label: 'bookNo_3', value: 'bookNo_3' },
                        ]
                    },
                    // rowDrag: true,
                    // columnGroupShow: info.name === 'facCd' ? 'close' : 'open',
                    comparator: function (
                        valueA: any,
                        valueB: any,
                        nodeA: any,
                        nodeB: any,
                        isInverted: any
                    ) {
                        return nodeA.data[info.name] === nodeB.data[info.name]
                            ? 0
                            : nodeA.data[info.name] > nodeB.data[info.name]
                                ? 1
                                : -1;
                    },

                    headerComponentParams: {
                        isRemove: pinned ? false : true,
                        onRemove: () => {
                            const oldOrder =
                                theOrder.current["Info"] ||
                                props.selected["Info"];
                            const removeIdx = oldOrder.findIndex(
                                (element: any) => {
                                    return element.name == info.name;
                                }
                            );

                            if (removeIdx > -1) {
                                oldOrder.splice(removeIdx, 1);
                                theOrder.current = {
                                    ...theOrder.current,
                                    Info: oldOrder,
                                };
                            }
                        },
                    },
                });
            }
        );

        return res;
    };

    const getTaskColumn = (k: string) => {
        const task = theOrder.current.Task || props.selected.Task;
        // 過濾大節點以及非屬於 "K" 節點的
        const res = task
            .filter((task: any) => {
                if (k === "ALL") {
                    return !props.node.some(
                        (n: any) => n.taskId === task.taskId
                    );
                }

                return (
                    !props.node.some((n: any) => n.taskId === task.taskId) &&
                    task.keyStage === k
                );
            })
            .map((task: { taskId: string; taskName: any }) => {
                return {
                    field: task.taskId + "",
                    headerName: task.taskName,
                    cellRenderer: TaskComponent,
                    cellRendererParams: { ...task },
                    initialWidth: 150,
                    resizable: true,
                    minWidth: 150,
                    lockPinned: true,
                    sortable: true,
                    headerComponentParams: {
                        isRemove: true,
                        onRemove: () => {
                            removeColumn("Task", task.taskId);
                        },
                    },
                    comparator: (
                        v1: any,
                        v2: any,
                        n1: RowNode,
                        n2: RowNode
                    ) => {
                        if (v1 && v2 && v1.planDateEnd && v2.planDateEnd) {
                            const d1 = new Date(v1.planDateEnd);
                            const d2 = new Date(v2.planDateEnd);
                            return v1.planDateEnd === v2.planDateEnd
                                ? 0
                                : d1 > d2
                                    ? 1
                                    : -1;
                        }

                        return 0;
                    },
                    filterValueGetter: (v: any) => {
                        const actlCompleteDate =
                            v.data[v.column.colId].actlCompleteDate;
                        const planDateEnd = v.data[v.column.colId].planDateEnd;
                        return (
                            (actlCompleteDate
                                ? dateFormat(
                                    new Date(actlCompleteDate),
                                    "yyyy/mm/dd"
                                )
                                : "") +
                            (planDateEnd
                                ? dateFormat(
                                    new Date(planDateEnd),
                                    "yyyy/mm/dd"
                                )
                                : "")
                        );
                    },
                };
            });

        return res;
    };

    const nodeColumns = () => {
        const nodeSet = new Set();
        const task = theOrder.current.Task || props.selected.Task;

        task.forEach((task: any) => {
            const node = props.node.find((n: any) => {
                return n.keyStage === task.keyStage;
            });

            // console.log("node------------------- ", node);
            //檢查在 selected 中用到的大節點 並取其 taskId
            if (node) {
                nodeSet.add(node.taskId);
            }
        });

        const res = props.node
            .filter((n: any) => {
                return nodeSet.has(n.taskId);
            })
            .map(
                (task: { taskId: string; taskName: any; keyStage: string }) => {
                    return {
                        field: task.taskId + "",
                        headerName: task.taskName,
                        cellRenderer: TaskComponent,
                        cellRendererParams: {
                            ...task,
                        },
                        sortable: false,
                        filterValueGetter: (v: any) => {
                            const date = v.data[v.column.colId];
                            return (
                                date.actlCompleteDate + " " + date.planDateEnd
                            );
                        },
                        initialWidth: 150,
                        headerComponentParams: {
                            controlComponent: (
                                <div
                                    className="openDetail"
                                    onClick={(v) => {
                                        setisDetail(true);
                                        setDetailColumn([
                                            ...getInfoColumn(false, true),
                                            ...getTaskColumn(task.keyStage),
                                        ]);
                                        setDetailKeyStage(task.keyStage);
                                    }}
                                >
                                    <i className="fa fa-plus-square"></i>
                                </div>
                            ),
                        },
                    };
                }
            );

        return res;
    };

    const getColumn = (isExpand: boolean, isShrink?: boolean): any => {
        return [...getInfoColumn(isExpand, isShrink), ...nodeColumns()];
    };

    const getExpandColumns = (isExpand: boolean) => {
        return getColumn(isExpand);
    };

    const getShrinkColumns = (isExpand: boolean) => {
        return getColumn(false, isExpand);
    };

    /**
     * node {String }
     * data  Example
     * {
     *   actlCompleteDate: "2021/2/2"
     *   isActlEdieable: "true"
     *   isPlanEditable: "true"
     *   keyStaget: "T1"
     *   planDateEnd: "2021/1/2"
     *   planDateStart: "2020/1/1"
     *   taskId: "1001"
     * }
     */
    const filterNode = useCallback((node: string, data: string) => {
        const taskSetting = props.selected.Task;

        console.log(taskSetting);
    }, []);

    // 需要從 儲存的 設定中取得 當前的 taskID
    const findNodeWithTaskId = useCallback((taskId: string) => {
        const taskSetting = props.selected.Task;
        const task = taskSetting.find((t: any) => {
            return t.taskId + "" === taskId;
        });
        // console.log(taskId, task, taskSetting);
        // return task.keyStage;
        return task && task.keyStage;
    }, []);

    const isMainNode = useCallback((node: { taskId: string }) => {
        const mainNodes = props.node;
        return mainNodes.some((mainNode: { taskId: string }) => {
            return mainNode.taskId === node.taskId;
        });
    }, []);

    const getProgressCards = () => {
        // console.log(
        //     "GetProgressCards ============== Data",
        //     data,
        //     "Node",
        //     props.node
        // );
        /**
         * {
         *  title: 大節點名稱,
         *  max: 總數
         *  value: 完成數量
         * }
         *
         */

        const toolCount = data.length;

        const result: any = {
            ALL: 0,
        };

        // props.node.forEach((n: any) => {
        //     result[n.taskName] = { max: 0, value: 0 };
        // })

        /* TODO: 需要 Filter Dept */
        data.forEach((d: any) => {
            /* 每一筆 Tool */
            const res: any = {};
            let total = 0;
            let complete = 0;

            d.taskList.forEach((task: any) => {
                if (!isMainNode(task)) {
                    // console.log(task);
                    const { actlCompleteDate, keyStaget, planDateEnd, taskId } =
                        task;

                    const keyStage =
                        findNodeWithTaskId(taskId + "") || keyStaget;

                    if (!res[keyStage]) {
                        res[keyStage] = { total: 0, complete: 0 };
                    }

                    if (res[keyStage] && planDateEnd) {
                        total += 1;
                        res[keyStage].total += 1;
                        if (actlCompleteDate) {
                            complete += 1;
                            res[keyStage].complete += 1;
                        }
                    }
                }
            });

            if (total === complete) {
                result.ALL++;
            }

            Object.keys(res)
                .filter((key) => {
                    return res[key].total > 0;
                })
                .forEach((key) => {
                    if (!result[key]) {
                        result[key] = 0;
                    }

                    if (res[key].total === res[key].complete) {
                        result[key]++;
                    }
                });
        });

        return Object.keys(result).map((key) => {
            return {
                title: key,
                max: toolCount,
                value: result[key],
            };
        });

        // return Object.keys(result).filter((key) => {
        //     return result[key].max > 0;
        // }).map((key) => {
        //     return {
        //         title: key,
        //         max: result[key].max,
        //         value: result[key].value
        //     }
        // })

        // return null
    };

    const onOrderChange = (node: string, order: any[]) => {
        const oldOrder = theOrder.current[node] || props.selected[node];
        const newOrder = order;
        oldOrder.forEach((column: any) => {
            if (
                !order.some(
                    (c: any) => JSON.stringify(c) === JSON.stringify(column)
                )
            ) {
                newOrder.push(column);
            }
        });

        theOrder.current = { ...theOrder.current, [node]: newOrder };
    };

    const openDetail = (node: string) => {
        setisDetail(true);
        setDetailColumn([
            ...getInfoColumn(false, true),
            ...getTaskColumn(node),
        ]);
        setDetailKeyStage(node);
    };

    let d = null;
    if (isDetail) {
        d = (
            <Detail
                setisDetail={setisDetail}
                sortData={sortData}
                detailColumn={detailColumn}
                breadcrumb={["fileName", detailKeyStage]}
                onOrderChange={onOrderChange}
                order={props.selected.Task}
                node={detailKeyStage}
            ></Detail>
        );
    }

    return (
        <div className="view">
            <button
                onClick={() => {
                    openDetail("ALL");
                }}
            >
                ALL
            </button>
            {/* <Progress cards={getProgressCards()} /> */}

            <Dropdown
                optionLabel="name"
                value={status}
                options={citySelectItems}
                onChange={(e) => {
                    setStatus(e.value);
                }}
                showClear={false}
            />
            {Status[status]}
            <div className="table-control">
                <button
                    onClick={() => {
                        const saveOrder = { ...theOrder.current };
                        const rowNodes: any[] = [];
                        gridAPI.api.forEachNode((rowNode: any) => {
                            rowNodes.push(
                                props.selected.List.find((list: any) =>
                                    list.match(rowNode.data.facCd)
                                )
                            );
                        });

                        saveOrder.list = rowNodes;
                        // console.log(rowNodes);
                        // console.log(saveOrder);

                        // const afterColumns = gridAPI.columnApi
                        //     .getAllGridColumns()
                        //     .map((column: { colId: any }) => {
                        //         // console.log(column);
                        //         return column.colId;
                        //     });
                        // console.log(afterColumns);
                    }}
                >
                    SAVE
                </button>
            </div>

            <GridTable
                dataDefs={{
                    data: sortData(false),
                }}
                columnDefs={{
                    groups: getColumn(false),
                }}
                isExpandComponent={true}
                getExpandColumns={getExpandColumns}
                getShrinkColumns={getShrinkColumns}
                onExpand={() => {
                    const afterColumns = gridAPI.columnApi
                        .getAllGridColumns()
                        .map((column: { colId: any }) => {
                            // console.log(column);
                            return column.colId;
                        });
                    onOrderChange("info", afterColumns);
                }}
                isCsv={true}
                getCsvData={(api: any) => {
                    const csvData: any[] = [];
                    const csvInfoHead: any[] = [];
                    const nodeHead: any[] = [];
                    const infoHead: any[] = [];

                    props.selected.Info.forEach(
                        (info: { name: string }, idx: number) => {
                            csvInfoHead.push({
                                name: info.name,
                                header: info.name,
                            });
                        }
                    );

                    nodeColumns().forEach((node: any) => {
                        nodeHead.push(node.headerName);
                        const task = getTaskColumn(node.headerName);
                        task.forEach((t: any, i: number) => {
                            if (i > 0) {
                                nodeHead.push("");
                            }

                            console.log(t);
                            infoHead.push({
                                field: t.field,
                                name: t.headerName,
                            });
                        });
                    });

                    csvData.push([
                        "",
                        ...csvInfoHead.map((head) => head.name),
                        ...nodeHead,
                    ]);
                    csvData.push([
                        "",
                        ...csvInfoHead.map((head) => ""),
                        ...infoHead.map((info) => info.name),
                    ]);

                    sortData(false).forEach((data: any) => {
                        const start: string[] = ["Start"];
                        const end: string[] = ["End"];
                        const conplete: string[] = ["Complete"];

                        csvInfoHead.forEach((head) => {
                            start.push(data[head.header]);
                            end.push(data[head.header]);
                            conplete.push(data[head.header]);
                        });

                        infoHead.forEach((info) => {
                            start.push(data[info.field].planDateStart);
                            end.push(data[info.field].planDateEnd);
                            conplete.push(data[info.field].actlCompleteDate);
                        });
                        csvData.push(start);
                        csvData.push(end);
                        csvData.push(conplete);
                    });

                    // console.log(sortData(), csvInfoHead,nodeHead,infoHead);

                    return csvData;
                }}
                onRefresh={() => {
                    getData();
                }}
                onColumnMoved={(evt) => {
                    console.log("Info column moved", evt, props);
                    //檢查是否在 info 中
                    // console.log(
                    //     props.selected.Info?.some(
                    //         (select: any) => select.name === evt.column.colId
                    //     )
                    // );

                    if (
                        props.selected.Info?.some(
                            (select: any) => select.name === evt.column.colId
                        )
                    ) {
                        const afterColumns = gridAPI.columnApi
                            .getAllGridColumns()
                            .filter((column: { colId: any }) => {
                                return props.selected.Info?.some(
                                    (info: any) => info.name === column.colId
                                );
                            })
                            .map((column: { colId: any }) => {
                                // console.log(column);
                                return props.selected.Info?.find(
                                    (o: any) => o.name === column.colId
                                );
                            });

                        onOrderChange("Info", afterColumns);
                    }
                }}
                onRowMoved={() => {
                    console.log("Tool Moved");
                }}
                onGridReady={(api) => {
                    setGridAPI(api);
                }}
            />

            {d}
        </div>
    );
};

export default View;

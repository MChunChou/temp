import React, { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import GridTable from "../../compoments/GridTable/GridTable";
import * as fh from "../../utils/fetch-helper";

// import TaskComponent from "./TaskComponent";

import TaskComponent from "./ViewTask";

import Detail from "./Detail";
import { Link } from "react-router-dom";
import * as eh from "../../utils/export-helper";
import { format as dateFormat } from "../../utils/date-helper";
import Progress from "../../compoments/Progress/Progress";
import { DesktopDateTimePicker } from "@mui/lab";
import { RowNode } from "ag-grid-community";

//測試資料
import testD from "../../test.json";

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
            }).taskId
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
    const [data, setData] = useState<any>([]);
    const [isDetail, setisDetail] = useState<any>(false);
    const [detail, setDetail] = useState<any>();
    const [detailColumn, setDetailColumn] = useState<any>({});
    const [detailKeyStage, setDetailKeyStage] = useState<string>("");
    const [ctlDate, setCtlDate] = useState<any>(null);

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

    const getDisplayData = useMemo(() => {
        if (data.length > 0) {
        }
    }, [data]);

    const sortData = (isNode?: boolean) => {
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

            return gridData;
        }

        return [];
    };

    const getInfoColumn = (isExpand: boolean, isShrink?: boolean): any[] => {
        const res: any[] = [];
        props.selected.Info.forEach(
            (info: { name: string; header_name: string }, idx: number) => {
                let pinned: string | null = null;
                let cellRenderer = null;

                if (isShrink && idx > 0) {
                    return;
                }

                if (!isExpand && idx > 2) {
                    return;
                }

                if (idx < 3) {
                    pinned = "left";

                    if (idx === 0) {
                        cellRenderer = LinkC;
                    }
                }

                res.push({
                    field: info.name,
                    headerName: info.header_name,
                    pinned: pinned,
                    tooltipField: info.name,
                    cellRenderer: cellRenderer,
                    // suppressAutoSize: true,
                    suppressSizeToFit: true,
                    lockPinned: true,

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
                });
            }
        );

        return res;
    };

    const getTaskColumn = (k: string) => {
        // 過濾大節點以及非屬於 "K" 節點的
        const res = props.selected.Task.filter((task: any) => {
            return (
                !props.node.some((n: any) => n.taskId === task.taskId) &&
                task.keyStage === k
            );
        }).map((task: { taskId: string; taskName: any }) => {
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
                comparator: (v1: any, v2: any, n1: RowNode, n2: RowNode) => {
                    console.log(v1, v2, n1, n2);
                    const d1 = new Date(v1.planDateEnd);
                    const d2 = new Date(v2.planDateEnd);
                    return v1.planDateEnd === v2.planDateEnd
                        ? 0
                        : d1 > d2
                        ? 1
                        : -1;
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
                            ? dateFormat(new Date(planDateEnd), "yyyy/mm/dd")
                            : "")
                    );
                },
            };
        });

        return res;
    };

    const nodeColumns = () => {
        const nodeSet = new Set();

        props.selected.Task.forEach((task: any) => {
            //檢查在 selected 中用到的大節點 並取其 taskId
            nodeSet.add(
                props.node.find((n: any) => {
                    return n.keyStage === task.keyStage;
                }).taskId
            );
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

    const getProgressCards = () => {
        // console.log(data, props.node);
        /**
         * {
         *  title: 大節點名稱,
         *  max: 總數
         *  value: 完成數量
         * }
         *
         */

        const toolCount = data.length;

        const result: any = {};

        // props.node.forEach((n: any) => {
        //     result[n.taskName] = { max: 0, value: 0 };
        // })

        /* TODO: 需要 Filter Dept */
        data.forEach((d: any) => {
            const res: any = {};
            let total = 0;
            let complete = 0;

            d.taskList.forEach((task: any) => {
                if (!props.node.some((n: any) => n.taskId === task.taskId)) {
                    const { actlCompleteDate, keyStaget, planDateEnd } = task;

                    if (!res[keyStaget]) {
                        res[keyStaget] = { total: 0, complete: 0 };
                    }

                    if (res[keyStaget] && planDateEnd) {
                        res[keyStaget].total += 1;
                        if (actlCompleteDate) {
                            res[keyStaget].complete += 1;
                        }
                    }
                }
            });

            Object.keys(res)
                .filter((key) => {
                    return res[key].total > 0;
                })
                .map((key) => {
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

    // console.warn(getProgressCards());

    let d = null;
    if (isDetail) {
        d = (
            <Detail
                setisDetail={setisDetail}
                sortData={sortData}
                detailColumn={detailColumn}
                breadcrumb={["fileName", detailKeyStage]}
            ></Detail>
        );
    }
    return (
        <div className="view">
            {/* <Progress cards={getProgressCards()}/> */}

            <div className="table-control"></div>

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
            />

            {d}
        </div>
    );
};

export default View;

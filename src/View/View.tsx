import React, { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import GridTable from '../GridTable/GridTable';
import * as fh from '../utils/fetch-helper';
import TaskComponent from './TaskComponent'
import Detail from "./Detail";
import MyCalendar from "../Calendar/Calendar";

//測試資料
const tD = [{
    toolInfo: {
        bookNo: 'bookNo_1',
        IocPhase: 'IocPhase_1',
        deptName: 'deptName_1',
        facCd: 'PDAPK1',
        typeName: 'typeName_1',
        sectionName: 'sectionName_1',
        verdor: 'vendor_1',
        scope: 'scope_1',
        function: 'function_1',
        model: 'model_1',
        wisCd: 'wisCd_1',
        catglist: 'catglist_1',
        locId: 'locId_1',
        templateCatg: 'templateCatg_1'
    },
    isComplete: {
        'PHK': 'N'
    },
    taskList: [
        {
            taskId: '0001',
            planDateStart: '2011/7/1',
            planDateEnd: '2018/9/2',
            actlCompleteDate: null,
            isActlEdieable: 'true',
            isPlanEditable: 'true',
            keyStaget: 'PHK'
        },
        {
            taskId: '0002',
            planDateStart: '2017/5/20',
            planDateEnd: '2021/7/8',
            actlCompleteDate: null,
            isActlEdieable: 'true',
            isPlanEditable: 'false',
            keyStaget: 'T1'
        },
        {
            taskId: 1000,
            planDateStart: '2020/1/11',
            planDateEnd: '2021/1/27',
            actlCompleteDate: '2021/2/2',
            isActlEdieable: 'true',
            isPlanEditable: 'true',
            keyStaget: 'PHK'
        }, {
            taskId: 1001,
            planDateStart: '2020/1/28',
            planDateEnd: '2021/1/30',
            actlCompleteDate: '2021/2/2',
            isActlEdieable: 'true',
            isPlanEditable: 'true',
            keyStaget: 'PHK'
        }, {
            taskId: 1002,
            planDateStart: '2020/1/3',
            planDateEnd: '2021/1/18',
            actlCompleteDate: '2021/2/2',
            isActlEdieable: 'true',
            isPlanEditable: 'true',
            keyStaget: 'T0'
        }]
}, {
    toolInfo: {
        bookNo: 'bookNo_2',
        IocPhase: 'IocPhase_2',
        deptName: 'deptName_2',
        facCd: 'PDAPK2',
        typeName: 'typeName_2',
        sectionName: 'sectionName_2',
        verdor: 'vendor_2',
        scope: 'scope_2',
        function: 'function_2',
        model: 'model_2',
        wisCd: 'wisCd_2',
        catglist: 'catglist_2',
        locId: 'locId_2',
        templateCatg: 'templateCatg_2'
    },
    isComplete: {
        'PHK': 'N'
    },
    taskList: [
        {
            taskId: '0001',
            planDateStart: '2011/7/1',
            planDateEnd: '2018/9/2',
            actlCompleteDate: null,
            isActlEdieable: 'true',
            isPlanEditable: 'true',
            keyStaget: 'PHK'
        },
        {
            taskId: '0002',
            planDateStart: '2017/5/20',
            planDateEnd: '2021/7/8',
            actlCompleteDate: null,
            isActlEdieable: 'true',
            isPlanEditable: 'false',
            keyStaget: 'T1'
        },
        {
            taskId: 1000,
            planDateStart: '2020/1/1',
            planDateEnd: '2021/1/2',
            actlCompleteDate: '2021/2/2',
            isActlEdieable: 'true',
            isPlanEditable: 'true',
            keyStaget: 'PHK'
        }, {
            taskId: 1001,
            planDateStart: '2020/1/1',
            planDateEnd: '2021/1/2',
            actlCompleteDate: '2021/2/2',
            isActlEdieable: 'true',
            isPlanEditable: 'true',
            keyStaget: 'PHK'
        }, {
            taskId: 1002,
            planDateStart: '2020/1/1',
            planDateEnd: '2021/1/2',
            actlCompleteDate: '2021/2/2',
            isActlEdieable: 'true',
            isPlanEditable: 'true',
            keyStaget: 'T0'
        }]
}, {
    toolInfo: {
        bookNo: 'bookNo_3',
        IocPhase: 'IocPhase_3',
        deptName: 'deptName_3',
        facCd: 'PDAPK3',
        typeName: 'typeName_3',
        sectionName: 'sectionName_3',
        verdor: 'vendor_3',
        scope: 'scope_3',
        function: 'function_3',
        model: 'model_3',
        wisCd: 'wisCd_3',
        catglist: 'catglist_3',
        locId: 'locId_3',
        templateCatg: 'templateCatg_3'
    },
    isComplete: {
        'PHK': 'N'
    },
    taskList: [
        {
            taskId: '0001',
            planDateStart: '2011/7/1',
            planDateEnd: '2018/9/2',
            actlCompleteDate: null,
            isActlEdieable: 'true',
            isPlanEditable: 'true',
            keyStaget: 'PHK'
        },
        {
            taskId: '0002',
            planDateStart: '2017/5/20',
            planDateEnd: '2021/7/8',
            actlCompleteDate: null,
            isActlEdieable: 'true',
            isPlanEditable: 'false',
            keyStaget: 'T1'
        },
        {
            taskId: '1000',
            planDateStart: '2020/1/1',
            planDateEnd: '2021/1/2',
            actlCompleteDate: '2021/2/2',
            isActlEdieable: 'true',
            isPlanEditable: 'true',
            keyStaget: 'PHK'
        }, {
            taskId: '1001',
            planDateStart: '2020/1/1',
            planDateEnd: '2021/1/2',
            actlCompleteDate: '2021/2/2',
            isActlEdieable: 'true',
            isPlanEditable: 'true',
            keyStaget: 'PHK'
        }, {
            taskId: '1002',
            planDateStart: '2020/1/1',
            planDateEnd: '2021/1/2',
            actlCompleteDate: '2021/2/2',
            isActlEdieable: 'true',
            isPlanEditable: 'true',
            keyStaget: 'T0'
        }]
}]

//返回 post 用的參數
const getScheduleMainParams = (node: any, selected: any, task: any) => {
    const tool: string[] = [];
    const facCd: string[] = [];

    selected.List.forEach((list: any) => {
        const [t, f] = list.split('|');
        tool.push(t);
        facCd.push(f)
    })

    //先過濾掉Node節點 (其實不用過濾)
    const tasks = selected.Task.filter((task: any) => {
        // console.log(node.some((n: any) => n.taskId === task.taskId));
        return !node.some((n: any) => n.taskId === task.taskId)
    }).map((task: any) => {
        return task.taskId
    });

    // 取得 Task Node ID
    const nodeSet = new Set();
    selected.Task.forEach((task: any) => {
        //檢查在 selected 中用到的大節點 並取其 taskId
        nodeSet.add(
            node.find((n: any) => {
                return n.keyStage === task.keyStage
            }).taskId
        )
    })

    return {
        tool,
        facCd,
        tasks: [...tasks, ...Array.from(nodeSet)],
        nodeLen: nodeSet.size
    }

}

const View: React.FC<any> = (props: any) => {

    const [data, setData] = useState<any>([]);
    const [isDetail, setisDetail] = useState<any>(false)
    const [detail, setDetail] = useState<any>()
    const [detailColumn, setDetailColumn] = useState<any>({})
    const [controlOpen, setControlOpen] = useState<any>({ })
    const [ctlDate, setCtlDate] = useState<any>(null);
    //需要使用useMemo 去取SET


    useEffect(()=>{
        console.warn(controlOpen)
    }, [controlOpen])

    useEffect(() => {
        // 取得 post 用資訊
        const params = getScheduleMainParams(props.node, props.selected, props.taskOptions)
        fh.post('http://localhost:8000/myschedule/main', {}, {
            handleError: () => {
                setData(tD)
            }
        })
            .then(res => {
                if (res) {
                    setData(res)
                }
            });
    }, [props.node, props.selected, props.taskOptions])


    const sortData = (isNode?: boolean) => {
        if (data.length > 0) {
            // sort for toolInfo
            const afterSort = data.sort((a: any, b: any) => {
                const ai = props.selected.List.indexOf(a.toolInfo.facCd)
                const bi = props.selected.List.indexOf(b.toolInfo.facCd)
                return ai - bi
            });

            const gridData = data.map((d: any) => {
                const newData = { ...d.toolInfo };
                d.taskList.forEach((task: { taskId: string | number; }) => {
                    newData[task.taskId + ''] = task
                })
                return newData
            })

            return gridData;
        }

        return []
    }

    const getInfoColumn = (isExpand: boolean, isShrink?: boolean): any[] => {
        const res: any[] = []



        props.selected.Info.forEach((info: { name: string; }, idx: number) => {
            if (isShrink && idx > 0) {
                return
            }

            if (!isExpand && idx > 2) {
                return
            }
            res.push({
                field: info.name,
                pinned: 'left',
                // columnGroupShow: info.name === 'facCd' ? 'close' : 'open',
            })
        })


        return res
    }

    const getTaskColumn = (k: string) => {
        // 過濾大節點以及非屬於 "K" 節點的
        const res = props.selected.Task.filter((task: any) => {
            return !props.node.some((n: any) => n.taskId === task.taskId) && task.keyStage === k
        }).map((task: { taskId: string; taskName: any; }) => {
            return {
                field: task.taskId + '',
                headerName: task.taskName,
                cellRenderer: TaskComponent,
                cellRendererParams: { ...task },
                initialWidth: 100,
                sortable: false,
                filterValueGetter: (v: any) => {
                    console.log(v.column.colId, v.data, v.data[v.column.colId].startPlanDate)
                    return v.data[v.column.colId].planDateStart + ',' + v.data[v.column.colId].planDateEnd
                },
            }
        })

        return res
    }

    const nodeColumns = () => {
        const nodeSet = new Set();
        props.selected.Task.forEach((task: any) => {
            //檢查在 selected 中用到的大節點 並取其 taskId
            nodeSet.add(
                props.node.find((n: any) => {
                    return n.keyStage === task.keyStage
                }).taskId
            )
        })


        const res = props.node.filter((n: any) => {
            return nodeSet.has(n.taskId)
        }).map((task: { taskId: string; taskName: any; keyStage: string }) => {

            return {
                field: task.taskId + '',
                headerName: task.taskName,
                cellRenderer: TaskComponent,
                cellRendererParams: {
                    setCtlDate: (ctlDate:any) => {
                        setCtlDate(ctlDate)
                    },
                    ...task
                },
                sortable: false,
                filterValueGetter: (v: any) => {
                    // console.log(v.column.colId, v.data, v.data[v.column.colId].startPlanDate)
                    return v.data[v.column.colId].planDateStart + ',' + v.data[v.column.colId].planDateEnd
                },
                initialWidth: 100,
                headerComponentParams: {
                    controlComponent: <div
                        className='openDetail'
                        onClick={(v) => {
                        setisDetail(true)
                        setDetailColumn([...getInfoColumn(false, true),...getTaskColumn(task.keyStage)])
                    }}> <i className="fa fa-plus"></i> </div>
                }
            }
        })

        return res
    }

    const getColumn = (isExpand: boolean, isShrink?: boolean): any => {
        return [...getInfoColumn(isExpand, isShrink), ...nodeColumns()]
    }

    const getExpandColumns = (isExpand: boolean) => {
        return getColumn(isExpand)
    }

    const getShrinkColumns = (isExpand: boolean) => {
        return getColumn(false, isExpand)
    }

    let d = null
    if (isDetail) {
        d = <Detail
            setisDetail={setisDetail}
            sortData={sortData}
            detailColumn={detailColumn}
        ></Detail>
    }
    return (
        <div className='view'>
            {/* <MyCalendar
                ctlDate={ctlDate}
            /> */}
            <div className="table-control"></div>
            <GridTable
                dataDefs={{
                    data: sortData(false)
                }}
                columnDefs={{
                    groups: getColumn(false)
                }}
                isExpandComponent={true}
                getExpandColumns={getExpandColumns}
                getShrinkColumns={getShrinkColumns}
            />

            { d }

        </div>
    );
}

export default View;
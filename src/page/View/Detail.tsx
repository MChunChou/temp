import React, { useState, useRef } from "react";
import GridTable from "../../compoments/GridTable/GridTable";
import { Breadcrumbs } from "@mui/material";
import Link from "@mui/material/Link";

const Detail: React.FC<any> = (props: any) => {
    const isOrderChange = useRef(false);
    const [gridAPI, setGridAPI] = useState<any>();
    const setisDetail = props.setisDetail;
    const data = props.sortData(false);
    const columns = props.detailColumn;
    return (
        <div className="table2nd">
            <button
                onClick={() => {
                    setisDetail(false);

                    if (isOrderChange.current) {
                        const rowNodes: any[] = [];
                        gridAPI.api.forEachNode((rowNode: any) => {
                            rowNodes.push(rowNode.data.facCd);
                        });

                        // console.log(rowNodes);
                        const afterColumns = gridAPI.columnApi
                            .getAllGridColumns()
                            .filter((column: { colId: any }) => {
                                return props.order?.some(
                                    (o: any) => o.taskId === column.colId
                                );
                            })
                            .map((column: { colId: any }) => {
                                return props.order.find(
                                    (o: any) => o.taskId === column.colId
                                );
                            });

                        // props.order.forEach((column: any) => {
                        //     if (
                        //         !afterColumns.some(
                        //             (c: any) => c.taskId === column.taskId
                        //         )
                        //     ) {
                        //         afterColumns.push(column);
                        //     }
                        // });
                        // console.log(afterColumns);

                        props.onOrderChange &&
                            props.onOrderChange("Task", afterColumns);
                    }
                }}
            >
                <i className="fa fa-times-circle"></i>
            </button>

            {/* 這邊只是先寫個大概 */}
            <Breadcrumbs aria-label="breadcrumb">
                {props.breadcrumb.map((name: string) => {
                    return (
                        <Link key={name} underline="hover">
                            {name}
                        </Link>
                    );
                })}
            </Breadcrumbs>

            <div className="table">
                <GridTable
                    dataDefs={{
                        data: data,
                    }}
                    columnDefs={{
                        groups: columns,
                    }}
                    onGridReady={(api) => {
                        setGridAPI(api);
                    }}
                    onColumnMoved={() => {
                        console.log("Task column moved");
                        isOrderChange.current = true;
                    }}
                />
            </div>
        </div>
    );
};

export default Detail;

import React, { useState } from "react";
import GridTable from "../../compoments/GridTable/GridTable";
import { Breadcrumbs } from "@mui/material";
import Link from "@mui/material/Link";

const Detail: React.FC<any> = (props: any) => {
    const [gridAPI, setGridAPI] = useState<any>();

    const setisDetail = props.setisDetail;

    const data = props.sortData(false);
    const columns = props.detailColumn;
    return (
        <div className="table2nd">
            <button
                onClick={() => {
                    setisDetail(false);

                    const rowNodes: any[] = [];
                    gridAPI.api.forEachNode((rowNode: any) => {
                        rowNodes.push(rowNode.data.facCd);
                    });
                    console.log(rowNodes);
                    const afterColumns = gridAPI.columnApi
                        .getAllGridColumns()
                        .map((column: { colId: any }) => {
                            console.log(column);
                            return column.colId;
                        });
                    console.log(afterColumns);
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
                />
            </div>
        </div>
    );
};

export default Detail;

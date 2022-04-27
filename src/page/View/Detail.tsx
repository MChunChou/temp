import React from "react";
import GridTable from "../../compoments/GridTable/GridTable";
import { Breadcrumbs } from "@mui/material";
import Link from "@mui/material/Link";

const Detail: React.FC<any> = (props: any) => {
    const setisDetail = props.setisDetail;

    const data = props.sortData(false);
    const columns = props.detailColumn;
    return (
        <div className="table2nd">
            <button
                onClick={() => {
                    setisDetail(false);
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
                />
            </div>
        </div>
    );
};

export default Detail;

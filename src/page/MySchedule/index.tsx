import React, { useState, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Reducer";

import ScheduleEdit from "./components/ScheduleEdit";
import ManagePage from "./components/ScheduleManage";
import DataViewPage from "./components/ScheduleDataView";

const MySchedule: React.FC = () => {
    //紀錄上一頁
    const historyPage = useRef<string>("");

    const isEditOpen = useSelector(
        (state: RootState) => state.mySchedule.isEditOpen
    );
    const isManageOpen = useSelector(
        (state: RootState) => state.mySchedule.isManageOpen
    );
    const isDataViewOpen = useSelector(
        (state: RootState) => state.mySchedule.isDataViewOpen
    );
    const editScheduleName = useSelector(
        (state: RootState) => state.mySchedule.editScheduleName
    );

    useEffect(() => {}, []);

    let editElement: React.ReactNode | null = null;
    if (isEditOpen) {
        editElement = <ScheduleEdit />;
    }

    let manageElement: React.ReactNode | null = null;
    if (isManageOpen) {
        manageElement = <ManagePage />;
    }

    let dataViewElement: React.ReactNode | null = null;
    if (isManageOpen) {
        dataViewElement = <DataViewPage />;
    }

    return (
        <div className="my-schedule">
            {editElement}
            {manageElement}
            {dataViewElement}
        </div>
    );
};

export default MySchedule;

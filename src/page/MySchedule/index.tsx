import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Reducer";

import ScheduleEdit from "./components/ScheduleEdit";
import ManagePage from "./components/ScheduleManage";
import DataViewPage from "./components/ScheduleDataView";

const MySchedule: React.FC = () => {
    const isEditOpen = useSelector(
        (state: RootState) => state.mySchedule.isEditOpen
    );
    const isManageOpen = useSelector(
        (state: RootState) => state.mySchedule.isManageOpen
    );
    const isDataViewOpen = useSelector(
        (state: RootState) => state.mySchedule.isDataViewOpen
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

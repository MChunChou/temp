import React, { useState, useEffect } from "react";
import MyCalendar from "../Calendar/Calendar";

const Control = (props: any) => {
    const { isEditAble, startDate, endDate, completeDate, onChange } =
        props.data;
    const [remark, setRemark] = useState(props.data.remark);

    return <div className="full-width-cell"></div>;
};

export default Control;

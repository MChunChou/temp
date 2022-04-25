import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import MyCalendar from "../Calendar";

const Control = (props: any) => {
    console.log("Control", props.data);

    const {
        actlCompleteDate,
        fullWitdth,
        isEditAbled,
        planDateEnd,
        planDateStart,
        remark,
        setRemark,
    } = props.data;

    const [start, setStart] = useState(
        planDateStart ? new Date(planDateStart) : null
    );
    const [end, setEnd] = useState(planDateEnd ? new Date(planDateEnd) : null);
    const [complete, setComplete] = useState(
        actlCompleteDate ? new Date(actlCompleteDate) : null
    );
    const [stateRemark, setStateRemark] = useState(remark);

    useEffect(() => {
        console.log("COntrol", props.data);
    }, [props.data]);

    return (
        <div className="full-width-cell">
            <div className="cell l">
                <div className="date">
                    <label>
                        Plan Start
                        {planDateStart && planDateStart.toLocaleDateString()}
                    </label>
                    <MyCalendar
                        disabled={!isEditAbled}
                        value={planDateStart}
                        onChange={(date: Date) => {
                            setStart(date);
                        }}
                    />
                </div>
                <div className="date">
                    <label>
                        Plan End
                        {planDateEnd && planDateEnd.toLocaleDateString()}
                    </label>
                    <MyCalendar
                        disabled={!isEditAbled}
                        value={planDateEnd}
                        onChange={(date: Date) => {
                            setEnd(date);
                        }}
                    />
                </div>
                <div className="date">
                    <label>
                        Complete Date
                        {actlCompleteDate &&
                            actlCompleteDate.toLocaleDateString()}
                    </label>
                    <MyCalendar
                        disabled={!isEditAbled}
                        value={actlCompleteDate}
                        onChange={(date: Date) => {
                            console.log("setComplete", props);
                            setComplete(date);
                            props.data.setComplete &&
                                props.data.setComplete(date);
                        }}
                        isAutoFocus={true}
                    />
                </div>
                <div className="date">
                    <label>Remark</label>
                    <textarea
                        value={remark}
                        onChange={(event) => {
                            setRemark(event.target.value);
                        }}
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

export default Control;

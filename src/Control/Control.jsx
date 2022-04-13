import React, { useState, useEffect } from "react";
// import MyCalendar from '../Calendar/FixCalendar';
import MyCalendar from "../Calendar/Calendar";

const Control = (props) => {
    const { isEditAble, dateHelper, onChange } = props.data;
    const [remark, setRemark] = useState(props.data.remark);

    const renderMyCalendar = (value, disabled, maxDate, minDate, type) => {
        return (
            <MyCalendar
                type={type}
                helper={dateHelper}
                disabled={disabled}
                onChange={(date) => {
                    onChange(type, date, remark);
                }}
                value={value}
                maxDate={maxDate}
                minDate={minDate}
            />
        );
    };

    return (
        <div className="full-width-cell">
            <div className="cell l">
                <div className="date">
                    <label>plan Start</label>
                    {renderMyCalendar(
                        // helper.getStartDate(),
                        props.data.startDate,
                        !props.data.isEditAble,
                        props.data.endDate,
                        // helper.getEndDate(),
                        null,
                        "start"
                    )}
                </div>
                <div className="date">
                    <label>plan End</label>
                    {renderMyCalendar(
                        // helper.getEndDate(),
                        props.data.endDate,
                        !props.data.isEditAble,
                        null,
                        // helper.getStartDate(),
                        props.data.startDate,
                        "end"
                    )}
                </div>
                <div className="date">
                    <label>Complete Date</label>
                    {renderMyCalendar(
                        // helper.getCompleteDate(),
                        props.data.completeDate,
                        !props.data.isEditAble,
                        new Date(),
                        null,
                        "complete",
                        true
                    )}
                </div>

                <div className="date">
                    <label>Complete Date</label>

                    <textarea
                        value={remark}
                        onChange={(e) => {
                            console.log(e.target.value);
                            setRemark(e.target.value);
                        }}
                    ></textarea>
                </div>
            </div>
            {/* <div className="cell r">
            <button className="ok"><i className="fa fa-check"></i></button>
            <button className="cancel"><i className="fa fa-times"></i></button>
        </div> */}
        </div>
    );
};

export default Control;

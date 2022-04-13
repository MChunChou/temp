import React from "react";
import Control from "../Control/Control";
import MyCalendar from "../Calendar/Calendar";
import { prependOnceListener } from "process";

const DemoPage2 = (props: any) => {
    console.log(props.mydate);

    const onChange = (type: string, date: Date) => {
        props.mydate.updateDate(type, date);
    };
    return (
        <div>
            PAGE2
            <div>start {props.mydate.startDate?.toLocaleDateString()}</div>
            <div>end {props.mydate.endDate?.toLocaleDateString()}</div>
            <div>
                complete {props.mydate.completeDate?.toLocaleDateString()}
            </div>
            <button
                onClick={() => {
                    const updateDate = `2022/${(Math.random() * 11 + 1).toFixed(
                        0
                    )}/${(Math.random() * 29 + 1).toFixed(0)}`;
                    props.mydate.updateDate("start", updateDate, "");
                }}
            >
                UPDATE Start
            </button>
            <button
                onClick={() => {
                    const updateDate = `2022/${(Math.random() * 11 + 1).toFixed(
                        0
                    )}/${(Math.random() * 29 + 1).toFixed(0)}`;
                    props.mydate.updateDate("end", updateDate, "");
                }}
            >
                UPDATE End
            </button>
            {/* <MyCalendar
                type={"start"}
                helper={props.mydate}
                value={props.mydate.startDate}
                onChange={(date: Date) => {
                    onChange("start", date);
                }}
            />
            <MyCalendar
                type={"end"}
                onChange={(date: Date) => {
                    onChange("end", date);
                }}
                helper={props.mydate}
                value={props.mydate.endDate}
            />
            <MyCalendar
                type={"complete"}
                onChange={(date: Date) => {
                    onChange("complete", date);
                }}
                helper={props.mydate}
                value={props.mydate.completeDate}
            /> */}
            <Control data={{ isEditAble: true, dateHelper: props.mydate }} />
        </div>
    );
};

export default DemoPage2;

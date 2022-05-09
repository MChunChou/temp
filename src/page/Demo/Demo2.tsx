import React, { useState, useRef, useEffect } from "react";
import { Calendar } from "primereact/calendar";

const MyCalendar = (props: any) => {
    const inputText = useRef<string>("");
    const inputFlag = useRef<boolean>(false);
    const [value, setValue] = useState<Date | undefined>();

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    const onChange = (date: Date | undefined) => {
        props.onChange(date);
    };

    return (
        <Calendar
            value={value}
            onFocus={() => {
                inputFlag.current = true;
            }}
            onInput={(e: any) => {
                inputText.current = e.target.value;
            }}
            onBlur={() => {
                onChange(new Date(inputText.current));
            }}
            dateFormat="yy/mm/dd"
        />
    );
};

const DemoPage2 = (props: any) => {
    const [value, setValue] = useState(new Date("2022/1/3"));
    return (
        <div>
            <MyCalendar
                value={value}
                onChange={(date: Date) => {
                    //需延後更新, Calendar Input 才會更動
                    setTimeout(() => {
                        setValue((oldDate) => {
                            if (date.toLocaleDateString() === "Invalid Date") {
                                return oldDate;
                            }
                            return date;
                        });
                    }, 1000);
                }}
            />
        </div>
    );
};

export default DemoPage2;

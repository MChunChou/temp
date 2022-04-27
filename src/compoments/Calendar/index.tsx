import React, { useContext, useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";

const MyCalendar: React.FC<any> = (props: any) => {
    const { disabled, isAutoFocus, onChange } = props;
    const [value, setValue] = useState(props.value);
    const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {
        console.log("MyCalendar", props.value);
        setValue(props.value);
    }, [props.value]);

    const handleDateChange = (date: Date) => {
        onChange(date);
        setValue((d: Date) => {
            console.warn(d, date);
            return date;
        });
        setInputValue("");
    };

    return (
        <Calendar
            id="datetemplate"
            dateFormat="yy/mm/dd"
            disabled={disabled}
            panelClassName="my-calendar"
            value={value}
            onFocus={() => {
                console.log("onFocus");
                if (isAutoFocus && !value) {
                    handleDateChange(new Date());
                }
            }}
            onBlur={() => {
                console.log("onBlur");
                if (inputValue.length > 0) {
                    handleDateChange(new Date(inputValue));
                }
            }}
            onChange={(evt: any) => {
                console.log("onChange", evt);
            }}
            onSelect={(evt: any) => {
                console.log("onSelect", evt);
                handleDateChange(new Date(evt.value));
            }}
            onInput={(evt: any) => {
                console.log("onInput", evt.target.value);
                setInputValue(evt.target.value);
            }}
            monthNavigator
            yearNavigator
            yearRange="2015:2050"
            showButtonBar
            onTodayButtonClick={() => {}}
            onClearButtonClick={() => {}}
            // onViewDateChange={(evt: any) => {
            //     console.log("onViewDateChnage", evt);
            // }}
        />
    );
};

export default MyCalendar;

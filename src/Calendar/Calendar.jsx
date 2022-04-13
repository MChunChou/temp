import React, { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import da from "date-fns/esm/locale/da/index.js";

const MyCalendar = (props) => {
    const [select, setDate] = useState(null);
    const [visible, setVisible] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isOnFocus, setIsOnFocus] = useState(false);
    const [helper] = useState(props.helper);

    useEffect(() => {
        setDate(props.value);
    }, [props.value]);

    function dateTemplate(date) {
        const { day, month, year, today, selectable, otherMonth } = date;
        const d = new Date(year, month, day);
        const [delayDateStart, delayDateEnd] = helper.getDelayDays();
        // 被選取日 : day-active
        // has-plan , has-range, has-range-start, has-range-end
        // has-delay,
        // has-disabled
        const className = ["day"];

        if (select && d.toLocaleDateString() == select.toLocaleDateString()) {
            className.push("day-active");
        }

        if (date.today) {
            className.push("has-today");
        }

        if (helper.isDelay()) {
            if (d >= delayDateStart && d <= delayDateEnd) {
                className.push("has-delay");
            }

            if (delayDateStart && d.getTime() === delayDateStart.getTime()) {
                className.push("has-range-start");
            }

            if (d.getTime() === delayDateEnd.getTime()) {
                className.push("has-range-end");
            }
        }

        // if (d.getTime() === helper.getStartDate().getTime()) {
        if (helper.startDate && d.getTime() === helper.startDate.getTime()) {
            if (helper.isPlanRange()) {
                className.push("has-range-start");
            }
        }

        if (helper.isDateInPlan(d)) {
            className.push("has-plan");
            if (helper.isPlanRange) {
                className.push("has-range");
            }
        }

        if (helper.endDate && d.getTime() === helper.endDate.getTime()) {
            if (helper.isPlanRange()) {
                className.push("has-range-end");
            }
        }

        return <span className={className.join(" ")}>{date.day}</span>;
    }

    const monthNavigatorTemplate = (e) => {
        return (
            <Dropdown
                value={e.value}
                options={e.options}
                onChange={(event) =>
                    e.onChange(event.originalEvent, event.value)
                }
                style={{ lineHeight: 1 }}
            />
        );
    };

    const yearNavigatorTemplate = (e) => {
        return (
            <Dropdown
                value={e.value}
                options={e.options}
                onChange={(event) =>
                    e.onChange(event.originalEvent, event.value)
                }
                className="ml-2"
                style={{ lineHeight: 1 }}
            />
        );
    };

    const onChange = (date) => {
        const success = () => {
            setDate(date);
        };

        const failed = () => {};

        // helper.updateDate(props.type, date, props.remark, success, failed);
        props.onChange(date);
    };

    const onFocus = (date) => {
        if (date) {
            onChange(date);
        }

        if (props.type === "complete" && !select) {
            onChange(new Date());
        }
    };

    return (
        <>
            <Calendar
                id="datetemplate"
                dateFormat="yy/mm/dd"
                disabled={props.disabled}
                // minDate={props.minDate}
                // maxDate={props.maxDate}
                panelClassName="my-calendar"
                value={select}
                // view={select ? select.toLocaleDateString() : ""}
                // keepInvalid={true}
                onFocus={() => {
                    onFocus();
                }}
                onBlur={() => {
                    // setTimeout(() => {
                    //     onFocus(new Date("2022/4/6"));
                    // }, 500);
                }}
                onChange={(e) => {
                    //KeyIn date should save change, but not send
                    if (e.value) {
                        onChange(e.value);
                    }
                }}
                dateTemplate={dateTemplate}
                monthNavigator
                yearNavigator
                yearRange="2015:2050"
                yearNavigatorTemplate={yearNavigatorTemplate}
                monthNavigatorTemplate={monthNavigatorTemplate}
            />

            {/* <Calendar
                showWeek={true}
                panelClassName='test-class-name'
                showButtonBar={true}
                visible={true}
                value={date}
                numberOfMonths={2}
                onChange={(e) => setDate(e.value)}>
            </Calendar>
            <div/>

            <Calendar
            id="controlled"
            selectionMode="multiple"
            value={date}
            onChange={(e) => setDate( e.value )}
            visible={visible}
            onVisibleChange={onVisibleChange} />
            <div/> */}
        </>
    );
};

export default MyCalendar;

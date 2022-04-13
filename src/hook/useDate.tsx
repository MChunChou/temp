import React, { useEffect, useState } from "react";
type DateType = Date | null;

export enum DateOption {
    start = "START",
    end = "END",
    complete = "COMPLETE",
}

interface useDateProps {
    startDate: DateType | string;
    endDate: DateType | string;
    completeDate: DateType | string;
    facCd?: string;
}

const useDate = (props: useDateProps) => {
    const [startDate, setStartDate] = useState<DateType>(null);
    const [endDate, setEndDate] = useState<DateType>(null);
    const [completeDate, setCompleteDate] = useState<DateType>(null);
    const [today, setToday] = useState<DateType>(null);

    useEffect(() => {
        // console.log("UPDATE IS DONE", { startDate, endDate, completeDate });
    }, [startDate, endDate, completeDate]);
    // initial date
    useEffect(() => {
        setDate("start", props.startDate);
        setDate("end", props.endDate);
        setDate("complete", props.completeDate);
        // Warning: 確定是否會有隔日不重開的問題
        setToday(new Date());
    }, []);

    const updateDate = async (
        type: string,
        date: string | DateType,
        remark: string,
        onSuccess?: () => void,
        onFailed?: () => void
    ) => {
        console.warn("update Date", { startDate, endDate, completeDate });
        if (date) {
            date = typeof date === "string" ? new Date(date) : date;

            const updateStart =
                type === "start"
                    ? date.toLocaleDateString()
                    : startDate?.toLocaleDateString();
            const updateEnd =
                type === "end"
                    ? date.toLocaleDateString()
                    : endDate?.toLocaleDateString();
            const updateComplete =
                type === "complete"
                    ? date.toLocaleDateString()
                    : completeDate?.toLocaleDateString();

            const updateData = {
                SUB_FAB: "F18A",
                FAC_CD: props.facCd,
                TAST_ID: 1,
                PLAN_DATE_START: updateStart,
                PLAN_DATE_END: updateEnd,
                ACTL_COMPLETE_DATE: updateComplete,
                REMARK: remark,
            };

            console.warn("Date Update ::::::::::: ", updateData);
            // setDate(type, date);
            // onSuccess && onSuccess();
            const res = await fetch("http://localhost:8000/update/date?")
                .then((r) => {
                    return r.json();
                })
                .then((r) => r);

            if (res.ok) {
                //Success
                // console.log("usseDate::: update date success", type, date);
                setDate(type, date);
                onSuccess && onSuccess();
            } else {
                // console.log("usseDate::: update date failed");
                onFailed && onFailed();
                //Failed
            }
        }
    };

    const setDate = (type: string, date: DateType | string) => {
        const newDate: DateType =
            typeof date === "string" ? new Date(date) : date;
        switch (type) {
            case "start":
                setStartDate(newDate);
                break;
            case "end":
                setEndDate(newDate);
                break;
            case "complete":
                setCompleteDate(newDate);
                break;
            default:
                break;
        }
    };

    const isDelay = () => {
        return !completeDate && endDate && today && today > endDate;
    };

    const isActualDate = () => {
        return completeDate && endDate && completeDate > endDate;
    };

    /**
     * @returns [delayStartDate, delayEndDate]
     */
    const getDelayDays = () => {
        if (endDate) {
            const delayStart = new Date(endDate);
            delayStart.setDate(delayStart.getDate() + 1);
            return [delayStart, completeDate ? completeDate : today];
        }

        return [];
    };

    const isPlanRange = () => {
        if (startDate && endDate) {
            return startDate < endDate;
        }

        return false;
    };

    const isDateInPlan = (date: Date) => {
        if (startDate && endDate) {
            return date >= startDate && date <= endDate;
        }

        if (startDate) {
            return date >= startDate;
        }

        return false;
    };

    return {
        startDate,
        endDate,
        today,
        completeDate,
        isActualDate,
        isDateInPlan,
        isDelay,
        isPlanRange,
        setDate,
        getDelayDays,
        updateDate,
    };
};

export default useDate;

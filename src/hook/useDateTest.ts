import React, {
    useEffect,
    useState,
    useContext,
    useCallback,
    useMemo,
} from "react";
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
}

const useDate = () => {
    const [startDate, setStartDate] = useState<DateType>(null);
    const [endDate, setEndDate] = useState<DateType>(null);
    const [completeDate, setCompleteDate] = useState<DateType>(null);
    const [today] = useState<DateType>(new Date());

    const setDate = useCallback(() => {}, [
        setStartDate,
        setEndDate,
        setCompleteDate,
    ]);
};

export default useDate;

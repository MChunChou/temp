interface DateHelperParams {
    startDate: string | null;
    endDate: string | null;
    completeDate: string | null;
}

const DAY_MS = 86400000; //1000*60*60*24 ( 24 h )
const LOCALE_FORMAT = "zh-TW";

type DateType = Date | null | undefined;

/**
 * @name format
 * @summary Format the date
 * @description
 * Return the formatted date string by giving format type
 *
 * Year format type accept YYYY or YY
 * Month format type accept MM or M
 * Day format type accept DD or D
 *
 * @param {Date} date
 * @param {string} fortmatStr
 * @returns {string}
 *
 * @example
 *  YYYY/MM/DD -> 2022/03/22
 */
export const format = (date: Date, formatStr: string) => {
    formatStr = formatStr.toLocaleLowerCase();

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const result = formatStr
        .match(/y+|m+|d+|./g)!
        .map((substring) => {
            if (substring === "''") {
                return "'";
            }

            const firstCharacter = substring[0];
            const size = substring.length;
            if (firstCharacter === "y") {
                return substring.replace(
                    substring,
                    (year + "").substring(size > 2 ? 0 : 2)
                );
            } else if (firstCharacter === "m") {
                return substring
                    .replace(substring, month + "")
                    .padStart(size > 1 ? 2 : 0, "0");
            } else if (firstCharacter === "d") {
                return substring
                    .replace(substring, day + "")
                    .padStart(size > 1 ? 2 : 0, "0");
            }

            return substring;
        })
        .join("");

    return result;
};

/**
 *  @name isDateEqual
 *  @summary check two date is equal or not
 *  @param {Date} date1
 *  @param {Date} date2
 *  @returns {boolean}
 */
export const isDateEqual = (date1: Date, date2: Date) => {
    return date1.toLocaleDateString() === date2.toLocaleDateString();
};

/**
 * @name getDelayDays
 * @description
 *      Check how many delay days
 *      isDelayDays: false, delaydays is 0
 * @param endDate
 * @param completeDate
 * @returns [isDelayDays, delaydays]
 *
 */
export const getDelayDays = (endDate: DateType, completeDate: DateType) => {
    if (endDate) {
        completeDate = completeDate || new Date();

        const isDelay = completeDate > endDate;
        if (isDelay) {
            const days = (completeDate.getTime() - endDate.getTime()) / DAY_MS;
            return [isDelay, ~~days];
        }
    }

    return [isDelay, 0];
};

/**
 * Check is Delay
 * @description
 *  when endDate exist , completeDate not exist and today > endDate
 *  return true
 * @param endDate
 * @param completeDate
 * @returns boolean
 */
export const isDelay = (endDate: DateType, completeDate: DateType) => {
    const today = new Date();
    if (endDate && !completeDate) {
        return today > endDate;
    }

    return false;
};

/**
 *
 * @param startDate
 * @param endDate
 * @returns
 */
export const isPlanRange = (startDate: DateType, endDate: DateType) => {
    if (startDate && endDate) {
        return startDate > endDate;
    }

    return false;
};

/**
 *
 * @param date
 * @param startDate
 * @param endDate
 * @returns
 */
export const isDateInPlan = (
    date: DateType,
    startDate: DateType,
    endDate: DateType
) => {
    if (date) {
        if (startDate && endDate) {
            return date >= startDate && date <= endDate;
        }

        if (startDate) {
            return date >= startDate;
        }
    }

    return false;
};

/**
 *
 * @param startDate
 * @param endDate
 * @param completeDate
 * @returns
 */
export const isActualDate = (
    startDate: DateType,
    endDate: DateType,
    completeDate: DateType
) => {
    return completeDate && endDate && completeDate > endDate;
};

/**
 * Check is close deadline with {days}
 * @description
 *  when completeDate is not exist , endDate is exist , and  today < endDate
 *
 * @param endDate
 * @param completeDate
 * @param closeDays
 * @returns
 */
export const isCloseDeadLine = (
    endDate: DateType,
    completeDate: DateType,
    closeDays: number = 1
) => {
    const today = new Date();

    if (!completeDate && endDate && today <= endDate) {
        const diffDays = (endDate.getTime() - today.getTime()) / DAY_MS;
        if (diffDays <= closeDays) {
            return true;
        }
    }

    return false;
};

export const isOverDue = (endDate: DateType, completeDate: DateType) => {
    if (endDate && completeDate) {
        return completeDate > endDate;
    }

    return false;
};

export const isOnTime = (endDate: DateType, completeDate: DateType) => {
    if (endDate && completeDate) {
        return completeDate <= endDate;
    }

    return false;
};

class DateHelper {
    startDate: Date | null;
    endDate: Date | null;
    completeDate: Date | null;

    constructor({ startDate, endDate, completeDate }: DateHelperParams) {
        this.startDate = startDate ? new Date(startDate) : null;
        this.endDate = endDate ? new Date(endDate) : null;
        this.completeDate = completeDate ? new Date(completeDate) : null;
    }

    setDate({
        start,
        end,
        complete,
    }: {
        start: Date;
        end: Date;
        complete: Date;
    }) {
        // console.log(start, end ,complete)
        if (start) {
            this.startDate = start;
        }

        if (end) {
            this.endDate = end;
        }

        if (complete) {
            this.completeDate = complete;
        }
    }

    isDelay() {
        const today = this.getToday();
        return !this.completeDate && this.endDate && today > this.endDate;
    }

    getDelayDays() {
        if (this.endDate) {
            const today = this.getToday();
            const endDate = new Date(this.endDate);
            endDate.setDate(this.endDate.getDate() + 1);
            return [endDate, this.completeDate ? this.completeDate : today];
        }

        return [];
    }

    isPlanRange() {
        if (this.startDate && this.endDate) {
            return this.startDate > this.endDate;
        }

        return false;
    }

    isDateInPlan(date: Date) {
        if (this.startDate && this.endDate) {
            return date >= this.startDate && date <= this.endDate;
        }

        if (this.startDate) {
            return date >= this.startDate;
        }

        return false;
    }

    isEqual(date1: Date, date2: Date) {}

    getStartDate(format: boolean = false) {
        if (format && this.startDate) {
            return this.startDate.toLocaleDateString(LOCALE_FORMAT);
        }

        return this.startDate;
    }

    getEndDate(format: boolean = false) {
        if (format && this.endDate) {
            return this.endDate.toLocaleDateString(LOCALE_FORMAT);
        }

        return this.endDate;
    }

    getCompleteDate(format: boolean = false) {
        if (format && this.completeDate) {
            return this.completeDate.toLocaleDateString(LOCALE_FORMAT);
        }

        return this.completeDate;
    }

    getToday(format: boolean = false) {
        return format
            ? new Date().toLocaleDateString(LOCALE_FORMAT)
            : new Date();
    }

    isActualDate() {
        return (
            this.completeDate &&
            this.endDate &&
            this.completeDate > this.endDate
        );
    }

    //名稱忘了 記得查
    isDateWarn(date: Date) {
        return Math.floor(Date.now() - date.getTime()) / DAY_MS;
    }
}

export default DateHelper;

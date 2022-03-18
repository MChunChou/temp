interface DateHelperParams {
    startDate: string | null,
    endDate: string | null,
    completeDate: string | null
}

const DAY_MS = 86400000; //1000*60*60*24

const LOCALE_FORMAT = 'zh-TW'

class DateHelper {
    startDate: Date | null;
    endDate: Date | null;
    completeDate: Date | null;

    constructor({ startDate, endDate, completeDate }: DateHelperParams) {
        this.startDate = startDate ? new Date(startDate) : null;
        this.endDate = endDate ? new Date(endDate) : null;
        this.completeDate = completeDate ? new Date(completeDate) : null;
    }

    setDate({start, end, complete}: { start: Date, end: Date, complete: Date }) {
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
        return !this.completeDate && (this.endDate && (today > this.endDate));
    }

    getDelayDays() {

        if (this.endDate) {
            const today = this.getToday();
            const endDate = new Date(this.endDate);
            endDate.setDate(this.endDate.getDate() + 1);
            return [endDate, this.completeDate ? this.completeDate : today]
        }

        return []
    }

    isPlanRange() {

        if (this.startDate && this.endDate) {
            return this.startDate > this.endDate
        }

        return false
    }

    isDateInPlan(date: Date) {
        if (this.startDate && this.endDate) {
            return date >= this.startDate && date <= this.endDate
        }

        if (this.startDate) {
            return date >= this.startDate;
        }

        return false
    }

    isEqual(date1: Date, date2: Date) {

    }

    getStartDate(format: boolean = false) {
        if(format && this.startDate){
            return this.startDate.toLocaleDateString(LOCALE_FORMAT)
        }

        return this.startDate;
    }

    getEndDate(format: boolean = false) {
        if(format && this.endDate){
            return this.endDate.toLocaleDateString(LOCALE_FORMAT)
        }

        return this.endDate;
    }

    getCompleteDate(format: boolean = false) {
        if(format && this.completeDate){
            return this.completeDate.toLocaleDateString(LOCALE_FORMAT)
        }

        return this.completeDate;
    }

    getToday(format: boolean = false) {
        return format ? new Date().toLocaleDateString(LOCALE_FORMAT) : new Date();
    }

    isActualDate(){
        return this.completeDate && this.endDate && this.completeDate > this.endDate;
    }

    //名稱忘了 記得查
    isDateWarn(date: Date) {
        return Math.floor(Date.now() - date.getTime()) / DAY_MS;
    }
}

export default DateHelper;
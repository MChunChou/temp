interface DateHelperParams {
    startDate: string | null,
    endDate: string | null,
    completeDate: string | null
}

const DAY_MS = 86400000;

class DateHelper {
    startDate: Date | null;
    endDate: Date | null;
    completeDate: Date | null;

    constructor({ startDate, endDate, completeDate }: DateHelperParams) {
        this.startDate = startDate ? new Date(startDate) : null;
        this.endDate = endDate ? new Date(endDate) : null;
        this.completeDate = completeDate ? new Date(completeDate) : null;
    }

    isDelay() {
        const today = this.getToday();
        return !this.completeDate &&  (this.endDate && (today > this.endDate));
    }

    getDelayDays() {

        if(this.endDate){
            const today = this.getToday();
            const endDate = new Date(this.endDate);
            endDate.setDate(this.endDate.getDate() + 1);
            return [endDate, this.completeDate?this.completeDate:today]
        }

        return []
    }

    isPlanRange() {

        if(this.startDate && this.endDate) {
            return this.startDate > this.endDate
        }

        return false
    }

    isDateInPlan(date: Date) {
        if(this.startDate && this.endDate) {
            return date >= this.startDate && date <= this.endDate
        }

        if(this.startDate) {
            return date >= this.startDate;
        }

        return false
    }

    isEqual(date1: Date, date2: Date) {

    }

    getStartDate() {
        return this.startDate;
    }

    getEndDate() {
        return this.endDate;
    }

    getCompleteDate() {
        return this.completeDate;
    }

    getToday(format: boolean = false) {
        return format ? new Date().toLocaleDateString('en-CA') : new Date();
    }
}

export default DateHelper;
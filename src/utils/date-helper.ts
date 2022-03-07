class DateHelper {
    startDate: string | null ;
    endDate: string | null ;

    constructor () {
        this.startDate = null;
        this.endDate = null;
    }

    isDelay () {

    }

    getDelayDays() {

    }

    getStartDate() {
        return this.startDate && new Date(this.startDate);
    }

    getEndDate() {
        return this.endDate && new Date(this.endDate);
    }

    getToday() {
        return new Date().toLocaleDateString('en-CA')
    }
}

export default DateHelper;
import React , {useState, useEffect} from 'react';
import MyCalendar from '../Calendar/Calendar';
import DateHelper from '../utils/date-helper';

const Control = (props) => {
    const { planDateStart, planDateEnd, actlCompleteDate } = props.data
    const helper = new DateHelper({
        startDate: planDateStart,
        endDate: planDateEnd,
        completeDate: actlCompleteDate
    })


    return (<div className="full-width-cell">
        planDateStart <input value={planDateStart} readOnly />
        planDateEnd <input value={planDateEnd} readOnly></input>
        actlCompleteDate <MyCalendar helper={helper}/>
        <i className="fa fa-check"></i>
        <i className="fa fa-close"></i>
    </div>)

}

export default Control;
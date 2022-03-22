import React, { useState, useEffect } from 'react';
import MyCalendar from '../Calendar/Calendar';
import DateHelper from '../utils/date-helper';

const Control = (props) => {
    const { isEditAble, helper, onUpdate } = props.data
    const [update, setUpdate] = useState(false);

    const onChange = (type) => {
        return (evt) => {
            helper.setDate({ [type]: evt })
            setUpdate(!update)
            onUpdate()
        }
    }

    const renderMyCalendar = (value, disabled, maxDate, minDate, type, autoFocus) => {
        return <MyCalendar
            helper={helper}
            disabled={!isEditAble}
            value={value}
            maxDate={maxDate}
            minDate={minDate}
            onChange={onChange(type)}
            autoFocus={autoFocus} />
    }

    return (<div className="full-width-cell">
        <div className='cell l'>
            <div className='date'><label>plan Start</label>{renderMyCalendar(helper.getStartDate(), !isEditAble, helper.getEndDate(), null, 'start')} </div>
            <div className='date'><label>plan End</label> {renderMyCalendar(helper.getEndDate(), !isEditAble, null, helper.getStartDate(), 'end')} </div>
            <div className='date'><label>Complete Date</label>{renderMyCalendar(helper.getCompleteDate(), !isEditAble, new Date(), null, 'complete', true)}  </div>
        </div>
        {/* <div className="cell r">
            <button className="ok"><i className="fa fa-check"></i></button>
            <button className="cancel"><i className="fa fa-times"></i></button>
        </div> */}
    </div>)

}

export default Control;
import React, { useEffect, useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';

const MyCalendar = (props) => {
    // Fix state
    const targetRef = useRef();
    const controlRef = useRef();
    const [isShow, setIsShow] = useState(false);

    const isOutside = (event) => {
        return targetRef.current && !(targetRef.current.isSameNode(event.target) || targetRef.current.contains(event.target));
    }

    useEffect(() => {
        const handle = (e) => {
            if(!controlRef.current.contains(e.target) && isOutside(e)){
                setIsShow(false);
            }
        }
        document.addEventListener('click', handle);

        return document.removeEventListener('mousedown', handle);
    }, []);
    /////////////////////////////////////////
    const [select, setDate] = useState();
    const helper = props.helper


    useEffect(() => {
        setDate(props.value)
    }, [props.value])

    function dateTemplate(date) {
        const { day, month, year, today, selectable, otherMonth } = date;
        const d = new Date(year, month, day);
        const [delayDateStart, delayDateEnd] = helper.getDelayDays();


        // 被選取日 : day-active
        // has-plan , has-range, has-range-start, has-range-end
        // has-delay,
        // has-disabled
        // console.log(date)
        const className = ['day']

        if (select && d.toLocaleDateString() == select.toLocaleDateString()) {
            className.push('day-active')
        }

        if (date.today) {
            className.push('has-today')
        }

        if (helper.isDelay()) {
            if (d >= delayDateStart && d <= delayDateEnd) {
                className.push('has-delay')
            }

            if (d.getTime() === delayDateStart.getTime()) {
                className.push('has-range-start')
            }

            if (d.getTime() === delayDateEnd.getTime()) {
                className.push('has-range-end')
            }
        }

        if (d.getTime() === helper.getStartDate().getTime()) {
            if (helper.isPlanRange()) {
                className.push('has-range-start')
            }
        }

        if (helper.isDateInPlan(d)) {
            className.push('has-plan')
            if (helper.isPlanRange) {
                className.push('has-range')
            }
        }

        if (d.getTime() === helper.getEndDate().getTime()) {
            if (helper.isPlanRange()) {
                className.push('has-range-end')
            }
        }

        return <span className={className.join(' ')}>{date.day}</span>;
    }


    const monthNavigatorTemplate = (e) => {
        return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} style={{ lineHeight: 1 }} />
    }

    const yearNavigatorTemplate = (e) => {
        return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} className="ml-2" style={{ lineHeight: 1 }} />
    }

    const createElement = () => {
        return ReactDOM.createPortal(
            <div
                ref={targetRef}
            >
                <Calendar
                    className='calendar'
                    id="datetemplate"
                    disabled={props.disabled}
                    minDate={props.minDate}
                    maxDate={props.maxDate}
                    panelClassName="my-calendar"
                    value={select}
                    onFocus={() => {
                        if (props.autoFocus && !helper.getCompleteDate()) {
                            setDate(new Date())
                            props.onChange(new Date())
                        }
                    }}
                    onChange={(e) => {
                        setDate(e.value)
                        props.onChange(e.value)
                    }}
                    dateTemplate={dateTemplate}
                    // visible={visible}
                    // onVisibleChange={onVisibleChange}
                    inline
                    monthNavigator yearNavigator yearRange="2015:2050"
                    yearNavigatorTemplate={yearNavigatorTemplate}
                    monthNavigatorTemplate={monthNavigatorTemplate}
                />
            </div>
            , document.body)
    }

    const element = isShow ? createElement() : null;

    return (
        <>
            <span ref={controlRef} onClick={() => {
                setIsShow(true);
            }}>{select && select.toLocaleDateString()}</span>

            {element}
        </>
    )
}

export default MyCalendar;
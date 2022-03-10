import React, { useEffect, useState } from 'react'
import { Calendar } from 'primereact/calendar';

const MyCalendar = (props) => {
    const [date, setDate] = useState();
    const [visible, setVisible] = useState(false)

    const onVisibleChange = (e) => {

        setVisible((prevState) => {
            return e.type === 'dateselect' || e.visible
        })
    }



    function dateTemplate(date) {

        if(date.today) {

            return <span className='today'>{date.day}</span>
        }

        if (date.day > 10 && date.day < 15) {
            return (
                <span className='warn'>{date.day}</span>
            );
        }

        if(date.day > 20 && date.day < 25 ) {
            return (
                <span className='hard' style={{ color: 'red' }}>{date.day}</span>
            );
        }

        return date.day;
    }

    return (
        <div>
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

            <Calendar
                id="datetemplate"
                value={date}
                onChange={(e) => setDate(e.value)}
                dateTemplate={dateTemplate}
            />



        </div>
    )
}

export default MyCalendar;
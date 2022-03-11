import React , {useState, useEffect} from 'react';

const Control = (props) => {
    const { planDateStart, planDateEnd, actlCompleteDate } = props.data

    return (<div className="full-width-cell">
        planDateStart <input value={planDateStart} readOnly />
        planDateEnd <input value={planDateEnd} readOnly></input>
        actlCompleteDate <input value={actlCompleteDate || ''} readOnly></input>

        <i className="fa fa-check"></i>
        <i className="fa fa-close"></i>
    </div>)

}
export default Control;
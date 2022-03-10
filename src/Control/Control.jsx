const Control = (props) => {
    const { planDateStart, planDateEnd, actlCompleteDate } = props.data

    return (<div className="full-width-cell">
        planDateStart <input value={planDateStart} readOnly />
        planDateEnd <input value={planDateEnd} readOnly></input>
        actlCompleteDate <input value={actlCompleteDate || ''} readOnly></input>

        <button>勾勾</button>
        <button>叉叉</button>
    </div>)

}
export default Control;
import React, { useContext, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons"
import DateHelper from "../utils/date-helper"
import '../GridTable/style.css';

const isEditAble = (dataSource: any, isAutoSync: any) => {
    if (isAutoSync === "Y" || dataSource === 'PHK' || dataSource === 'group' || dataSource === 'T1') {
        return false
    }
    return true
}

const Test = (props: any) => {
    const [helper, setHelper] = useState(
        new DateHelper({
            startDate: props.value.planDateStart,
            endDate: props.value.planDateEnd,
            completeDate: props.value.actlCompleteDate
        })
    )
    const [update, setUpdate] = useState([]);

    const onUpdate = () => {
        setUpdate([]);
    }

    const collapseAll = (callback: () => void) => {
        const destoryNode: any[] = [];

        const dataFields = props.api.getColumnDefs().filter((column: any) => {
            return column.cellRendererParams;
        }).map((column: any) => {
            return column.field;
        });

        props.api.forEachNode((node: any, idx: any) => {
            // console.log(node.data, node)
            const data = node.data;

            dataFields.forEach((field: any) => {
                data[field].open = false;
            });

            node.setData({ ...data })
            // node.setData('open', false)

            if (node.data.fullWitdth) {
                destoryNode.push(node.data)
            }
        })

        if (destoryNode.length > 0) {
            props.api.applyTransactionAsync({
                remove: destoryNode
            }, ()=>{
                callback();
            })
        } else {
            callback();
        }

    }

    const getExpandData = () => {
        const { dateSource, isAutoSync } = props;

        return [{ fullWitdth: true, ...props.getValue(), ...props.data, isEditAble: isEditAble(dateSource, isAutoSync), helper: helper, onUpdate: onUpdate }]
    }

    const handleClick = () => {
        const isOpen = props.value.open ? false : true;
        const { dateSource, isAutoSync } = props;

        collapseAll(() => {

            if (isOpen) {
                const row = props.api.getDisplayedRowAtIndex(props.node.rowIndex);
                const rowNode1 = props.api.getDisplayedRowAtIndex(props.node.rowIndex + 1);

                // if (rowNode1 && rowNode1.data.fullWitdth) {
                //     handleRemove()

                //     const newObject: any = {}
                //     Object.keys(row.data).forEach((key) => {
                //         if (typeof row.data[key] === 'object') {

                //             if (row.data[key].taskId === props.getValue().taskId) {
                //                 newObject[key] = { ...row.data[key], open: true }
                //             }
                //             else {
                //                 newObject[key] = { ...row.data[key], open: false }
                //             }

                //         } else {
                //             newObject[key] = row.data[key]
                //         }
                //     })

                //     row.setData(newObject)
                // }

                props.setValue({ ...props.getValue(), open: true, setCtlDate: props.setCtlDate })
                props.api.applyTransactionAsync({
                    add: [{ fullWitdth: true, ...props.getValue(), ...props.data, isEditAble: isEditAble(dateSource, isAutoSync), helper: helper, onUpdate: onUpdate }],
                    addIndex: props.node.rowIndex + 1
                })
            }
            // else {
            //     props.setValue({ ...props.getValue(), open: false, isEditAble: isEditAble(dateSource, isAutoSync), helper: helper, onUpdate: onUpdate })
            //     // handleRemove()
            // }
        });


    }

    // const handleRemove = () => {
    //     const rowNode1 = props.api.getDisplayedRowAtIndex(props.node.rowIndex + 1);

    //     if (rowNode1.data.fullWitdth) {
    //         props.api.applyTransactionAsync({
    //             remove: [rowNode1.data]
    //         })
    //     }
    // }

    return (
        <div
            className="cell"
            onClick={handleClick}
        >
            <>
                {props.value ?
                    <div className="cellDate">
                        <div className={helper.isDelay() ? "has-delay planDate end" : "planDate end"}>
                            {helper.getEndDate(true) || props.value.planDateEnd}
                        </div>
                        <div className={
                            (helper.isActualDate() ? "has-ac-date planDate" : "planDate")
                            + " "
                            + (isEditAble(props.dateSource, props.isAutoSync) && !helper.getCompleteDate() ? "has-empty" : "")
                        }>
                            {helper.getCompleteDate(true) || props.value.actlCompleteDate}
                        </div>
                    </div> : <></>
                }

                <div className="cellDetailSwitch">
                    {
                        props.value.open ? <FontAwesomeIcon icon={faAngleUp} />
                            : <FontAwesomeIcon icon={faAngleDown} />
                    }
                </div>
            </>
        </div >
    )
}

export default Test




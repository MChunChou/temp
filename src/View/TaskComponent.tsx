import React, { useContext, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons"
import DateHelper, {format as DateFormat} from "../utils/date-helper"
import * as fh from '../utils/fetch-helper'
import '../GridTable/style.css';


const isEditAble = (dataSource: any, isAutoSync: any) => {
    // if (isAutoSync === "Y" || dataSource === 'PHK' || dataSource === 'group' || dataSource === 'T1') {
    //     return false
    // }
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
    const { dateSource, isAutoSync } = props;
    const [isEditabled] = useState(isEditAble(dateSource, isAutoSync));

    const onUpdate = () => {
        const updateData = {
            SUB_FAB:'F18A',
            FAC_CD: props.data.facCd,
            TAST_ID: 1,
            PLAN_DATE_START: helper.getStartDate(true),
            PLAN_DATE_END: helper.getEndDate(true),
            ACTL_COMPLETE_DATE: helper.getCompleteDate(true),
            REMARK:123
        }
        // console.log(updateData)
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
            }, callback)
        } else {
            callback();
        }

    }

    const getExpandData = () => {
        return {
            fullWitdth: true,
            ...props.data,
            isEditAble: isEditabled,
            helper: helper,
            onUpdate: onUpdate };
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

                props.setValue({ ...props.getValue(), open: true})
                props.api.applyTransactionAsync({
                    // add: [{ fullWitdth: true, ...props.getValue(), ...props.data, isEditAble: isEditAble(dateSource, isAutoSync), helper: helper, onUpdate: onUpdate }],
                    add: [getExpandData()],
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
                            {helper.getEndDate()? DateFormat(helper.getEndDate() as Date, 'yyyy/mm/dd') : props.value.planDateEnd}
                        </div>
                        <div className={
                            (helper.isActualDate() ? "has-ac-date planDate" : "planDate")
                            + " "
                            + (isEditAble(props.dateSource, props.isAutoSync) && !helper.getCompleteDate() ? "has-empty" : "")
                        }>
                            {helper.getCompleteDate()? DateFormat(helper.getCompleteDate() as Date, 'yyyy/mm/dd') : props.value.actlCompleteDate}
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




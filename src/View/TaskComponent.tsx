import React, { useContext, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons"

import { MyContext } from "../App/App"

const Test = (props: any) => {
    const user = useContext(MyContext);

    const handleClick = () => {
        const isOpen = props.value.open? false : true;

        if (isOpen) {
            const row = props.api.getDisplayedRowAtIndex(props.node.rowIndex);
            const rowNode1 = props.api.getDisplayedRowAtIndex(props.node.rowIndex + 1);

            if(rowNode1 && rowNode1.data.fullWitdth) {
                handleRemove()

                const newObject:any = {}
                Object.keys(row.data).forEach((key)=>{
                    if(typeof row.data[key] === 'object') {

                        if(row.data[key].taskId === props.getValue().taskId){
                            newObject[key] = {...row.data[key], open: true}
                        }
                        else {
                            newObject[key] = {...row.data[key], open: false}
                        }

                    }else {
                        newObject[key] = row.data[key]
                    }
                })

                row.setData(newObject)
            }


            props.setValue({...props.getValue(), open: true})
            props.api.applyTransaction({
                add: [{ fullWitdth: true, ...props.getValue() }],
                addIndex: props.node.rowIndex + 1
            })
        }
        else {
            props.setValue({...props.getValue(), open: false})
            handleRemove()
        }
    }

    const handleRemove = () => {
        const rowNode1 = props.api.getDisplayedRowAtIndex(props.node.rowIndex + 1);

        if(rowNode1.data.fullWitdth) {
            props.api.applyTransaction({
                remove: [rowNode1.data]
            })

        }

    }


    return (
        <div
            style={{
                height: '100px',
                width: '100%',
                display: 'flex',
                flexDirection: 'row'

            }}
            onClick={handleClick}
        >
            <>
                {props.value ?
                    <div style={{

                    }}>
                        <div>{props.value.planDateStart}</div>
                        <div>{props.value.planDateEnd}</div>
                    </div> : <></>
                }

                <div>
                    {
                        props.value.open ? <FontAwesomeIcon icon={faAngleUp} />
                            : <FontAwesomeIcon icon={faAngleDown} />
                    }
                </div>
            </>
        </div >
    )
}

const TaskComponent: React.FC<any> = (props: any) => {


    const className = `task-component ${props.className}`

    const handleClick = () => {

    }

    return (
        <div
            className={className}
            onClick={handleClick}
        >
        </div>
    )
}

export default Test




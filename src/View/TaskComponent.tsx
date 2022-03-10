import React, { useContext, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons"

const Test = (props: any) => {
    const [flag, setFlag] = useState(false)

    const handleClick = () => {
        const isOpen = !flag

        setFlag(isOpen)
        if (isOpen) {
            const rowNode1 = props.api.getDisplayedRowAtIndex(props.node.rowIndex + 1);


            if(rowNode1 && rowNode1.data.fullWitdth) {
                handleRemove()
            }


            props.api.applyTransaction({
                add: [{ fullWitdth: true, ...props.getValue() }],
                addIndex: props.node.rowIndex + 1
            })
        }
        else {
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
                        flag ? <FontAwesomeIcon icon={faAngleUp} />
                            : <FontAwesomeIcon icon={faAngleDown} />
                    }
                </div>
            </>
        </div >
    )
}


const ControlOpenIndex = {};
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




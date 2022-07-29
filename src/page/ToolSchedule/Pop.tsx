
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "primereact/button";
import React, { useMemo, useState, useEffect, useCallback, useRef } from "react";

interface DesParams {
    label: string
    isHelper?: boolean
    conditionTitle?: string
    conditions?: string[]
    errorMessage?: string
}

interface ToolScheduleProps {
    isOpen: boolean;
    desParams?: DesParams;
    className?: string;
    controlElement?: React.ReactNode;
    onClose?: () => void;
}


const Pop: React.FC<ToolScheduleProps> = (props) => {
    const [isOpen, setIsOpen] = useState(props.isOpen)

    useEffect(() => {
        if (isOpen !== props.isOpen) {
            setIsOpen(props.isOpen);
        }
    }, [props.isOpen]);

    const style = useMemo(() => {
        return {
            display: isOpen ? "block" : "none",
        }
    }, [isOpen]);

    const className = useMemo(() => {
        return `pop-control createDetail ${props.className}`
    }, [props.className])

    const desElement: React.ReactNode = useMemo(() => {
        if (props.desParams) {
            const { label, conditionTitle, isHelper, conditions, errorMessage } = props.desParams;
            return (<div className="descript">
                <div className="label">
                    {label}
                    {isHelper &&
                        <span>
                            <i className="fas fa-question-circle" />
                        </span>
                    }
                    <span className="condition">
                        <ol>
                            <span>{conditionTitle}</span>
                            {
                                conditions?.map((condition, idx) => (
                                    <li key={condition}>{condition}</li>
                                ))
                            }
                        </ol>
                    </span>
                </div>
                <div className="error-message">
                    {errorMessage}
                </div>
            </div >)
        }
    }, [JSON.stringify(props.desParams)]);

    const handleClose = useCallback(() => {
        setIsOpen(false)
        props.onClose && props.onClose();
    }, [props.onClose]);

    return (
        <div className={className} style={style}>
            {desElement}
            <div className="content">
                {props.children}
                <div className="buttonGroup">
                    {props.controlElement}

                    <Button
                        className="create info active"
                        onClick={handleClose}
                    >
                        X
                    </Button>
                </div>
            </div>
        </div>
    )
}


export default Pop;
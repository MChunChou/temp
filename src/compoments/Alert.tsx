import React from "react";

interface AlertProps {
    open?: boolean;
    title?: string;
    content?: string;
    childrens?: React.ReactNode;
    onConfirm?: () => void;
}

const Alert = (props: AlertProps) => {
    let content = null;

    if (props.childrens) {
        content = props.childrens;
    } else if (props.content) {
        content = props.content;
    }

    if (props.open) {
        return (
            <div className="custom-confirm">
                <div className="title">{props.title}</div>
                <div className="content">{content}</div>
                <div className="footer">
                    <button onClick={props.onConfirm}>Sure</button>
                </div>
            </div>
        );
    }

    return <></>;
};

export default Alert;

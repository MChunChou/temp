import React from "react";

interface ConfirmProps {
    open?: boolean;
    title?: string;
    content?: string;
    action?: React.ReactNode;
    childrens?: React.ReactNode;
    onConfirm?: () => void;
    onCancel?: () => void;
}

const Confirm = (props: ConfirmProps) => {
    let content = null;
    if (props.childrens) {
        content = props.childrens;
    } else if (props.content) {
        content = props.content;
    }

    let action = null;
    if (props.action) {
        action = props.action;
    } else {
        action = (
            <div className="action">
                <button onClick={props.onConfirm}>Sure</button>
                <button onClick={props.onCancel}>Cancel</button>
            </div>
        );
    }

    if (props.open) {
        return (
            <div className="custom-confirm">
                <div className="title">{props.title}</div>
                <div className="content">{content}</div>
                <div className="footer">{action}</div>
            </div>
        );
    }

    return <></>;
};

export default Confirm;

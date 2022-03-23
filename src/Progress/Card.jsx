import React from "react";
import { ProgressBar } from 'primereact/progressbar';

const Card = (props) => {


    const renderHeader = () => {
        if (props.header) {
            return <div className="p-card-header">
                {props.header}
            </div>;
        }

        return null;
    }

       const displayValueTemplate = (value) => {
        return (
            <React.Fragment>
                {value}/<b>{props.max}</b>
            </React.Fragment>
        );
    }

    const renderChild = () => {
        return <ProgressBar value={props.value} displayValueTemplate={displayValueTemplate}></ProgressBar>

    }

    const renderBody = () => {
        const title = props.title && <div className="p-card-title">{props.title}</div>
        const subTitle = props.subTitle && <div className="p-card-subtitle">{props.subTitle}</div>
        const children = <div className="p-card-content">{renderChild()}</div>
        const footer = props.footer && <div className="p-card-footer">{props.footer}</div>;

        return (
            <div className="p-card-body">
                {title}
                {subTitle}
                {children}
                {footer}
            </div>
        );
    }

    const header = renderHeader();
    const body = renderBody();
    const className = `${props.className ? props.className : ''} p-card p-component`
    return (
        <div className={className}>
            {header}
            {body}
        </div>
    )
}

export default Card;
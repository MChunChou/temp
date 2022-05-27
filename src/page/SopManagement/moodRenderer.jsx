import React from "react";
import { Button } from "primereact/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Icon from "../../styles/img/icon.svg";

export default (props) => {
    const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

    return (
        <span className="fileType">
            <Button>
                <svg>
                    <use xlinkHref={Icon + "#excel"}></use>
                </svg>
            </Button>
            <span>{cellValue}</span>&nbsp;
        </span>
    );
};

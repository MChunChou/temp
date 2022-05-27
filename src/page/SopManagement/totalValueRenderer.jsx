import React from "react";
import { Button } from "primereact/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default (props) => {
    const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

    console.log(props);
    return (
        <span className="action">
            <span>{cellValue}</span>&nbsp;
            <Button className="edit">
                <FontAwesomeIcon icon={faPen} />
            </Button>
            <Button className="delete">
                <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
        </span>
    );
};

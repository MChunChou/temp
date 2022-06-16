import React from "react";
import { Button } from "primereact/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashAlt, faUpload } from "@fortawesome/free-solid-svg-icons";
import { ICellRendererParams, RowNode } from "ag-grid-community";
import * as fh from "../../../utils/fetch-helper";

const ACCEPT_TYPE = [".pdf", ".xls", ".ppt", ".doc"];
const FILE_SIZE_LIMIT = 1024 * 1024 * 10; // 10MB

const CellAction = (props: ICellRendererParams) => {
    // console.log(props);
    const { data } = props;

    const upload = async (file: File, fileName: string) => {
        const uploadFile = new FormData();

        uploadFile.append(fileName, file);

        const uploadResult: any = await fh.upload(
            "http://localhost:8000/upload",
            uploadFile
        );

        if (uploadResult && uploadResult.ok) {
            console.log("upload success");
            // Success
            const newData = { ...data };
            newData.model = fileName;
            newData.date = new Date().toDateString();
            console.log(props);
            props.node.setData(newData);
        } else {
            console.log("upload failed");
        }
    };

    const handleUpload = (evt: any) => {
        const file = evt.target.files[0];
        const fileName = file.name;

        if (file.size <= FILE_SIZE_LIMIT) {
            upload(file, fileName);
        }
    };

    const handleDelete = () => {
        // if success
        props.api.applyTransaction({
            remove: [data],
        });
    };

    const handleEdit = () => {
        props.api.setFocusedCell(props.rowIndex, "scope");
        props.api.startEditingCell({
            rowIndex: props.rowIndex,
            colKey: "scope",
        });
    };

    return (
        <span className="action">
            {/* <Button className="Edit" onClick={handleEdit}>
                <FontAwesomeIcon icon={faPen} />
            </Button> */}

            <input
                onChange={handleUpload}
                className="noshow"
                type="file"
                id={"cell-f-upload-" + props.rowIndex}
                accept={ACCEPT_TYPE.join(",")}
            />

            <Button className="upload">
                <label htmlFor={"cell-f-upload-" + props.rowIndex}>
                    <FontAwesomeIcon icon={faUpload} />
                </label>
            </Button>

            <Button className="delete" onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
        </span>
    );
};

export default CellAction;

import React, { useMemo, useState } from "react";

import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown } from "primereact/dropdown";
// import { useHistory } from "react-router-dom";
import Icon from "../../../styles/img/icon.svg";
import * as fh from "../../../utils/fetch-helper";

const ACCEPT_TYPE = [".pdf", ".xls", ".ppt", ".doc"];
const FILE_SIZE_LIMIT = 1024 * 1024 * 10; // 10MB
const UPLOAD_CONDITION = [
    "File size <= 10MB",
    "Follow PIP guidance",
    "File Type: Word/Excel/PPT/PDF",
    "Clear description for reference",
    "File name change won’t impact SOP link",
];

const scopes = [
    { name: "dept1", code: "dept1" },
    { name: "dept2", code: "dept2" },
    { name: "dept3", code: "dept3" },
    { name: "de88", code: "de88" },
];

interface SopUploadProps {
    task: string;
    isOpen: boolean;
    onClose: () => void;
}

const UploadCondition = (props: any) => {
    return (
        <div className="label">
            Create SOP
            <span>
                <i className="fas fa-question-circle"></i>
            </span>
            <span className="condition">
                <ol>
                    <span>*SOP File Upload Need to Know:</span>
                    {UPLOAD_CONDITION.map((condition, idx) => (
                        <li key={condition}>{condition}</li>
                    ))}
                </ol>
            </span>
        </div>
    );
};

const SopUpload = (props: SopUploadProps) => {
    const [description, setDescription] = useState("");
    const [scope, setScope] = useState("");
    const [fileName, setFileName] = useState("");
    const [file, setFile] = useState<any>();
    const [uploadErrorMsg, setUploadErrorMsg] = useState<string | undefined>(
        undefined
    );

    const handleDescriptionChange = (evt: any) => {
        setDescription(evt.target.value);
    };

    const handleScopChange = (evt: any) => {
        setScope(evt.value);
    };

    const handleFileChange = (evt: any) => {
        const file = evt.target.files[0];
        const fileName = file.name;

        if (file.size > FILE_SIZE_LIMIT) {
            setUploadErrorMsg(UPLOAD_CONDITION[0]);
            return;
        }

        setFile(file);
        setFileName(fileName);
    };

    const clearAllInput = () => {
        setFile(null);
        setFileName("");
        setScope("");
        setDescription("");
        setUploadErrorMsg(undefined);
    };

    const handleClose = () => {
        props.onClose();
        clearAllInput();
    };

    const handleSave = async () => {
        /**
         * TODO upload
         */
        if (file) {
            console.log("save", { description, scope, fileName, file });
            const uploadFile = new FormData();

            uploadFile.append(fileName, file);

            const uploadResult: any = await fh.upload(
                "http://localhost:8000/upload",
                uploadFile
            );

            if (uploadResult && uploadResult.ok) {
                console.log("upload success");
            }
        }
    };

    const style = useMemo(() => {
        return {
            display: props.isOpen ? "block" : "none",
        };
    }, [props.isOpen]);

    return (
        <div className="sop-upload createDetail" style={style}>
            <div>
                <UploadCondition />
                <div className="error-message">{uploadErrorMsg}</div>
            </div>
            <div className="content">
                <div className="fileName">
                    <label>File Name</label>
                    <input readOnly disabled defaultValue={fileName} />
                </div>
                <div className="scope">
                    <label>Scope:</label>
                    <Dropdown
                        value={scope}
                        options={scopes}
                        onChange={handleScopChange}
                        optionLabel="name"
                        placeholder="Select Scope"
                    />
                </div>
                <div className="description">
                    <label>SOP Description:</label>
                    <input
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </div>
                <div className="chooseFile">
                    <input
                        onChange={handleFileChange}
                        className="noshow"
                        type="file"
                        id="f-upload"
                        accept={ACCEPT_TYPE.join(",")}
                    />
                    <label>Choose File:</label>
                    <button className="info fontawesome">
                        <label htmlFor="f-upload">
                            <FontAwesomeIcon icon={faUpload} />
                            <span>upload</span>
                        </label>
                    </button>
                </div>
                <div className="buttonGroup s">
                    <button
                        className="save info"
                        onClick={handleSave}
                        disabled={file ? false : true}
                    >
                        <svg className="btn-icon">
                            <use xlinkHref={Icon + "#save"} />
                        </svg>
                    </button>
                    <button className="cancel danger" onClick={handleClose}>
                        <svg className="btn-icon">
                            <use xlinkHref={Icon + "#cancel"} />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SopUpload;

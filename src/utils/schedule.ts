import { exportFile } from "./export-helper";

const JSONTYPE = "application/json; charset=utf-8";
const TEXTTYPE = "text/plain;charset=utf-8";

export const download = (data: any) => {
    const blob = new Blob([JSON.stringify(data)], {
        type: JSONTYPE,
    });
    const url = URL.createObjectURL(blob);
    exportFile(url, "test.json");
};

export const upload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        console.log(reader.result);
    };
    reader.readAsText(file, "utf-8");
};

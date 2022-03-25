const exportFile = (href:any, name:string) => {
    var link = document.createElement('a');
    link.href = href
    link.setAttribute('download', name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export const csv = (data: any, fileName: string) => {
    const csvType = "text/csv;charset=utf-8";
    const csvHeader = "\uFEFF";
    const enter = navigator.platform.match('Win')? '\r\n': '\n';


    const csv = URL.createObjectURL(new Blob([csvHeader + data.join("\r\n")], {type: csvType}));

    exportFile(csv, fileName);
}

export const excel = () => {

}


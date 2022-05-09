interface GridTableProps {
    dataDefs: DataOptions;
    columnDefs: ColumnsOptions;
    expandComponent?: React.Component;
    isExpandComponent?: boolean;
    control?: React.ReactElement;
    isCsv?: boolean;
    getCsvData?: (api) => any;
    getExpandColumns?: (isExpand) => any;
    getShrinkColumns?: (isExpand) => any;
    onRefresh?: () => void;
    onGridReady?: (api) => void;
}

interface DataOptions {
    data?: object[];
}

interface ColumnsOptions {
    groups?: any[];
}

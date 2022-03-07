
interface GridTableProps {
    dataDefs: DataOptions
    columnDefs: ColumnsOptions
    expandComponent?: React.Component
    isExpandComponent?: boolean
    getExpandColumns?: (isExpand) => any
}

interface DataOptions {
    data?: object[],
}

interface ColumnsOptions {
    groups?: any[]
}

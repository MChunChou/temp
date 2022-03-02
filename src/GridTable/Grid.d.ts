
interface GridTableProps {
    dataDefs: DataOptions
    columnDefs: ColumnsOptions
}

interface DataOptions {
    data?: object[],
}

interface ColumnsOptions {
    groups?: any[]

}

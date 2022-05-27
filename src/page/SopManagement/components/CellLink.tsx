import { Link } from "react-router-dom";
import { ICellRendererParams } from "ag-grid-community";

function CellLink(props: ICellRendererParams) {
    const path = `/sop/${props.data.make}`;
    return <Link to={path}>{props.value}</Link>;
}

export default CellLink;

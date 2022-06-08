import { Link } from "react-router-dom";
import { ICellRendererParams } from "ag-grid-community";

interface CellLinkProps extends ICellRendererParams {
    pathField?: string;
    by?: string;
}

function CellLink(props: CellLinkProps) {
    const path = `/sop/detail?value=${
        props.pathField ? props.data[props.pathField] : props.value
    }&&page=${props.by}`;

    return <Link to={path}>{props.value}</Link>;
}

export default CellLink;

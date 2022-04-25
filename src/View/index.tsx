import React, {
    useState,
    useEffect,
    useMemo,
    useCallback,
    useRef,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Reducer/index";
import GridTable from "../GridTable/GridTable";
import Detail from "./Detail";

const View: React.FC<any> = (props: any) => {
    const dispatch = useDispatch();

    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [filterValues, setFilterValues] = useState<string[]>([]);

    const { editData } = useSelector((state: RootState) => state.mySchedule);

    const filterData = useMemo(() => {
        if (editData && filterValues.length > 0) {
        }
        return [];
    }, [JSON.stringify(editData), filterValues]);

    const getInfoColumn = useCallback(
        (isExpand, isShrink) => {
            if (editData.length > 0) {
                //
                const afterSort = editData.sort((dataA: any, dataB: any) => {
                    return;
                });

                return editData.map((data: any, index: number) => {
                    return;
                });
            }

            return [];
        },
        [JSON.stringify(editData)]
    );

    let detail = null;
    if (isDetailOpen) {
        detail = <Detail></Detail>;
    }

    return (
        <div className="view">
            <div className="card">
                <div className="control"></div>
            </div>

            <div className="card">{/* <GridTable /> */}</div>

            {detail}
        </div>
    );
};

export default View;

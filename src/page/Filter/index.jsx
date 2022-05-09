import React, {
    useState,
    useEffect,
    useMemo,
    useRef,
    useCallback,
} from "react";

import { getData } from "../../FakeDoc/createSelection";
import Filter from "./Filter";
const data = getData();

const FilterPage = () => {
    return (
        <Filter
            label="Sell Example"
            data={data}
            filter={[
                { field: "year", label: "Year" },
                { field: "month", label: "Month" },
                { field: "sale", label: "Prices" },
            ]}
        />
    );

    // value={[]}
    // filter={[
    //     { label: "Month", key: "month" },
    //     { label: "Year", key: "year" },
    //     { label: "Sales Rep", key: "salesRep" },
    //     { label: "Hand Set", key: "handset" },
    // ]}
    // select={[
    //     { label: "Sale", key: "sale" },
    //     { label: "Sale Date", key: "saleDate" },
    // ]}
};

export default FilterPage;

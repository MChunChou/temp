import React, { useState, useRef, useEffect } from "react";
import { MultiSelect } from "primereact/multiselect";

// const cities = [
//     { name: "New York", code: "NY", isFilter: true },
//     { name: "Rome", code: "RM", isFilter: false },
//     { name: "London", code: "LDN", isFilter: true },
//     { name: "Istanbul", code: "IST", isFilter: false },
//     { name: "Paris", code: "PRS", isFilter: true },
// ];

const cities = [
    { n: "New York", c: "NY", isFilter: true },
    { n: "Rome", c: "RM", isFilter: true },
    { n: "London", c: "LDN", isFilter: true },
    { n: "Istanbul", c: "IST", isFilter: true },
    { n: "Paris", c: "PRS", isFilter: true },
];

const DemoPage2 = (props: any) => {
    const [value, setValue] = useState("");
    const [isFilter, setIsFilter] = useState(true);

    return (
        <div>
            <div>
                <button
                    onClick={() => {
                        console.log(isFilter);
                        setIsFilter(!isFilter);
                    }}
                >
                    Filter Open : {isFilter ? "true" : "false"}
                </button>
            </div>
            <div> </div>
            <MultiSelect
                optionLabel="name"
                value={value}
                options={cities.filter(
                    (option) => option.isFilter === isFilter
                )}
                filter
                onChange={(e) => {
                    console.log(e.value);
                    setValue(e.value);
                }}
            />

            <div>{JSON.stringify(value)}</div>
        </div>
    );
};

export default DemoPage2;

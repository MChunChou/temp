import React, {
    useState,
    useEffect,
    useMemo,
    useRef,
    useCallback,
} from "react";

const Filter = (props: any) => {
    console.log(props.data);
    const renderSelection = () => {};
    const renderResult = () => {};

    const selectPanel = renderSelection();
    const resultPanel = renderResult();
    return (
        <div className="filter">
            {props.label}
            {selectPanel}
            {resultPanel}
        </div>
    );
};

export default Filter;

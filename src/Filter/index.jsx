import React, {
    useState,
    useEffect,
    useMemo,
    useRef,
    useCallback,
} from "react";

const Filter = ({ data: datas }) => {
    console.log(datas);
    const renderSelection = () => {};
    const renderResult = () => {};

    const selectPanel = renderSelection();
    const resultPanel = renderResult();
    return (
        <div className="filter">
            {selectPanel}
            {resultPanel}
        </div>
    );
};

export default Filter;

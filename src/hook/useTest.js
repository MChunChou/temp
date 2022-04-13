import React, { useEffect, useState } from "react";

const useTest = () => {
    const [d, setD] = useState('D');

    const set = (newD) => {
        setD(newD)
    }

    const get = () => {
        let dd = d;
        console.log(dd);
    }

    return {
        d,
        set,
        get
    };
};

export default useTest;

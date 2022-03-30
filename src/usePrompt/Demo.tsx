import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { usePrompt } from '../usePrompt/usePrompt';

const Demo = (props:any) => {
    const [isSave, setIsSave] = useState(false);

    usePrompt((location, action) =>{
        console.log(location , action);
        return window.confirm("??");
    }, isSave);

    return (
        <div className='filter'>
            {/* <AlertDialog isBlocking={true} /> */}
            <button onClick={
                ()=>{setIsSave(!isSave)}
            }> Test </button>
            This is Filter : {isSave? 'T' : 'F'}
        </div>
    )
}

export default Demo;
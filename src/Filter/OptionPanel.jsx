import React , {useState, useEffect} from 'react';

const OptionPanel = () => {
    return (
        <div className='option-panel'>
            <select size={size} name={name}></select>
        </div>
    )
}

export default OptionPanel;
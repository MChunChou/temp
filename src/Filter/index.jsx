import React, {useState, useEffect ,useMemo} from 'react'

import {getData} from '../FakeDoc/createSelection'
const testData = getData();

const Filter = (props) => {
    return (
        <div className='filter'>
            Hi' Im filter
        </div>
    )
}

export default Filter;
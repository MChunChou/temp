import React, { useState, useEffect, useRef } from 'react';

interface SearchProps {

}

const Search: React.FC<SearchProps> = (props: SearchProps) => {

    const [value, setValue] = useState(() => {
        let dv = {};
        return dv;
    });



    return (
        <div className='search'></div>
    )
}

export default Search;

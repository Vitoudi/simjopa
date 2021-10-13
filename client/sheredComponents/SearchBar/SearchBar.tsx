import React, { ReactElement, useContext } from 'react'
import { SearchContext } from '../../globalContext/search/SearchContext';

interface Props {
    
}

export default function SearchBar({ }: Props): ReactElement {
    const { getSearchResultsFor } = useContext(SearchContext);

    async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;

        const results = await getSearchResultsFor(value);
        console.log(results);
    }

    return (
        <div>
            <div></div>
            <input onChange={handleChange} type="text" name="search" id="search" />
        </div>
    )
}

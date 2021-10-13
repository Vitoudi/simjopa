import React, { ReactElement, useContext, useEffect, useState } from "react";
import {
  SearchContext,
  SearchResults,
} from "../../globalContext/search/SearchContext";
import CenteredPageContent from "../../sheredComponents/CenteredPageContent/CenteredPageContent";
import Input from "../../sheredComponents/Input/Input";
import JournalistDisplay from "../../sheredComponents/JournalistDisplay/JournalistDisplay";
import Post from "../../sheredComponents/Post/Post";

interface Props {}

export default function SearchPage({}: Props): ReactElement {
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState<SearchResults | null>(null);
  const { getSearchResultsFor } = useContext(SearchContext);

  useEffect(() => {
    if (!searchValue) return;

    getSearchResultsFor(searchValue).then((results) => setResults(results));
  }, [searchValue]);

  return (
    <CenteredPageContent>
      <h1>Pesquisar:</h1>
      <Input
        placeholder="Pesquisar..."
        value={searchValue}
        onValueChange={setSearchValue}
      />
      {results && (
        <div>
          <div>
            {results.posts?.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
          <div>
            {results.journalists?.map((journalist) => (
              <JournalistDisplay key={journalist.id} journalist={journalist} />
            ))}
          </div>
        </div>
      )}
    </CenteredPageContent>
  );
}

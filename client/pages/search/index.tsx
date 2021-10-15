import React, { ReactElement, useContext, useEffect, useState } from "react";
import {
  SearchContext,
  SearchResults,
} from "../../globalContext/search/SearchContext";
import CenteredPageContent from "../../sheredComponents/CenteredPageContent/CenteredPageContent";
import Input from "../../sheredComponents/Input/Input";
import JournalistDisplay from "../../sheredComponents/JournalistDisplay/JournalistDisplay";
import Post from "../../sheredComponents/Post/Post";
import PostsContainer from "../../sheredComponents/postsContainer/PostsContainer";
import styles from "./SearchPage.module.css";

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
    <div className={styles["page"]}>
      <h1 className={styles["title"]}>Pesquisar:</h1>
      <Input
        placeholder="Pesquisar..."
        value={searchValue}
        onValueChange={setSearchValue}
        className={styles["search-bar"]}
      />
      {results && (
        <div className={styles["results"]}>
          {results.posts && <PostsContainer title="Posts:" postsList={results.posts}/>}
          <div>
            {results.journalists?.map((journalist) => (
              <JournalistDisplay key={journalist.id} journalist={journalist} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

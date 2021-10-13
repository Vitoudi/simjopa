import React, {
  PropsWithChildren,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { GetJournalistDto, getJournalists } from "../../utils/db/journalists";
import { GetPostDto, sendRequestToGetPosts } from "../../utils/db/posts";
export interface SearchResults {
  posts: GetPostDto[] | null;
  journalists: GetJournalistDto[] | null;
}

export interface SearchContextData {
  getSearchResultsFor: (searchTerm: string) => Promise<SearchResults>;
}

export const SearchContext = React.createContext({} as SearchContextData);

export default function SearchContextProvider({children}: PropsWithChildren<{}>): ReactElement {

    async function getSearchResultsFor(searchTerm: string) {
        const posts =  await sendRequestToGetPosts({search: searchTerm});
        const journalists = await getJournalists({ search: searchTerm });

        return {
            posts,
            journalists
        }
    }

  return (
    <SearchContext.Provider
      value={{ getSearchResultsFor }}
    >
      {children}
    </SearchContext.Provider>
  );
}

import React, {
  createContext,
  useContext,
  useEffect,
  // useMemo,
  useState
} from "react";
import axios from "axios";
import { useLocalStorage, useWindowWidth } from "../../hooks";

const GOOGLE_SEARCH_URL = `https://www.googleapis.com/customsearch/v1/siterestrict`; // https://customsearch.googleapis.com/customsearch/v1`
const GOOGLE_SEARCH_API_KEY = process.env.GATSBY_GOOGLE_SEARCH_API_KEY;
const GOOGLE_SEARCH_ID = process.env.GATSBY_GOOGLE_SEARCH_ID;
const DOC_SEARCH_PATH = "/docs";
const PAGINATION_RADIUS = {
  mobile: 1,
  desktop: 2
};

//

export const SearchContext = createContext({});

export const useDocSearch = () => useContext(SearchContext);

//

export const DocSearch = ({ children }) => {
  const { isCompact } = useWindowWidth();
  const [query, setQuery] = useState("");
  const [searchedQuery, setSearchedQuery] = useState("");
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [paginationRadius, setPaginationRadius] = useState(
    PAGINATION_RADIUS.mobile
  );
  const [savedResults, setSavedResults] = useState([]);
  const [storedResults, setStoredResults] = useLocalStorage("savedResults", []);

  useEffect(() => {
    if (storedResults.length) {
      setSavedResults(storedResults);
    }
  }, [storedResults]);

  useEffect(() => {
    setPaginationRadius(
      isCompact ? PAGINATION_RADIUS.mobile : PAGINATION_RADIUS.desktop
    );
  }, [isCompact]);

  const handleChangeQuery = event => setQuery(event.target.value);

  const handleGoToFirstPage = () => doSearch(1);
  const handleGoToPreviousPage = () => doSearch(Math.max(0, currentPage - 1));
  const handleGoToPage = pageNumber => event => doSearch(pageNumber);
  const handleGoToNextPage = () =>
    doSearch(Math.min(pageCount, currentPage + 1));
  const handleGoToLastPage = () => doSearch(pageCount);

  useEffect(() => {
    setStoredResults(savedResults);
  }, [savedResults, setStoredResults]);

  const saveResult = newResult => {
    setSavedResults(savedResults => [...new Set([...savedResults, newResult])]);
  };

  const removeResult = resultToRemove => {
    setSavedResults(savedResults =>
      savedResults.filter(r => r.cacheId !== resultToRemove.cacheId)
    );
  };

  const clearSavedResults = () => {
    setSavedResults([]);
  };

  const doSearch = (pageNumber = 1) => {
    const startIndex = (pageNumber - 1) * 10 + 1;
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      setSearchedQuery(query.trim());
      try {
        const params = {
          key: GOOGLE_SEARCH_API_KEY,
          cx: GOOGLE_SEARCH_ID,
          q: query,
          start: startIndex
        };
        const response = await axios.get(GOOGLE_SEARCH_URL, { params });
        if (response.status === 200) {
          if (response.data.items) {
            setCurrentPage(pageNumber);
            setResults(response.data.items);
            setTotalResults(response.data.searchInformation.totalResults);
            setPageCount(
              Math.ceil(response.data.searchInformation.totalResults / 10)
            );
          } else {
            setResults([]);
            setTotalResults(0);
            setCurrentPage(0);
            setPageCount(0);
          }
        } else {
          setError({ message: "An error occurred!" });
        }
        setLoading(false);
      } catch (error) {
        setError({ message: "An error occurred!" });
        console.log(error);
        setLoading(false);
      }
    };
    fetchResults();
  };

  // useEffect(() => {
  //   if (searchedQuery) {
  //     doSearch(currentPage)
  //   }
  // }, [currentPage])

  return (
    <SearchContext.Provider
      value={{
        docSearchPath: DOC_SEARCH_PATH,
        searchedQuery,
        handleChangeQuery,
        doSearch,
        error,
        loading,
        results,
        totalResults,
        pageCount,
        currentPage,
        paginationRadius,
        handleGoToNextPage,
        handleGoToPreviousPage,
        handleGoToPage,
        handleGoToFirstPage,
        handleGoToLastPage,
        savedResults,
        saveResult,
        removeResult,
        clearSavedResults
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

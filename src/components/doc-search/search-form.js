import React, { useEffect, useRef } from "react";
import { useDocSearch } from "./search-context";
import { TextInput, InputGroup } from "../form";
import { Button } from "../buttons";
import { navigate, useLocation } from "@reach/router";
import { useWindowWidth } from "../../hooks";

export const SearchForm = () => {
  const location = useLocation;
  const { query, handleChangeQuery, doSearch, docSearchPath } = useDocSearch();
  const { isCompact } = useWindowWidth();
  const input = useRef();

  const handleSearch = () => {
    doSearch(1);
    if (location.pathname !== docSearchPath) {
      navigate(docSearchPath);
    }
  };

  const handleKeyDown = event => {
    if (event.keyCode === 13) {
      handleSearch();
    }
  };

  useEffect(() => {
    if (input.current) {
      input.current.focus();
    }
  }, []);

  return (
    <InputGroup
      style={{ width: "100%" }}
      flexDirection={isCompact ? "column" : "row"}
      role="search"
    >
      <label htmlFor="search-query" hidden>
        Search Query
      </label>
      <TextInput
        id="search-query"
        ref={input}
        type="text"
        placeholder="Enter search query"
        value={query}
        onChange={handleChangeQuery}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={handleSearch}>Search</Button>
    </InputGroup>
  );
};

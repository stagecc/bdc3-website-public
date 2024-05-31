import React, { createContext, useContext, useEffect, useState } from "react";

const QueryContext = createContext({});

export const QueryCacheProvider = ({ children }) => {
  const [cache, setCache] = useState(new Map());
  
  return (
    <QueryContext.Provider
      value={{
        cache,
        setCache
      }}
    >
      {children}
    </QueryContext.Provider>
  );
};

export const useQuery = ({
  queryKey, queryFn
}) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);

  const ctx = useContext(QueryContext);
  if (ctx === undefined) throw new Error("You must use `useQuery` hook within `QueryContextProvider`");

  useEffect(() => {
    const { cache, setCache } = ctx;
    if (!cache || !setCache) return;

    const fetchData = async () => {
      setIsPending(true);
      setIsError(false);
      setData(null);

      try {
        const key = JSON.stringify(queryKey);
        const cachedData = cache.get(key);
        if (cachedData) {
          setData(cachedData);
          setIsPending(false);
          return;
        }

        const fetchedData = await queryFn();
        setData(fetchedData);
        setCache((prev) => {
          const next = new Map(prev);
          next.set(key, fetchedData);
          return next;
        })
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, [queryKey, queryFn, ctx]);

  return {
    data,
    isPending,
    isError,
  }
}

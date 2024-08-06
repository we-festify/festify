import { useEffect, useState } from "react";

const useSearchQuery = ({ data, getRowId, columns }) => {
  const [rows, setRows] = useState(data || []);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResultIds, setSearchResultIds] = useState([]);

  useEffect(() => {
    setRows((prev) => {
      if (searchQuery === "") return data;
      return data.filter((row) => searchResultIds.includes(getRowId(row)));
    });
  }, [data, searchResultIds]);

  useEffect(() => {
    if (!data) return;
    if (searchQuery === "") return setSearchResultIds([]);
    const regex = new RegExp(searchQuery, "i");
    const queryResultIds = data
      .filter((row) => {
        for (let { key, modifier } of columns) {
          const value = modifier ? modifier(row[key]) : row[key];
          if (regex.test(value)) return true;
        }
        return false;
      })
      .map((row) => getRowId(row));
    setSearchResultIds(queryResultIds);
  }, [searchQuery, data]);

  return {
    rows,
    searchQuery,
    setSearchQuery,
    searchResultIds,
    setSearchResultIds,
  };
};

export default useSearchQuery;

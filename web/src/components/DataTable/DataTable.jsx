import React, { createContext, useContext, useEffect, useState } from "react";
import styles from "./DataTable.module.css";

const dataTableContext = createContext();

const useDataTable = () => useContext(dataTableContext);

const DataTable = ({
  children = [],
  columns = [],
  defaultPageLimit = 10,
  title = "Data Table",
}) => {
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [pageLimit, setPageLimit] = useState(defaultPageLimit);
  const [rows, setRows] = useState([]);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResultIds, setSearchResultIds] = useState([]);

  useEffect(() => {
    setRows((prev) => {
      if (searchQuery === "") return children;
      return prev.filter((row) => searchResultIds.includes(row.props.id));
    });
  }, [children, searchResultIds]);

  useEffect(() => {
    const pages = [];
    for (let i = 0; i < Math.ceil(rows.length / pageLimit); i++) {
      pages.push(rows.slice(i * pageLimit, (i + 1) * pageLimit));
    }
    setPages(pages);
  }, [rows, pageLimit]);

  const movePageLeft = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const movePageRight = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const toggleSelectRow = (id) => {
    if (id === "DATA_TABLE_HEADER") {
      if (selectedRowIds.length === children.length + 1) {
        setSelectedRowIds([]);
      } else {
        setSelectedRowIds(
          children.map((child) => child.props.id).concat("DATA_TABLE_HEADER")
        );
      }
    } else if (selectedRowIds.includes(id)) {
      setSelectedRowIds((prev) => {
        if (prev.length === children.length + 1) {
          prev = prev.filter((rowId) => rowId !== "DATA_TABLE_HEADER");
        }
        return prev.filter((rowId) => rowId !== id);
      });
    } else {
      setSelectedRowIds((prev) => {
        if (prev.length === children.length - 1) {
          return [...prev, id, "DATA_TABLE_HEADER"];
        }
        return [...prev, id];
      });
    }
  };

  useEffect(() => {
    if (searchQuery === "") {
      setSearchResultIds([]);
      return;
    }
    const results = children.filter((child) =>
      child.props.children.some((child) => {
        const value = child.props.children;
        if (typeof value === "string") {
          try {
            const regex = new RegExp(searchQuery, "i");
            return regex.test(value);
          } catch (e) {
            return false;
          }
        }
        return false;
      })
    );
    setSearchResultIds(results.map((result) => result.props.id));
  }, [children, searchQuery]);

  const value = {
    columns,
    isRowSelected: (id) => selectedRowIds.includes(id),
    toggleSelectRow,
    isHighlighted: (id) => searchResultIds.includes(id),
    searchQuery,
  };
  return (
    <dataTableContext.Provider value={value}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.header}>
            <td colSpan={columns.length + 1}>
              <div>
                <span className={styles.title}>{title}</span>
                <div className={styles.actions}>
                  <input
                    type="number"
                    name="page-limit"
                    className={styles.pageLimitInput}
                    min={1}
                    value={pageLimit}
                    onChange={(e) => {
                      if (e.target.value > 0) setPageLimit(e.target.value);
                    }}
                  />
                  <input
                    type="text"
                    name="search"
                    className={styles.searchInput}
                    placeholder="Search (regex)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </td>
          </tr>
          <DataTableRow id="DATA_TABLE_HEADER">
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </DataTableRow>
        </thead>
        <tbody>
          {pages[currentPage] || [
            <tr className={styles.empty} key="empty">
              <td colSpan={columns.length + 1}>No rows to show</td>
            </tr>,
          ]}
          <tr className={styles.footer}>
            <td colSpan={columns.length + 1}>
              <span>
                Showing{" "}
                <b>
                  {currentPage * pageLimit + 1}-
                  {currentPage * pageLimit + (pages[currentPage]?.length || 0)}
                </b>{" "}
                of <b>{children.length}</b> rows
              </span>
              <button onClick={movePageLeft} disabled={currentPage === 0}>
                prev
              </button>
              <button
                onClick={movePageRight}
                disabled={
                  currentPage === pages.length - 1 || pages.length === 0
                }
              >
                next
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </dataTableContext.Provider>
  );
};

export const DataTableRow = ({ children, id }) => {
  const { isRowSelected, toggleSelectRow, isHighlighted, searchQuery } =
    useDataTable();
  return (
    <tr
      className={
        styles.row + " " + (isHighlighted(id) ? styles.highlighted : "")
      }
    >
      {id && (
        <td>
          <input
            type="checkbox"
            checked={isRowSelected(id)}
            onChange={() => toggleSelectRow(id)}
          />
        </td>
      )}
      {/* mark the search query inside the children */}
      {children.map((child, i) => {
        if (child.type === "th") return child;
        const value = child.props.children;
        if (typeof value === "string" && searchQuery !== "") {
          try {
            const regex = new RegExp(searchQuery, "i");
            const matches = value.match(regex);
            if (matches) {
              const parts = value.split(matches[0]);
              return (
                <td key={i}>
                  {parts.map((part, i) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < parts.length - 1 && <mark>{matches[0]}</mark>}
                    </React.Fragment>
                  ))}
                </td>
              );
            }
          } catch (e) {
            return <td key={i}>{value}</td>;
          }
        }
        return <td key={i}>{value}</td>;
      })}
    </tr>
  );
};

export default DataTable;

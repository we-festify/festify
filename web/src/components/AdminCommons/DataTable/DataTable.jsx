import React, { createContext, useContext, useEffect, useState } from "react";
import styles from "./DataTable.module.css";
import usePagination from "../../../hooks/usePagination";
import useSearchQuery from "./hooks/useSearchQuery";
import Dropdown from "../Dropdown/Dropdown";
import { BiChevronDown } from "react-icons/bi";
import { FiMoreHorizontal } from "react-icons/fi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const dataTableContext = createContext();

const useDataTable = () => useContext(dataTableContext);

const DataTable = ({
  columns = [],
  title = "Data Table",
  data,
  getRowId = (row) => row._id,
  actions,
  selectedColumns: initialSelectedColumns,
  controlled = {
    // onSearchQueryChange,
    // showLoading,
    // currentPage,
    // onPageLimitChange,
    // onPageChange,
    // totalPages,
    // pageLimit,
    // totalCount,
  },
}) => {
  const {
    rows: searchResultRows,
    searchQuery,
    setSearchQuery,
    searchResultIds,
  } = useSearchQuery({ data, getRowId, columns });
  const {
    currentPage,
    data: paginatedRows,
    previous: movePageLeft,
    next: movePageRight,
    pageLimit,
    totalPages,
    changePageLimit: setPageLimit,
  } = usePagination({ defaultPageLimit: 10, data: searchResultRows });
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState(
    initialSelectedColumns || columns.map(({ key }) => key)
  );

  const toggleSelectRow = (id) => {
    if (!data) return;
    if (id === "DATA_TABLE_HEADER") {
      if (selectedRowIds.length === data?.length + 1) {
        setSelectedRowIds([]);
      } else {
        setSelectedRowIds(
          data.map((row) => getRowId(row)).concat("DATA_TABLE_HEADER")
        );
      }
    } else if (selectedRowIds.includes(id)) {
      setSelectedRowIds((prev) => {
        if (prev.length === data?.length + 1) {
          prev = prev.filter((rowId) => rowId !== "DATA_TABLE_HEADER");
        }
        return prev.filter((rowId) => rowId !== id);
      });
    } else {
      setSelectedRowIds((prev) => {
        if (prev.length === data?.length - 1) {
          return [...prev, id, "DATA_TABLE_HEADER"];
        }
        return [...prev, id];
      });
    }
  };

  const value = {
    columns,
    title,
    isRowSelected: (id) => selectedRowIds.includes(id),
    toggleSelectRow,
    isHighlighted: (id) => searchResultIds.includes(id),
    searchQuery,
    setSearchQuery,
    pageLimit,
    setPageLimit,
    currentPage,
    totalPages,
    movePageLeft,
    movePageRight,
    data,
    paginatedRows,
    getRowId,
    totalRows: searchResultRows?.length || 0,
    selectedColumns,
    setSelectedColumns,
    actions,
    controlled,
  };
  return (
    <dataTableContext.Provider value={value}>
      <DataTableTop />
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <DataTableHead />
          <DataTableBody />
        </table>
      </div>
      <DataTableFooter />
    </dataTableContext.Provider>
  );
};

const DataTableTop = () => {
  const {
    columns,
    title,
    pageLimit,
    setPageLimit,
    searchQuery,
    setSearchQuery,
    selectedColumns,
    setSelectedColumns,
    controlled,
  } = useDataTable();

  return (
    <div className={styles.top}>
      <span className={styles.title}>{title}</span>
      <div className={styles.actions}>
        <input
          type="number"
          name="page-limit"
          className={styles.pageLimitInput}
          min={1}
          value={pageLimit}
          onChange={(e) => {
            if (e.target.value < 1) return;
            if (controlled.onPageLimitChange instanceof Function)
              controlled.onPageLimitChange(e.target.value);
            setPageLimit(e.target.value);
          }}
        />
        <input
          type="text"
          name="search"
          className={styles.searchInput}
          placeholder="Search (regex)"
          value={searchQuery}
          onChange={(e) => {
            if (controlled.onSearchQueryChange instanceof Function)
              controlled.onSearchQueryChange(e.target.value);
            setSearchQuery(e.target.value);
          }}
        />
        <Dropdown
          button={
            <button className={styles.columnsSelector}>
              Columns <BiChevronDown className={styles.icon} size={18} />
            </button>
          }
        >
          <ul className={styles.columnsSelector}>
            {columns.map(({ label, key }, index) => (
              <li key={`${key}${index}`}>
                <input
                  type="checkbox"
                  id={key}
                  checked={selectedColumns.includes(key)}
                  onChange={() => {
                    if (selectedColumns.includes(key)) {
                      setSelectedColumns((prev) =>
                        prev.filter((k) => k !== key)
                      );
                    } else {
                      setSelectedColumns((prev) => [...prev, key]);
                    }
                  }}
                />
                <label htmlFor={key}>{label}</label>
              </li>
            ))}
          </ul>
        </Dropdown>
      </div>
    </div>
  );
};

const DataTableHead = () => {
  const { columns, selectedColumns, actions } = useDataTable();

  return (
    <thead>
      {columns.length > 0 && (
        <DataTableRow id="DATA_TABLE_HEADER">
          {columns
            .filter(({ key }) => selectedColumns.includes(key))
            .map(({ label, key }, index) => (
              <DataTableHeader key={`${key}-${index}`}>{label}</DataTableHeader>
            ))}
          {actions && <DataTableHeader></DataTableHeader>}
        </DataTableRow>
      )}
    </thead>
  );
};

const DataTableBody = () => {
  const { columns, paginatedRows, getRowId, selectedColumns, controlled } =
    useDataTable();

  return (
    <tbody>
      {paginatedRows
        ? paginatedRows.map((row) => (
            <DataTableRow key={getRowId(row)} id={getRowId(row)}>
              {columns
                .filter(({ key }) => selectedColumns.includes(key))
                .map(({ modifier, key }, index) => (
                  <DataTableCell key={`${key}-${index}`}>
                    {modifier ? modifier(row[key], row) : row[key]}
                  </DataTableCell>
                ))}
            </DataTableRow>
          ))
        : [
            <tr className={styles.empty} key="empty">
              <td colSpan={columns.length + 1}>No rows to show</td>
            </tr>,
          ]}
      {controlled.showLoading && (
        <tr className={styles.bodyLoading}>
          <td colSpan={columns.length + 1}>Loading...</td>
        </tr>
      )}
    </tbody>
  );
};

const DataTableFooter = () => {
  const {
    currentPage,
    paginatedRows,
    pageLimit,
    totalPages,
    movePageLeft,
    movePageRight,
    totalRows,
    controlled,
  } = useDataTable();
  const page = controlled?.currentPage
    ? controlled.currentPage
    : currentPage || 0;
  const pages = controlled?.totalPages ? controlled.totalPages : totalPages;
  const rows = controlled?.totalCount ? controlled.totalCount : totalRows;
  const limit = controlled?.pageLimit ? controlled.pageLimit : pageLimit;
  const count = controlled?.count ? controlled.count : paginatedRows?.length;

  return (
    <div className={styles.footer}>
      <span>
        Showing{" "}
        <b>
          {page * limit + 1}-{page * limit + (count || 0)}
        </b>{" "}
        of <b>{rows}</b> rows
      </span>
      <button
        onClick={() => {
          if (controlled.onPageChange instanceof Function)
            return controlled.onPageChange(Math.max(0, page - 1));
          else movePageLeft();
        }}
        disabled={page === 0}
      >
        prev
      </button>
      <span>
        Page <b>{page + 1}</b> of <b>{pages}</b>
      </span>
      <button
        onClick={() => {
          if (controlled.onPageChange instanceof Function)
            return controlled.onPageChange(Math.min(pages - 1, page + 1));
          else movePageRight();
        }}
        disabled={page === pages - 1 || pages === 0}
      >
        next
      </button>
    </div>
  );
};

const DataTableRow = ({ children, id }) => {
  const { isRowSelected, toggleSelectRow, isHighlighted, actions } =
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
            className={styles.checkbox}
            type="checkbox"
            checked={isRowSelected(id)}
            onChange={() => toggleSelectRow(id)}
          />
        </td>
      )}
      {children}
      {actions && id !== "DATA_TABLE_HEADER" && (
        <td className={styles.rowActions}>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <FiMoreHorizontal size={18} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Object.keys(actions)
                .filter((k) => k !== "delete" && k !== "click")
                .map((key) => {
                  if (typeof actions[key] === "object")
                    return (
                      <DropdownMenuItem
                        key={key}
                        onClick={() => actions[key].action(id)}
                      >
                        <span className="capitalize">{actions[key].label}</span>
                      </DropdownMenuItem>
                    );
                  if (typeof actions[key] === "function")
                    return (
                      <DropdownMenuItem
                        key={key}
                        onClick={() => actions[key](id)}
                      >
                        <span className="capitalize">{key}</span>
                      </DropdownMenuItem>
                    );
                  throw new Error(
                    "Invalid action type. Action must be either a function or an object with an action function and a label string"
                  );
                })}
              {actions.delete && (
                <DropdownMenuItem
                  className="focus:bg-red-100 text-red-500 focus:text-red-500"
                  onClick={() => {
                    if (typeof actions.delete === "function")
                      actions.delete(id);
                  }}
                >
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </td>
      )}
    </tr>
  );
};

const DataTableHeader = ({ children }) => {
  return <th>{children}</th>;
};

const DataTableCell = ({ children }) => {
  const { searchQuery } = useDataTable();
  const value = children;
  if (typeof value === "string" && searchQuery !== "") {
    try {
      const regex = new RegExp(searchQuery, "i");
      const matches = value.match(regex);
      if (matches) {
        const parts = value.split(matches[0]);
        return (
          <td>
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
      return <td>{value}</td>;
    }
  }
  return <td>{value}</td>;
};

export default DataTable;

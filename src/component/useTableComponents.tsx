import _ from 'lodash';
import React, { useCallback, useState, useEffect } from 'react';
import { useFilters, usePagination, useSortBy, useTable } from 'react-table';
import "./Table.css"
export function useTableComponents(columns: any[], rowData: any[], sortable: boolean) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [pageCount, setPageCount] = React.useState(0);
    const fetchIdRef = React.useRef(0);
    const sortIdRef = React.useRef(0);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize, sortBy }
    } = useTable({
        columns,
        data: data,
        manualPagination: true,
        manualSortBy: sortable,
        autoResetSortBy: false,
        autoResetPage: false,
        pageCount: pageCount,
        initialState: { pageSize: 12 }
    }, useFilters, useSortBy, usePagination);

    const handleSort = useCallback(() => {
        // Give this sort an ID
        const sortId = ++sortIdRef.current;

        setLoading(true);
        setTimeout(() => {
            if (sortId === sortIdRef.current) {
                let sorted = _.cloneDeep(rowData)
                sorted.sort((a, b) => {
                    for (let i = 0; i < sortBy.length; i++) {
                        if (a[sortBy[i].id] > b[sortBy[i].id]) {
                            return sortBy[i].desc ? -1 : 1;
                        } else if (a[sortBy[i].id] < b[sortBy[i].id]) {
                            return sortBy[i].desc ? 1 : -1;
                        }
                    }
                    return 0;
                })
                const startRow = pageSize * pageIndex;
                const endRow = pageSize + startRow;
                setData(sorted.slice(startRow, endRow));
                setLoading(false);
            }
        }, 100);

    }, [pageIndex, pageSize, sortBy]);

    const setPaginatedData = useCallback(() => {
        const fetchId = ++fetchIdRef.current;
        setLoading(true);
        setTimeout(() => {
            if (fetchId === fetchIdRef.current) {// if this is the latest fetch
                const startRow = pageSize * pageIndex;
                const endRow = startRow + pageSize;
                setData(rowData.slice(startRow, endRow))
                setPageCount(Math.ceil(rowData.length / pageSize));
                setLoading(false);
            }
        }, 1);
    }, [pageIndex, pageSize])

    useEffect(() => {
        handleSort();
    }, [handleSort, setPaginatedData, pageIndex, pageSize, sortBy])

    useEffect(() => {
        setPaginatedData()
    }, [])

    const renderHeader = () => {
        const lastHeaderElement = headerGroups[headerGroups.length - 1]
        return (
            <thead className='react-table__header'>
                {<tr {...lastHeaderElement.getHeaderGroupProps()}>
                    {lastHeaderElement.headers.map((column) => (
                        // Add the sorting props to control sorting. For this example
                        // we can add them into the header props
                        <th {...column.getHeaderProps([{
                            className: column.id
                        },
                        column.getSortByToggleProps()
                        ])}>
                            {column.render("Header")}
                            <span>
                                {column.isSorted ? column.isSortedDesc ? " 🔽" : " 🔼" : ""}
                            </span>
                            {column.canFilter ? <div>{column.render("Filter")}</div> : null}
                        </th>
                    ))}
                </tr>

                }
            </thead>
        )
    }

    const renderBody = (onRowClick?: (value: any) => void) => {
        return (
            <tbody {...getTableBodyProps()} className="react-table__body">
                {page.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr
                            onClick={() => onRowClick?.(row)}
                            {...row.getRowProps([{
                                className: `react-table__row react-table__row${row.id}`
                            }])}>
                            {row.cells.map((cell) => {
                                return (
                                    <td {...cell.getCellProps([
                                        { className: cell.column.id }
                                    ])}>{cell.render("Cell")}</td>
                                );
                            })}
                        </tr>
                    );
                })}
                <tr>
                    {loading ? (
                        // Use our custom loading state to show a loading indicator
                        <td colSpan={100}>Loading...</td>
                    ) : (
                        <td colSpan={100}>
                            Showing {(pageIndex * pageSize + 1) + "-" + ((pageIndex + 1) * pageSize)} of ~{rowData.length}{" "}
                            results
                        </td>
                    )}
                </tr>
            </tbody>
        )
    }
    const renderFooter = () => {
        return (
            <div className="react-table__pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {"<<"}
                </button>{" "}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {"<"}
                </button>{" "}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {">"}
                </button>{" "}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {">>"}
                </button>{" "}
                <span>
                    Page{" "}
                    <strong>
                        {(pageIndex + 1)} of {pageOptions.length}
                    </strong>{" "}
                </span>
                <span>
                    | Go to page:{" "}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            gotoPage(page);
                        }}
                        style={{ width: "100px" }}
                    />
                </span>{" "}
                <select
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                    }}
                >
                    {[12, 24, 36, 1000].map((pageSizeOption) => (
                        <option key={pageSizeOption} value={pageSizeOption}>
                            Show {pageSizeOption}
                        </option>
                    ))}
                </select>
            </div>
        )
    }


    return {
        renderBody, renderFooter, renderHeader, getTableProps
    }
}
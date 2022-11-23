import React from 'react';
import data from "./data.json"
import { GROUPED_COLUMNS } from "./columns"

import { useTableComponents } from './useTableComponents';

interface ITableComponent {
    sortable: boolean;
    onRowClick?: (value: any) => void
}

export const TableComponent: React.FC<ITableComponent> = (props) => {
    const { sortable, onRowClick = (value: any) => console.log(value) } = props || {}
    const { renderBody,
        renderFooter,
        renderHeader,
        getTableProps
    } = useTableComponents(GROUPED_COLUMNS, data, sortable)

    return (
        <>
            <table {...getTableProps()}>
                {renderHeader()}
                {renderBody(onRowClick)}
            </table>
            {renderFooter()}
        </>
    )
}
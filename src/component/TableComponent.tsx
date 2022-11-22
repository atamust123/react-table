import React from 'react';

import { useTableComponents } from './useTableComponents';

interface ITableComponent {
    columns: any;
    rowData: any[];
    sortable: boolean;
}

export const TableComponent: React.FC<ITableComponent> = (props) => {
    const { columns, rowData, sortable } = props || {}
    const { renderBody,
        renderFooter,
        renderHeader,
        getTableProps
    } = useTableComponents(columns, rowData, sortable)

    return (
        <>
            <table {...getTableProps()}>
                {renderHeader()}
                {renderBody()}
            </table>
            {renderFooter()}
        </>
    )
}
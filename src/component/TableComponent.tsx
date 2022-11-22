import React from 'react';

import { useTableComponents } from './useTableComponents';

interface ITableComponent {
    columns: any;
    rowData: any[];
    sortable: boolean;
    pageCount: number;
}

export const TableComponent: React.FC<ITableComponent> = (props) => {
    const { columns, rowData, pageCount: controlledPageCount, sortable } = props || {}
    const { renderBody,
        renderFooter,
        renderHeader,
        getTableProps
    } = useTableComponents(columns, rowData, sortable, controlledPageCount)

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
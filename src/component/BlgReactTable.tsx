import React from "react"
import { TableComponent } from "./TableComponent"
import data from "./data.json"
import { GROUPED_COLUMNS } from "./columns"
export const BlgReactTable = () => {
    return (
        <TableComponent
            columns={GROUPED_COLUMNS}
            rowData={data}
            pageCount={10000}
            sortable={true}
            key={"atakan"}
        />
    )
}
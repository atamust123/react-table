import { format } from 'date-fns';
import { Column } from 'react-table';

const ColumnFilter = ({ column }: { column: { filterValue: any, setFilter: any } }) => {
  const { filterValue, setFilter } = column || {}
  console.log(column)
  return (
    <div>
      <input
        value={filterValue ?? ""}
        onChange={e => setFilter(e.target.value)}
        placeholder="search"
      />
    </div>
  )
}


export const COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "id",
    sticky: "left",
  },
  {
    Header: "First Name",
    Footer: "First Name",
    accessor: "first_name",
    sticky: "left",
    Filter: ColumnFilter,
  },
  {
    Header: "Last Name",
    Footer: "Last Name",
    accessor: "last_name",
    sticky: "left"
  },
  {
    Header: "Date of Birth",
    Footer: "Date of Birth",
    accessor: "date_of_birth",
    Cell: ({ value }: { value: string }) => {
      return format(new Date(value), "dd/MM/yyyy");
    }
  },
  {
    Header: "Country",
    Footer: "Country",
    accessor: "country"
  },
  {
    Header: "Phone",
    Footer: "Phone",
    accessor: "phone"
  },
  {
    Header: "Email",
    Footer: "Email",
    accessor: "email"
  },
  {
    Header: "Age",
    Footer: "Age",
    accessor: "age"
  }
];


export const GROUPED_COLUMNS: Column<any>[] = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "id",
    id: "id",
    disableFilters: true,
  },
  {
    Header: "Name",
    Footer: "Name",
    accessor: "name",
    columns: [
      {
        Header: "First Name",
        Footer: "First Name",
        accessor: "first_name",
        Filter: ColumnFilter,
        id: "first-name",
      },
      {
        Header: "Last Name",
        Footer: "Last Name",
        accessor: "last_name",
        disableFilters: true,
        id: "last-name",
      }
    ]
  },
  {
    Header: "Info",
    Footer: "Info",
    id: "info",
    disableFilters: true,
    columns: [
      {
        Header: "Date of Birth",
        Footer: "Date of Birth",
        accessor: "date_of_birth",
        disableFilters: true,
        Cell: (value) => {
          return <p style={{ padding: 0, margin: 0 }}>
            {format(new Date(value.value), "dd/MM/yyyy")}
          </p>;
        }
      },
      {
        Header: "Country",
        Footer: "Country",
        accessor: "country",
        disableFilters: true,
        Cell: ({ value }: { value: string }) => {
          return <div
            style={{ background: "red", width: "10rem", cursor: "pointer" }}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              console.log(value)
            }}
          >
            {value}
          </div>
        }
      },
      {
        Header: "Phone",
        Footer: "Phone",
        disableFilters: true,
        accessor: "phone"
      }
    ]
  }
];


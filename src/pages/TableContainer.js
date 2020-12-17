import React from "react"
import { useTable } from "react-table"

const TableContainer = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  return (
      // If you're curious what props we get as a result of calling our getter functions (getTableProps(), getRowProps())
        // Feel free to use console.log()  This will help you better understand how react table works underhood.
    <div className="row col-xs-12">
        <table {...getTableProps()} className="table table--hoverable theme-royal-blue">
        <thead>
            {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
            </tr>
            ))}
        </thead>

        <tbody {...getTableBodyProps()}>
            {rows.map(row => {
            prepareRow(row)
            return (
                <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                })}
                </tr>
            )
            })}
        </tbody>
        </table>
    </div>
  )
}

export default TableContainer
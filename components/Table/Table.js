import MuiTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useTable } from "react-table";

import { useStyles } from "./styles";

const isColumnVisible = (column) =>
  column.show || !Object.prototype.hasOwnProperty.call(column, "show");

export const Table = (props) => {
  const classes = useStyles(props);
  const { columns, data, onRowClick } = props;
  const { getTableProps, headers, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <MuiTable {...getTableProps()}>
      <TableHead>
        <TableRow>
          {headers.map((column) => {
            const headerProps = column.getHeaderProps();
            const style = column.style || {};

            return (
              isColumnVisible(column) && (
                <TableCell key={headerProps.key} {...headerProps} style={style}>
                  {column.render("Header")}
                </TableCell>
              )
            );
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => {
          prepareRow(row);
          const rowProps = row.getRowProps();

          return (
            <TableRow
              hover={Boolean(onRowClick)}
              key={rowProps.key}
              className={classes.tr}
              onClick={() => onRowClick(row.original)}
              {...rowProps}
            >
              {row.cells.map((cell) => {
                const cellProps = cell.getCellProps();
                const style = cell.column.style || {};

                return (
                  isColumnVisible(cell.column) && (
                    <TableCell key={cellProps.key} {...cellProps} style={style}>
                      {cell.render("Cell")}
                    </TableCell>
                  )
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </MuiTable>
  );
};

import format from "date-fns/fp/format";
import numeral from "numeral";

import { DeleteCell } from "../Cells/DeleteCell";

export const getColumns = ({ onDeleteClick }) => [
  { Header: "Meal", accessor: "name" },
  { Header: "Owner", accessor: "owner.email" },
  { Header: "Calories", accessor: (row) => numeral(row.calories).format("0,0") },
  {
    Header: "Price ($)",
    accessor: (row) => numeral(row.price).format("($ 0.00a)"),
  },
  {
    Header: "Date",
    id: "date",
    style: { width: "120px" },
    accessor: (row) => format("MMM d, yyyy")(new Date(row.timestamp)),
  },
  {
    Header: "Time",
    id: "time",
    style: { width: "120px" },
    accessor: (row) => {
      const timestamp = new Date(row.timestamp);
      return format("hh:mm a")(timestamp);
    },
  },
  {
    Header: "",
    id: "delete",
    Cell: DeleteCell,
    style: { width: "50px" },
    onClick: onDeleteClick,
  },
];

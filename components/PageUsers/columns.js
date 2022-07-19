import numeral from "numeral";

import { DeleteCell } from "../Cells/DeleteCell";

export const getColumns = ({ onDeleteClick }) => [
  { Header: "Name", accessor: "name" },
  { Header: "Email", accessor: "email" },
  {
    Header: "Calories / day",
    accessor: (row) => numeral(row.caloriesPerDay).format("0,0"),
  },
  { Header: "Role", accessor: "role", style: { textTransform: "capitalize" } },
  {
    Header: "",
    id: "delete",
    Cell: DeleteCell,
    style: { width: 50 },
    onClick: onDeleteClick,
  },
];

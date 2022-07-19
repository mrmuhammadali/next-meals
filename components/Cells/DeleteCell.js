import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

const isCellVisible = ({ row, column }) => {
  if (typeof column.show === "function") {
    return column.show({ row });
  }
  return true;
};

export const DeleteCell = (props) => {
  const {
    row: { original },
    column,
  } = props;

  return (
    isCellVisible(props) && (
      <IconButton
        aria-label="delete"
        size="small"
        onClick={(event) => {
          event.stopPropagation();
          column.onClick(original);
        }}
      >
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    )
  );
};

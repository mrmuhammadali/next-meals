import axios from "axios";
import { useCallback, useState } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Router from "next/router";

import { useMe, useUsers } from "@/apiHooks/useUsers";
import { getColumns } from "./columns";
import { Slate } from "../Slate";
import { Table } from "../Table";
import { UserItemForm } from "../UserItemForm";
import { useFeedback } from "../Feedback";
import { useStyles } from "./styles";

export const PageUsers = () => {
  const classes = useStyles();
  const { showConfirmation, handleClose } = useFeedback();
  const { data, error, mutate } = useUsers();
  const { data: me } = useMe({ fallbackData: {} });
  const [selectedUser, setUser] = useState(null);

  const onDeleteClick = useCallback(
    (user) => {
      showConfirmation({
        message: `Are you sure you want to delete ${
          me._id === user._id ? "your account" : user.name
        }?`,
        handleConfirm: () =>
          axios
            .delete(`/api/users/${user._id}`)
            .then(() => {
              // Logout if current user is deleted
              if (me._id === user._id) {
                return axios.delete("/api/logout").then(() => Router.reload());
              }
              // Remove user from swr cache
              return mutate(
                data.filter((u) => u._id !== user._id),
                false,
              );
            })
            .then(handleClose)
            .catch(() => null),
      });
    },
    [data, me, mutate, handleClose, showConfirmation],
  );

  const onAddClick = () => {
    setUser({
      name: "",
      email: "",
      password: "",
      caloriesPerDay: 2100,
      role: "regular",
    });
  };

  return (
    <main className={classes.root}>
      <Button
        className={classes.button}
        variant="outlined"
        color="primary"
        size="small"
        onClick={onAddClick}
      >
        Add User
      </Button>
      <Paper
        className={[classes.users, data?.length ? "" : classes.flex].join(" ")}
      >
        <Slate data={data} error={error}>
          <Table
            columns={getColumns({ onDeleteClick })}
            data={data || []}
            onRowClick={setUser}
          />
        </Slate>
      </Paper>
      <UserItemForm user={selectedUser} onClose={() => setUser(null)} />
    </main>
  );
};

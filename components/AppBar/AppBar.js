import axios from "axios";
import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Divider from "@material-ui/core/Divider";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import MuiAppBar from "@material-ui/core/AppBar";
import Popper from "@material-ui/core/Popper";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useRef, useState } from "react";
import Router from "next/router";

import { useMe } from "@/apiHooks/useUsers";
import { useStyles } from "./styles";

export const AppBar = () => {
  const { data: me } = useMe();
  const [openMenu, setOpenMenu] = useState(false);
  const anchorRef = useRef(null);
  const classes = useStyles(openMenu);

  const handleToggle = () => {
    setOpenMenu((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpenMenu(false);
  };

  const handleLogout = () => {
    setOpenMenu(false);
    axios.delete("/api/logout").then(() => Router.reload());
  };

  if (!me) {
    return null;
  }

  return (
    <MuiAppBar className={classes.root} position="sticky">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.title}>
          Next Meals
        </Typography>
        <Button color="inherit" onClick={() => Router.push("/")}>
          Home
        </Button>
        {me.role === "admin" && (
          <>
            <Button color="inherit" onClick={() => Router.push("/users")}>
              Users
            </Button>
            <Button color="inherit" onClick={() => Router.push("/report")}>
              Report
            </Button>
          </>
        )}
        <ButtonBase
          className={classes.user}
          ref={anchorRef}
          onClick={handleToggle}
          disableRipple
        >
          <Typography className={classes.username}>{me.name}</Typography>
          {openMenu ? (
            <KeyboardArrowUp fontSize="small" />
          ) : (
            <KeyboardArrowDown fontSize="small" />
          )}
        </ButtonBase>
        <Popper
          className={classes.popper}
          open={openMenu}
          anchorEl={anchorRef.current}
          disablePortal
          placement="bottom-end"
        >
          <ClickAwayListener onClickAway={handleClose}>
            <div>
              <Divider className={classes.divider} />
              <Button
                fullWidth
                className={classes.popButton}
                onClick={() => {
                  setOpenMenu(false);
                  Router.push("/settings");
                }}
              >
                Account Settings
              </Button>
              <Button
                fullWidth
                className={classes.popButton}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </ClickAwayListener>
        </Popper>
      </Toolbar>
    </MuiAppBar>
  );
};

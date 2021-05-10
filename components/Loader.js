import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  dialog: {
    overflow: "hidden",
    height: "100%",
    width: "100%",
    overflowX: "none",
    overflowY: "none",
  },
  paper: {
    backgroundColor: "transparent",
    boxShadow: "none",
    overflow: "hidden",
  },
}));

export default function Loader() {
  const classes = useStyles();
  return (
    <div className={classes.dialog}>
      <Dialog
        className={classes.dialog}
        open={true}
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        PaperProps={{
          classes: {
            root: classes.paper,
          },
        }}
      >
        <CircularProgress size={100} />
      </Dialog>
    </div>
  );
}

import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import AppsOutlinedIcon from "@material-ui/icons/AppsOutlined";

import { makeStyles } from "@material-ui/core/styles";
import AddUrlModel from "./AddUpdateUrlModel";
import CustomizedSnackbars from "./SnackBar";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 40,
  },

  "& > span": {
    margin: theme.spacing(1),
  },
  height: {
    height: 200,
  },
  listItemText_p: {
    fontSize: 30,
    fontWeight: "bold",
  },
  listItemText_s: {
    fontSize: 15,
  },
}));

export default function Menu() {
  const [openModel, setOpenModel] = React.useState(false);
  const classes = useStyles();
  const [submitSuccess, setSubmitSuccess] = React.useState("");

  const handleAddUrlClick = (event) => {
    event.preventDefault();
    setOpenModel(true);
  };
  const handleCloseModel = () => {
    setOpenModel(false);
  };

  const apiSuccess = (type) => {
    setSubmitSuccess(type);
  };

  return (
    <List className={classes.root}>
      <ListItem
        className={classes.height}
        component="a"
        button
        onClick={(event) => handleAddUrlClick(event)}
      >
        <ListItemAvatar>
          <Avatar>
            <LibraryAddIcon color="action">add_circle</LibraryAddIcon>
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          classes={{
            primary: classes.listItemText_p,
            secondary: classes.listItemText_s,
          }}
          primary="Add Url"
          secondary="click here to add new URL"
        />
      </ListItem>
      {openModel && (
        <AddUrlModel
          open={openModel}
          handleClose={handleCloseModel}
          apiSuccess={apiSuccess}
        ></AddUrlModel>
      )}
      <Divider variant="inset" component="li" />
      <ListItem
        className={classes.height}
        button
        component="a"
        href="dashboard"
      >
        <ListItemAvatar>
          <Avatar>
            <AppsOutlinedIcon color="action"></AppsOutlinedIcon>
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          classes={{
            primary: classes.listItemText_p,
            secondary: classes.listItemText_s,
          }}
          primary="DashBoard"
          secondary="click here to view all URLs status"
        />
      </ListItem>
      {submitSuccess != "" && (
        <CustomizedSnackbars
          submitSuccess={submitSuccess}
          apiSuccess={apiSuccess}
        ></CustomizedSnackbars>
      )}
    </List>
  );
}

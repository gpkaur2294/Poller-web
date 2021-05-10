import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SettingsIcon from "@material-ui/icons/Settings";
import AddUrlModel from "./AddUpdateUrlModel";
import DeleteUrlModel from "./DeleteUrlModel";
import { Button } from "@material-ui/core";
import CancelSharpIcon from "@material-ui/icons/CancelSharp";
import CheckCircleSharpIcon from "@material-ui/icons/CheckCircleSharp";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CustomizedSnackbars from "./SnackBar";
import RemoveCircleSharpIcon from "@material-ui/icons/RemoveCircleSharp";
const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  tableRow_ok: {
    color: "green",
    fontWeight: "bold",
  },
  tableRow_fail: {
    color: "red",
    fontWeight: "bold",
  },
  tableRow_progress: {
    color: "orange",
    fontWeight: "bold",
  },
  head: {
    backgroundColor: "black",
  },
  tableCell: {
    color: "white",
  },
  table_button: {
    paddingBottom: 0,
    paddingTop: 0,
  },
  button: {
    marginRight: 10,
    marginLeft: 20,
    marginBottom: 5,
  },
});

function Row({ urlRowInfo, handleDelete, handleEdit, apiSuccess }) {
  const [openRowPanel, setOpenRowPanel] = React.useState(false);
  const [openEditModel, setOpenEditModel] = React.useState(false);
  const [openDeleteModel, setOpenDeleteModel] = React.useState(false);

  const classes = useRowStyles();
  const handleCloseEditModel = () => {
    setOpenEditModel(false);
    setOpenRowPanel(false);
  };
  const handleCloseDeleteModel = () => {
    setOpenDeleteModel(false);
    setOpenRowPanel(false);
    handleDelete(urlRowInfo);
  };
  const handleDeleteClick = () => {
    delteUrlsApi();
    setOpenDeleteModel(true);
  };

  const handleAPISuccess = (type, response) => {
    apiSuccess(type);
    if (response && !response.error) {
      handleEdit(response);
    }
  };

  async function delteUrlsApi() {
    try {
      const res = await fetch(
        "http://localhost:8080/poller/url/" + urlRowInfo.id + "/delete",
        {
          method: "DELETE",
        }
      );
      res.json().then((response) => {
        setOpenDeleteModel(true);
      });
    } catch (error) {
      setOpenDeleteModel(false);
    }
  }

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell align="center">{urlRowInfo.name}</TableCell>
        <TableCell align="center">{urlRowInfo.url}</TableCell>
        <TableCell align="center">{urlRowInfo.pollingInterval}</TableCell>
        <TableCell align="center">{urlRowInfo.addedAt}</TableCell>
        <TableCell align="center">{urlRowInfo.updatedAt}</TableCell>
        <TableCell align="center">
          {urlRowInfo.status == "OK" ? (
            <CheckCircleSharpIcon
              size="small"
              className={classes.tableRow_ok}
            />
          ) : urlRowInfo.status == "RUNNING" ? (
            <RemoveCircleSharpIcon
              size="small"
              className={classes.tableRow_progress}
            />
          ) : (
            <CancelSharpIcon size="small" className={classes.tableRow_fail} />
          )}{" "}
        </TableCell>

        <TableCell align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenRowPanel(!openRowPanel)}
          >
            <SettingsIcon color="primary" />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className={classes.table_button} colSpan={7} align="right">
          <Collapse in={openRowPanel} timeout="auto" unmountOnExit>
            <Box>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleDeleteClick}
                size="small"
                startIcon={<DeleteIcon />}
                className={classes.button}
              >
                Delete
              </Button>

              <Button
                variant="contained"
                size="small"
                startIcon={<EditIcon />}
                onClick={() => setOpenEditModel(true)}
                className={classes.button}
              >
                Edit
              </Button>
              {openEditModel && (
                <AddUrlModel
                  open={openEditModel}
                  handleClose={handleCloseEditModel}
                  urlDetail={urlRowInfo}
                  apiSuccess={handleAPISuccess}
                ></AddUrlModel>
              )}
              {openDeleteModel && (
                <DeleteUrlModel
                  open={openDeleteModel}
                  handleClose={handleCloseDeleteModel}
                  urlDetail={urlRowInfo}
                ></DeleteUrlModel>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({ urls }) {
  const [urlsDetails, setUrlsDetails] = React.useState(urls);
  const classes = useRowStyles();
  const [submitSuccess, setSubmitSuccess] = React.useState("");

  const handleEdit = (urlRowInfo) => {
    var data = [...urlsDetails];
    var index = data.findIndex((obj) => obj.id === urlRowInfo.id);
    data[index].name = urlRowInfo.name;
    data[index].url = urlRowInfo.url;
    data[index].pollingInterval = urlRowInfo.pollingInterval;
    data[index].status = urlRowInfo.status;
    data[index].updatedAt = urlRowInfo.updatedAt;
    setUrlsDetails(data);
  };

  const apiSuccess = (type) => {
    setSubmitSuccess(type);
  };

  const handleDelete = (urlRowInfo) => {
    let updatedUrls = urlsDetails.filter(function (obj) {
      return obj.id !== urlRowInfo.id;
    });
    setUrlsDetails(updatedUrls);
  };
  return (
    <Box m={5}>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell className={classes.tableCell} align="center">
                Name
              </TableCell>
              <TableCell className={classes.tableCell} align="center">
                URL
              </TableCell>
              <TableCell className={classes.tableCell} align="center">
                Polling Interval
              </TableCell>
              <TableCell className={classes.tableCell} align="center">
                Added&nbsp;On
              </TableCell>
              <TableCell className={classes.tableCell} align="center">
                Updated&nbsp;On
              </TableCell>
              <TableCell className={classes.tableCell} align="center">
                Status
              </TableCell>
              <TableCell className={classes.tableCell} align="center">
                Edit/Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {urlsDetails.map((url) => (
              <Row
                key={url.id}
                urlRowInfo={url}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                apiSuccess={apiSuccess}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {submitSuccess != "" && (
        <CustomizedSnackbars
          submitSuccess={submitSuccess}
          apiSuccess={apiSuccess}
        ></CustomizedSnackbars>
      )}
    </Box>
  );
}

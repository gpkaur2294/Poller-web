import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import Loader from "./Loader";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const intervals = [5, 10, 15, 20, 25];

const useStyles = makeStyles((theme) => ({
  urlName: {
    width: "21%",
    marginLeft: theme.spacing(2),
    marginRight: 4,
  },
  url: {
    width: "55%",
    marginRight: 4,
  },
  dropdown: {
    width: "20%",
  },
  dialogCustomizedWidth: {
    "max-width": "70%",
    marginRight: theme.spacing(2),
  },
  button: {
    marginRight: 25,
    marginLeft: 20,
    marginBottom: 5,
    marginTop: 20,
  },
}));

export default function AddUrlModel({
  open,
  handleClose,
  apiSuccess,
  urlDetail,
}) {
  const classes = useStyles();
  const [interval, setInterval] = React.useState(
    urlDetail ? urlDetail.pollingInterval : "5"
  );
  const [name, setName] = React.useState(urlDetail ? urlDetail.name : "");
  const [url, setUrl] = React.useState(urlDetail ? urlDetail.url : "");
  const [isValidName, setValidName] = React.useState(true);
  const [isValidURL, setValidUrl] = React.useState(true);
  const [isError, setError] = React.useState(false);
  const [isInvoke, setApiInvoke] = React.useState(false);

  function handleValidName() {
    if (name === undefined || name === "" || name === null) {
      setValidName(false);
      return false;
    } else {
      setValidName(true);
      return true;
    }
  }

  function handleValidUrl() {
    try {
      if (url == undefined || url == "" || url == null) {
        setValidUrl(false);
        return false;
      } else {
        let urlV = new URL(url);
        let validUrl1 = urlV.protocol === "http:" || urlV.protocol === "https:";
        setValidUrl(validUrl1);
        return validUrl1;
      }
    } catch (_) {
      setValidUrl(false);
      return false;
    }
  }

  async function addUrlsData() {
    let apiURL = "http://localhost:8080/poller/url/add";
    const request = {
      url: url,
      name: name,
      pollingInterval: Number(interval),
    };
    if (urlDetail) {
      request.id = urlDetail.id;
      apiURL = "http://localhost:8080/poller/url/update";
    }
    try {
      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      };
      const res = await fetch(apiURL, config);
      res.json().then((response) => {
        if (response && !response.error) {
          updateSuccess(response);
          handleClose(response);
        } else {
          setError(true);
        }

        setApiInvoke(false);
      });
    } catch (error) {
      setError(true);
      setApiInvoke(false);
    }
  }

  function updateSuccess(response) {
    if (urlDetail) {
      apiSuccess("updated", response);
    } else {
      apiSuccess("added", response);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let isValName = handleValidName();
    let isValUrl = handleValidUrl();
    if (isValName && isValUrl) {
      setApiInvoke(true);
      addUrlsData();
    }
  };
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        classes={{ paperFullWidth: classes.dialogCustomizedWidth }}
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Please enter URL details"}
        </DialogTitle>
        {isError && <Alert severity="error">Sorry Something went wrong</Alert>}
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              id="outlined-basic"
              label="Name"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              error={!isValidName}
              onBlur={handleValidName}
              helperText={isValidName ? "" : "Please enter valid name"}
              className={classes.urlName}
            />
            <TextField
              id="outlined-basic"
              label="Url"
              defaultValue={url}
              onChange={(e) => setUrl(e.target.value)}
              variant="outlined"
              error={!isValidURL}
              onBlur={handleValidUrl}
              helperText={isValidURL ? "" : "Please enter valid URL"}
              className={classes.url}
            />
            <TextField
              id="outlined-select-currency-native"
              value={interval}
              select
              label="Interval"
              variant="outlined"
              onChange={(e) => setInterval(e.target.value)}
              SelectProps={{
                native: true,
              }}
              className={classes.dropdown}
            >
              {intervals.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              color="primary"
              variant="outlined"
              className={classes.button}
            >
              Discard
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="outlined"
              className={classes.button}
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {isInvoke && <Loader></Loader>}
    </div>
  );
}

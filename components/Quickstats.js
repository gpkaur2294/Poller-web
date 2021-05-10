import { PieChart } from "react-minimal-pie-chart";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import React from "react";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  chartContainer: {
    marginTop: 50,
    marginLeft: "auto",
    marginRight: "auto",
    height: 200,
  },
  typography: {
    fontSize: 30,
    paddingBottom: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  pieChart: {
    fontSize: 6,
    fontWeight: "bold",
    alignContent: "center",
    marginLeft: "70px",
    marginRight: "50px",
    marginTop: "-60px",
    height: "10%",
    width: "80%",
  },
}));
export default function Stats() {
  const classes = useStyles();

  const [okCount, setOk] = React.useState(Number);
  const [failCount, setFail] = React.useState(Number);
  const [noUrls, setNoUrls] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const [hasResponse, setStatus] = React.useState(false);

  function getStats() {
    const stats = [];
    if (okCount > 0) {
      stats.push(buildStatValue(okCount, "Ok", "#008000"));
    }
    if (failCount > 0) {
      stats.push(buildStatValue(failCount, "Fail", "#FF0000"));
    }

    return stats;
  }

  function buildStatValue(count, status, colorValue) {
    return {
      title: status + "(" + count + ")",
      value: count,
      color: colorValue,
    };
  }

  async function fetchStats() {
    try {
      const res = await fetch("http://localhost:8080/poller/stats");
      res.json().then((response) => {
        if (
          !response.error &&
          (response.passedCount > 0 || response.failureCount > 0)
        ) {
          setStatus(true);
          setOk(response.passedCount);
          setFail(response.failureCount);
        } else {
          setNoUrls(true);
        }
      });
    } catch (error) {
      setHasError(true);
    }
  }

  React.useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className={classes.chartContainer}>
      {hasError && <Alert severity="error">Sorry Something went wrong</Alert>}
      {noUrls && (
        <Alert severity="info">
          No Urls for Quick Stats! Please add new URLs
        </Alert>
      )}
      {!noUrls && !hasError && hasResponse && (
        <div>
          <Typography className={classes.typography}>Quick Stats</Typography>

          <PieChart
            className={classes.pieChart}
            animation
            animationDuration={500}
            center={[50, 50]}
            data={getStats()}
            label={(data) => data.dataEntry.title}
            labelPosition={getStats().length > 1 ? 50 : 5}
            viewBoxSize={[100, 100]}
            radius={30}
          />
        </div>
      )}
    </div>
  );
}

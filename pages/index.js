import Header from "../components/Header";
import Stats from "../components/Quickstats";
import Menu from "../components/Menu";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));
export default function Home() {
  const classes = useStyles();
  return (
    <div className="maincontainer">
      <Header></Header>
      <Grid container className={classes.root}>
        <Grid item xs={6}>
          <Menu></Menu>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs={5}>
          <Stats></Stats>
        </Grid>
      </Grid>
    </div>
  );
}

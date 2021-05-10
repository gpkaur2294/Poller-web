import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
const useStyles = makeStyles((theme) => ({
  typography: {
    fontWeight: "bold",
  },
}));

export default function Header() {
  const classes = useStyles();
  return (
    <AppBar position="static" color="primary">
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          spacing={2}
          color="inherit"
          aria-label="menu"
          href="/"
        >
          <HomeIcon fontSize="large"></HomeIcon>
        </IconButton>
        <Typography className={classes.typography} variant="h4">
          Poller
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

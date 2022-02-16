import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Drawer, Grid } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { mainListItems, secondaryListItems } from "./listItems";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Insights from "./Insights";
import { useScreenSize } from "../helpers/screen";
import Wallet from "./Wallet";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    backgroundColor: theme.palette.background.main,
    color: "white",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    backgroundColor: theme.palette.background.main,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    backgroundColor: theme.palette.background.main,
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
    flexDirection: "column",
    backgroundColor: theme.palette.background.main,
    alignItems: "center",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    //overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

const styles = makeStyles((theme) => ({
  root: (props) => {
    const css = {
      minHeight: "100vh",
      flexDirection: "column",
      backgroundColor: theme.palette.background.main,
      alignItems: "center",
    };

    if (!props.electron) {
      css.justifyContent = "center";
    }

    return css;
  },
  content: (props) => {
    const css = {
      margin: "5% 0px",
      position: "absolute",
      backgroundColor: theme.palette.background.main,
      width: "100%",
    };

    // No size limitations on content if we're on electron app.
    if (props.electron) {
      return {
        ...css,
        width: "85%",
        height: "85%",
      };
    }

    // we're on tablet or mobile phone
    if (props.screen === "small") {
      return {
        ...css,
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      };
    }

    // we're on a big screen
    return {
      ...css,
      maxWidth: 1000,
      minWidth: 700,
      padding: theme.spacing(3),
      border: "dotted 2px gray",
    };
  },
}));

const LoginContainer = (props) => {
  const screen = useScreenSize();
  const classes = styles({ ...props, screen });

  return (
    <Grid container className={classes.root}>
      <Grid className={classes.content}>{props.children}</Grid>
    </Grid>
  );
};

const AppContainer = (props) => {
  const screen = useScreenSize();
  const classes = styles({ ...props, screen });
  const otherclasses = useStyles();

  return (
    <main className={otherclasses.content}>
      <div className={classes.appBarSpacer} />
      {props.children}
    </main>
  );
};
const Layout = ({ children, login }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div id="Background" className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        id="AppBar"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Switch>
            <Route exact path={["/insights"]}>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                Hindsight
              </Typography>
            </Route>
          </Switch>
        </Toolbar>
      </AppBar>
      <Drawer
        backgroundColor="black"
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon} id="Drawer">
          <IconButton id="Icon" onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <div className={classes.drawer} id="SideDrawer">
          <Divider />
          <List id="Drawer">{mainListItems}</List>
          {/*<Divider />
          <List id="Drawer">{secondaryListItems}</List>*/}
        </div>
      </Drawer>
      <Switch>
        <AppContainer electron={process.env.REACT_APP_DESKTOP_APP === "true"}>
          <Route path="/insights" component={Insights} />
          <Route path="/wallet" component={Wallet} />
        </AppContainer>
      </Switch>
    </div>
  );
};

export default Layout;

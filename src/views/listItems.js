import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountBalanceWallet from "@material-ui/icons/AccountBalanceWallet";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import HomeIcon from "@material-ui/icons/Home";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { Link } from "react-router-dom";
import "../css/LandingPage.css";

export const mainListItems = (
  <div>
    <Link to="/insights" className="NavLink">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon id="Icon" />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>
    <Link to="/wallet" className="NavLink">
      <ListItem button>
        <ListItemIcon>
          <AccountBalanceWallet id="Icon" />
        </ListItemIcon>
        <ListItemText primary="Wallet" />
      </ListItem>
    </Link>
    <Link to="/financial-institution" className="NavLink">
      <ListItem button>
        <ListItemIcon>
          <AccountBalanceIcon id="Icon" />
        </ListItemIcon>
        <ListItemText primary="Financial Institution" />
      </ListItem>
    </Link>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader id="Icon" inset>
      Tools
    </ListSubheader>
    {/* <Link to='/mortgage-calculator' className='NavLink'>
      <ListItem button>
        <ListItemIcon>
          <HomeIcon id="Icon" />
        </ListItemIcon>
        <ListItemText primary="Mortgage Calculator" />
      </ListItem>
    </Link> */}
    <Link to="/cashflow-calculator" className="NavLink">
      <ListItem button>
        <ListItemIcon>
          <AttachMoneyIcon id="Icon" />
        </ListItemIcon>
        <ListItemText primary="Cashflow Calculator" />
      </ListItem>
    </Link>
    <Link to="/stocks" className="NavLink">
      <ListItem button>
        <ListItemIcon>
          <ShowChartIcon id="Icon" />
        </ListItemIcon>
        <ListItemText primary="Stocks" />
      </ListItem>
    </Link>
  </div>
);

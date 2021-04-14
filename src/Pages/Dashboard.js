import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {    HomeWorkOutlined, Payment,  PersonPin, PowerSettingsNew, Storefront, Work } from '@material-ui/icons';
import Home from '../Home';
import EmployeeView from '../Fragment/EmployeeView';
import PayView from '../Fragment/PayView';
import Project from '../Fragment/Project'
// import Category from '../Fragment/Category'
import logo from "../image/omni.svg";
import Stockview from '../Fragment/Stockview';





const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));



const Dashboard = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

 
 
  const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
};

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

 const [fragment, setfragment] = useState("HOME")

  const loadFragment = () =>{

    switch (fragment) {
      case "HOME":
      return  <Home />
      case "EmployeeView":
     return  <EmployeeView />
     case "Stockview":
      return  <Stockview />
      case "PayView":
        return  <PayView />
        case "Project":
          return  <Project />
          // case "Category":
          //   return  <Category />
    
      default:
        break;
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <img src={logo} height="40px" alt="logo" style={{marginRight: "10px"}}/>
          <Typography variant="h5" color="textSecondary"  >
            MANAGEMENT
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        // onClose={handleClose}

      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
              <ListItem button onClick={e => setfragment("HOME")} >
                <ListItemIcon>
                    <HomeWorkOutlined />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            
          </List>
          <Divider />
          {/* <List>
              <ListItem button onClick={e=>setfragment("Category")}>
                <ListItemIcon>
                    <CategoryOutlined />
                </ListItemIcon>
                <ListItemText primary="Stock Categories" />
              </ListItem>
          </List> */}
          <List>
              <ListItem button onClick={e=>setfragment("Stockview")}>
                <ListItemIcon>
                    <Storefront />
                </ListItemIcon>
                <ListItemText primary="Stock " />
              </ListItem>
            
          </List>         
           <List>
              <ListItem button onClick={e=>setfragment("EmployeeView")} >
                <ListItemIcon>
                    <PersonPin />
                </ListItemIcon>
                <ListItemText primary="Employee " />
              </ListItem>
            
          </List>                 
          <List>
              <ListItem button onClick={e=>setfragment("Project")}>
                <ListItemIcon>
                    <Work />
                </ListItemIcon>
                <ListItemText primary="Projects" />
              </ListItem>
            
          </List>     
          <List>
              <ListItem button onClick={e=>setfragment("PayView")} >
                <ListItemIcon>
                    <Payment />
                </ListItemIcon>
                <ListItemText primary="Waybills" />
              </ListItem>
            
          </List>  
          <Divider />     
            <List>
            
              <ListItem button onClick={logout}>
                <ListItemIcon>
                    <PowerSettingsNew />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            
          </List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />
      {loadFragment()}
      </main>
    </div>
  );
}

export default Dashboard;
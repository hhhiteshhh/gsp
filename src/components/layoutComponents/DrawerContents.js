import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ClientIcon from "@material-ui/icons/CameraAltOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import SupervisorAccount from "@material-ui/icons/SupervisorAccountOutlined";
import { GlobalHotKeys } from "react-hotkeys";
import withUser from "../../hoc/withUser";
import StaticVersionDisplay from "./StaticVersionDisplay";
import ReceiptIcon from "@material-ui/icons/Payment";
import DashboardCustomizeIcon from "@material-ui/icons/DashboardOutlined";
import Info from "@material-ui/icons/ChatBubbleOutlineOutlined";
import Bar from "@material-ui/icons/BarChart";
import Location from "@material-ui/icons/LocationOnOutlined";
import Photo from "@material-ui/icons/PhotoOutlined";
import CategoryOutlined from "@material-ui/icons/CategoryOutlined";
import Inventory from "@material-ui/icons/LoyaltyOutlined";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    position: "absolute",
    bottom: 0,
    right: 5,
    width: 240,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const keyMap = {
  DASHBOARD: { name: "Expand square area", sequence: "1" },
  BOOKINGS: { name: "Expand square area", sequence: "2" },
  CLIENTS: { name: "Expand square area", sequence: "3" },
  REQUESTS: { name: "Expand square area", sequence: "4" },
  STORIES: { name: "Expand square area", sequence: "5" },
  CATEGORIES: { name: "Expand square area", sequence: "6" },
  DESTINATIONS: { name: "Expand square area", sequence: "7" },
  PACKAGES: { name: "Expand square area", sequence: "8" },
  PHOTOGRAPHERS: { name: "Expand square area", sequence: "9" },
  PAYMENTS: { name: "Expand square area", sequence: "10" },
  FEEDBACKRESPONSE: { name: "Expand square area", sequence: "11" },
  USERANDPERMISSION: { name: "Expand square area", sequence: "12" },
};

function DrawerContent(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(props.open);
  const [innerMenu, setInnerMenu] = React.useState(false);
  const [innerMenu2, setInnerMenu2] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const handlePageTitle = (title, index) => setSelectedIndex(index);
  const handleDrawerOpen = () => {
    setOpen(true);
    if (props.setOpen) props.setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
    if (props.setOpen) props.setOpen(false);
  };
  const handleShortcut = {
    DASHBOARD: (e) => props.history.push("/dashboard"),
    USERANDPERMISSION: (e) => props.history.push("/userandpermmision"),
    BOOKINGS: (e) => props.history.push("/dashboard"),
    CLIENTS: (e) => props.history.push("/dashboard"),
    REQUESTS: (e) => props.history.push("/dashboard"),
    STORIES: (e) => props.history.push("/dashboard"),
    CATEGORIES: (e) => props.history.push("/dashboard"),
    DESTINATIONS: (e) => props.history.push("/dashboard"),
    PACKAGES: (e) => props.history.push("/dashboard"),
    PHOTOGRAPHERS: (e) => props.history.push("/dashboard"),
    PAYMENTS: (e) => props.history.push("/dashboard"),
    FEEDBACKRESPONSE: (e) => props.history.push("/dashboard"),
  };
  const selectedStyle = (path) => ({
    // color: props.match.path === path ? "blue" : "",
    color:
      ((path === "/destinations" || path === "/stories") &&
        props.match.path === "/stories") ||
      ((path === "/categories" || path === "/packages") &&
        props.match.path === "/packages") ||
      props.match.path === path
        ? "blue"
        : "",
  });
  const listItems = [
    {
      path: "/dashboard",
      title: "Dashboard",
      access: "dashboard",
      icon: (path) => <DashboardCustomizeIcon style={selectedStyle(path)} />,
    },
    {
      path: "/bookings",
      title: "Manage Bookings",
      access: "bookings",
      icon: (path) => <ClientIcon style={selectedStyle(path)} />,
    },
    {
      path: "/destinations",
      title: "Manage Destinations",
      access: "destinationsAndStories",
      children: false,
      icon: (path) => <Location style={selectedStyle(path)} />,
      childRoutes: [
        {
          path: "/destinations",
          title: "Destinations",
          icon: (path) => <Location style={selectedStyle(path)} />,
        },
        {
          path: "/stories",
          title: "Stories",
          icon: (path) => <Photo style={selectedStyle(path)} />,
        },
      ],
    },
    {
      path: "/photographers",
      title: "Manage Photographers",
      access: "photographers",
      icon: (path) => <SupervisorAccount style={selectedStyle(path)} />,
    },
    {
      path: "/clients",
      title: "Clients",
      access: "clients",
      icon: (path) => <SupervisorAccount style={selectedStyle(path)} />,
    },
    {
      path: "/categories",
      title: "Categories & Packages",
      access: "categoriesAndPackages",
      children: false,
      icon: (path) => <CategoryOutlined style={selectedStyle(path)} />,
      childRoutes: [
        {
          path: "/categories",
          title: "Categories",
          icon: (path) => <CategoryOutlined style={selectedStyle(path)} />,
        },
        {
          path: "/packages",
          title: "Packages",
          icon: (path) => <Inventory style={selectedStyle(path)} />,
        },
      ],
    },
    {
      path: "/chats",
      title: "Chats",
      access: "chats",
      icon: (path) => <Info style={selectedStyle(path)} />,
    },
    {
      path: "/payments",
      title: "Payments",
      access: "payments",
      icon: (path) => <ReceiptIcon style={selectedStyle(path)} />,
    },
    {
      path: "/userandpermmision",
      title: "Users & Permissions",
      access: "usersAndPermissions",
      icon: (path) => <SupervisorAccount style={selectedStyle(path)} />,
    },
  ];

  return (
    <div>
      <GlobalHotKeys keyMap={keyMap} handlers={handleShortcut} />
      <div className={classes.listMainDiv}>
        <List disablePadding className={classes.root}>
          {listItems.map((list, index) => {
            if (props?.user?.access?.[list.access]) {
              return (
                <div key={`ListItemContainer-${index}`}>
                  <ListItem
                    button
                    key={`ListItem-${index}`}
                    selected={selectedIndex === index}
                    onClick={
                      typeof list.childRoutes === "undefined"
                        ? (e) => {
                            e.preventDefault();
                            handlePageTitle(list.title, index);
                            props.history.push(list.path);
                          }
                        : (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (index === 2) setInnerMenu(!innerMenu);
                            if (index === 5) setInnerMenu2(!innerMenu2);
                          }
                    }
                    style={selectedStyle(list.path)}
                  >
                    <ListItemIcon style={{ minWidth: 35 }}>
                      <Tooltip title={list.title} placement="right-start">
                        {list.icon(list.path)}
                      </Tooltip>
                    </ListItemIcon>
                    <ListItemText primary={list.title} />
                    {typeof list?.childRoutes !== "undefined" ? (
                      index === 2 ? (
                        innerMenu ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )
                      ) : innerMenu2 ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )
                    ) : null}
                  </ListItem>
                  {typeof list?.childRoutes !== "undefined" && (
                    <Collapse
                      in={index === 2 ? innerMenu : innerMenu2}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {list?.childRoutes?.map((e, i) => (
                          <ListItem
                            button
                            key={`ListItem-${index}-${i}`}
                            className={classes.nested}
                            onClick={(evt) => {
                              evt.preventDefault();
                              // handlePageTitle(e.title, i);
                              props.history.push(e.path);
                            }}
                          >
                            <ListItemIcon>{e?.icon(e?.path)}</ListItemIcon>
                            <ListItemText primary={e.title} />
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </div>
              );
            } else return null;
          })}
        </List>
      </div>

      <div className={classes.toolbar}>
        {props.open && <StaticVersionDisplay />}
        <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
          <Tooltip
            title={!props.open ? "Click to Expand" : "Click to Collapse"}
            placement="right-start"
          >
            {!props.open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </Tooltip>
        </IconButton>
      </div>
    </div>
  );
}

export default withRouter(withUser(DrawerContent));

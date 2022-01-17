import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Button,
  Snackbar,
  SnackbarContent,
  IconButton,
  Avatar,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Tooltip,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  Snackbar: {
    backgroundColor: "green",
  },
}));

class Photographers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        {
          label: "Approved",
          tooltip: "Click to approve approved users",
          data: props.users,
          route: "/photographers/approved",
          primaryField: "firstName",
          secondaryField: "phoneNumber",
          avatarField: "displayPictureUrl",
          lowerCase: true,
        },
        {
          label: "Pending",
          tooltip: "Click to approve pending users",
          data: props.users,
          route: "/photographers/pending",
          primaryField: "firstName",
          secondaryField: "phoneNumber",
          avatarField: "displayPictureUrl",
          lowerCase: true,
        },
        {
          label: "Rejected",
          tooltip: "Click to approve approved users",
          data: props.users,
          route: "/photographers/rejected",
          primaryField: "firstName",
          secondaryField: "phoneNumber",
          avatarField: "displayPictureUrl",
          lowerCase: true,
        },
      ],
      user: null,
      status: "pending",
      openSnackbarForUpdate: false,
      currentTab: 0,
    };
  }

  setInitialStates = (whichProp) => {
    if (this.state.user)
      this.setState({
        access: whichProp.access,
        status: whichProp.status,
      });
    else this.props.history.push("/photographers");
  };
  UNSAFE_componentWillMount() {
    this.fetchUser(this.props);
  }
  UNSAFE_componentWillReceiveProps(next) {
    this.fetchUser(next);
  }

  fetchUser = (data) => {
    let pendingUsers = data.users.filter((user) => user.status === "pending");
    let approvedUsers = data.users.filter((user) => user.status === "approved");
    let rejectedUsers = data.users.filter((user) => user.status === "rejected");

    const tabData = this.state.tabs;
    tabData[0].data = approvedUsers;
    tabData[1].data = pendingUsers;
    tabData[2].data = rejectedUsers;
    this.setState({ tabs: tabData });

    if (data.match.params.hasOwnProperty("tab")) {
      let tab = data.match.params["tab"];
      if (tab === "pending" && data.match.params.hasOwnProperty("id")) {
        this.setState(
          {
            user: this.state.tabs[1].data[data.match.params["id"]],
          },
          () => this.setInitialStates(this.state.user)
        );
      } else if (tab === "approved" && data.match.params.hasOwnProperty("id")) {
        this.setState(
          {
            user: this.state.tabs[0].data[data.match.params["id"]],
          },
          () => this.setInitialStates(this.state.user)
        );
      } else if (tab === "rejected" && data.match.params.hasOwnProperty("id")) {
        this.setState(
          {
            user: this.state.tabs[2].data[data.match.params["id"]],
          },
          () => this.setInitialStates(this.state.user)
        );
      }
    } else this.setState({ user: null });
  };
  listClickHandler = (currentSelected) => {
    this.setState({ user: currentSelected });
  };
  closePage = () => {
    this.setState({
      user: null,
    });
    this.props.history.push("/photographers");
  };

  handleStatusChange = (e, index, value) => {
    this.setState({ status: e.target.value }, () =>
      this.setState((prevState) => ({
        user: {
          ...prevState.user,
          status: this.state.status,
        },
      }))
    );
  };
  setInitialValues(props) {
    const tabs = this.state.tabs.map((e, i) => {
      const tab = e;
      tab.data = props.users;
      return tab;
    });
    this.setState({ users: props.users, tabs });
  }

  render() {
    const { tabs, status, user, openSnackbarForUpdate, currentTab } =
      this.state;
    const classes = useStyles;
    return (
      <Layout
        tabs={tabs}
        search={{
          data:
            currentTab === 0
              ? this.state.tabs[0].data
              : currentTab === 1
              ? this.state.tabs[1].data
              : this.state.tabs[2].data, // Optional, In case if you not providing this, tabs data will be placed.
          hintText: "Search Photographers", // Optional
          labelField: "firstName",
        }}
        listClickHandler={this.listClickHandler}
      >
        <Paper style={{ width: "100%", height: "100%", position: "relative" }}>
          {user ? (
            <Paper
              style={{
                height: window.innerHeight - 90,
                margin: "20 0 20 0",
                width: "fill-available",
                overflowY: "scroll",
              }}
            >
              <Tooltip
                title="Close"
                aria-label="add"
                placement="top"
                disableFocusListener
                disableTouchListener
                arrow
              >
                <CloseIcon
                  style={{
                    display: "flex",
                    top: "10px",
                    left: "10px",
                    position: "absolute",
                  }}
                  variant="extended"
                  size="small"
                  aria-label="close"
                  onClick={(e) => {
                    e.preventDefault();
                    this.closePage();
                  }}
                />
              </Tooltip>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Avatar
                  style={{
                    backgroundColor: "white",
                    height: "200px",
                    width: "200px",
                    borderRadius: "110px",
                  }}
                  src={user?.displayPictureUrl}
                />
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 400,
                    textAlign: "center",
                    display: "flex",
                    whiteSpace: "pre-line",
                    marginTop: "10px",
                  }}
                >
                  {user?.firstName} {user?.lastName}
                </span>
              </div>
              <div style={{ display: "flex", margin: 10 }}>
                <span
                  style={{
                    fontWeight: "bold",
                    flex: 1,
                  }}
                >
                  Contact Number
                </span>
                <span style={{ flex: 1, whiteSpace: "pre-line" }}>
                  {user.phoneNumber ? user.phoneNumber.slice(2) : "-"}
                </span>
              </div>
              <div style={{ display: "flex", margin: 10 }}>
                <span
                  style={{
                    fontWeight: "bold",
                    flex: 1,
                  }}
                >
                  E-mail
                </span>
                <span style={{ flex: 1, whiteSpace: "pre-line" }}>
                  {user.email ? user.email : "-"}
                </span>
              </div>
              <div style={{ display: "flex", margin: 10 }}>
                <span
                  style={{
                    fontWeight: "bold",
                    flex: 1,
                  }}
                >
                  Portfolio Links
                </span>
                <span style={{ flex: 1, whiteSpace: "pre-line" }}>
                  <ul>
                    {user.portfolioLinks
                      ? user.portfolioLinks.map((e, i) => {
                          return (
                            <li
                              key={i}
                              style={{ marginTop: 5, marginBottom: 5 }}
                            >
                              <a
                                href={e}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {e}
                              </a>
                            </li>
                          );
                        })
                      : "-"}
                  </ul>
                </span>
              </div>
              <div style={{ margin: 10 }}>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  style={{ width: "30%" }}
                  onChange={this.handleStatusChange}
                >
                  <MenuItem value={"pending"}>Pending</MenuItem>
                  <MenuItem value={"approved"}>Approved</MenuItem>
                  <MenuItem value={"rejected"}>Rejected</MenuItem>
                </Select>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingTop: 5,
                  marginBottom: 5,
                  marginRight: 20,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => {
                    e.preventDefault();
                    this.setState({ openSnackbarForUpdate: true });
                    this.props
                      .updateUser(user.id, user)
                      .then(() =>
                        this.setState(
                          { user: null, openSnackbarForUpdate: false },
                          () => this.props.history.push("/photographers")
                        )
                      );
                  }}
                >
                  Save
                </Button>
              </div>
              <Snackbar
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                open={openSnackbarForUpdate}
                autoHideDuration={2000}
                onClose={this.handleCloseSnackBar}
              >
                <SnackbarContent
                  style={{
                    backgroundColor: "blue",
                  }}
                  message={<span id="message-id">successfully updated</span>}
                  action={[
                    <IconButton
                      key="close"
                      aria-label="close"
                      color="inherit"
                      className={classes.close}
                      onClick={this.handleCloseSnackBar}
                    >
                      <CloseIcon />
                    </IconButton>,
                  ]}
                />
              </Snackbar>
            </Paper>
          ) : (
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar
                style={{
                  backgroundColor: "white",
                  height: "200px",
                  width: "200px",
                  borderRadius: "0px",
                }}
                src="/useraccess.jpeg"
              />
              <h3 style={{ padding: 0 }}>Manage Photographers</h3>
            </div>
          )}
        </Paper>
      </Layout>
    );
  }
}

export default withRouter(Photographers);

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import { makeStyles } from "@material-ui/core/styles";
import data from "./data/AllAccessKey";
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

class UserAndPermissions extends Component {
  constructor(props) {
    super(props);
    const allAccessLists = data.allAccessLists;
    const access = data.access;
    this.state = {
      allAccessLists,
      access,
      tabs: [
        {
          label: "Approved",
          tooltip: "Click to approve approved users",
          data: props.users,
          route: "/userandpermmision/approved",
          primaryField: "displayName",
          secondaryField: "email",
          avatarField: "imageURL",
        },
        {
          label: "Pending",
          tooltip: "Click to approve pending users",
          data: props.users,
          route: "/userandpermmision/pending",
          primaryField: "displayName",
          secondaryField: "email",
          avatarField: "imageURL",
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
    else this.props.history.push("/userandpermmision");
  };
  fetchUser = (data) => {
    let pendingUsers = data.users.filter(
      (user) => user.status === "pending"
    );
    let approvedUsers = data.users.filter(
      (user) => user.status === "approved"
    );

    const tabData = this.state.tabs;
    tabData[0].data = approvedUsers;
    tabData[1].data = pendingUsers;
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
      }
    } else this.setState({ user: null });
  };

  componentWillMount() {
    this.fetchUser(this.props);
  }
  componentWillReceiveProps(next) {
    this.fetchUser(next);
  }

  handleCloseSnackBar = () => {
    this.setState({ openSnackbarForUpdate: false });
  };
 handleStatusChange = (e, index, value) => {
    this.setState({ status: e.target.value }, () =>
      this.setState((prevState) => ({
        user: {
          ...prevState.user,
          status: this.state.status,
          access: {
            boards: false,
            studyMaterials: false,
            payments: false,
            usersAndPermissions: false,
          },
        },
      }))
    ); 
  };

  handleChangeForCheckBox = (name) => {
    const access = this.state.access;
    access[name] = this.state.access[name] ? false : true;
    this.setState({ access });
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        access: access,
        status: this.state.status,
      },
    }));
  };
  listClickHandler = (currentSelected) => {
    this.setState({ user: currentSelected });
  };
  closePage = () => {
    this.setState({
      user: null,
    });
  };

  render() {
    const {
      tabs,
      status,
      user,
      allAccessLists,
      access,
      openSnackbarForUpdate,
      currentTab,
    } = this.state;
    const classes = useStyles;
    return (
      <Layout
        tabs={tabs}
        search={{
          data:
            currentTab === 0
              ? this.state.tabs[0].data
              : this.state.tabs[1].data,
          hintText: "Search Users",
          labelField: "displayName",
        }}
        listClickHandler={this.listClickHandler}
        setTab={(tab) => {
          this.setState({ currentTab: tab });
        }}
        // fabClickHandler={(e) => {
        //   this.props.history.push("/userandpermmision");
        //   this.setState({ openInviteDialog: true });
        // }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "fill-available",
            height: window.innerHeight - 90,
          }}
        >
          <Paper
            style={{ width: "100%", height: "100%", position: "relative" }}
          >
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

                <h2
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 10,
                  }}
                >
                  {user ? user.displayName : ""}
                </h2>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: 20,
                    paddingTop: 10,
                    marginBottom: 10,
                  }}
                >
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
                  </Select>
                  {this.state.status === "approved" ? (
                    <Table size="small" style={{ marginTop: 10 }}>
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">Section</TableCell>
                          <TableCell align="center">Access&nbsp;</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {allAccessLists.map((singleData) => (
                          <TableRow key={singleData.label}>
                            <TableCell component="th" scope="row">
                              {singleData.label}
                            </TableCell>
                            <TableCell align="center">
                              <Checkbox
                                checked={access[singleData.name]}
                                onChange={() => {
                                  this.handleChangeForCheckBox(singleData.name);
                                }}
                                value="checkedB"
                                color="primary"
                                inputProps={{
                                  "aria-label": "secondary checkbox",
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    ""
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: 5,
                    marginBottom: 5,
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
                            () => this.props.history.push("/userandpermmision")
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
                <h3 style={{ padding: 0 }}>Manage Permissions For Users</h3>
              </div>
            )}
          </Paper>
        </div>
      </Layout>
    );
  }
}

export default withRouter(UserAndPermissions);

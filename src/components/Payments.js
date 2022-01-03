import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Paper from "@material-ui/core/Paper";

const templateTabs = [
  {
    label: "Pending",
    tooltip: "Click to approve pending users",
    data: [],
    route: "/payments/pending",
    primaryField: "name",
    primaryFieldFallback: "phone", // Optional
    secondaryField: "email",
    avatarField: "src",
    decorators: {
      conditionField: "status",
      options: ["pending", "approved", "unidentified"],
      colors: ["yellow", "green", "red"],
    },
  },
  {
    label: "Approved",
    tooltip: "Click to approve approved users",
    data: [],
    route: "/payments/approved",
    primaryField: "name",
    secondaryField: "email",
    avatarField: "logo",
    decorators: {
      conditionField: "currentStatus",
      options: ["pending", "authorized", "unidentified"],
      colors: ["teal", "cyan", "magenta"],
    },
  },
];

class Payments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: templateTabs,
      user: null,
      users: [],
    };
  }

  componentDidMount() {
    this.setInitialValues(this.props);
  }

  UNSAFE_componentWillReceiveProps(next) {
    this.setInitialValues(next);
    if (next.match.params.hasOwnProperty("tab")) {
      let tab = next.match.params["tab"];
      if (tab === "pending" && next.match.params.hasOwnProperty("id")) {
        this.setState({
          user: this.state.tabs[0].data[next.match.params["id"]],
        });
      } else if (tab === "approved" && next.match.params.hasOwnProperty("id")) {
        this.setState({
          user: this.state.tabs[1].data[next.match.params["id"]],
        });
      } else if (tab === "new") {
        this.setState({ user: null });
      }
    } else this.setState({ user: null });
    // if (next.match.path === "/dashboard/new") alert("NEW");
  }

  listClickHandler = (value) => {
    console.log(value);
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
    const { tabs, users, user } = this.state;
    return (
      <Layout
        tabs={tabs}
        search={{
          data: users, // Optional, In case if you not providing this, tabs data will be placed.
          hintText: "Search Users", // Optional
          labelField: "email",
        }}
        fabClickHandler={() => {
          this.props.history.push("/dashboard/new");
        }}
        listClickHandler={this.listClickHandler}
      >
        <Paper style={{ width: "100%", height: "100%" }}>
          {users.length > 0 && user ? (
            <div>
              You Have Selected: {user.name}, {user.email}, {user.phone}
            </div>
          ) : (
            <div
              style={{
                height: 300,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              "Suppose, nothing to show is appearing"
            </div>
          )}
        </Paper>
      </Layout>
    );
  }
}

export default withRouter(Payments);

// Payments
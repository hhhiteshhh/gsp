import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Paper from "@material-ui/core/Paper";
import ClientDetails from "./ClientDetails";

class Clients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        {
          label: "Clients",
          tooltip: "click to see user details",
          data: props.users,
          route: "/clients/users",
          primaryField: "firstName",
          primaryFieldFallback: "phoneNumber",
          // Optional
          secondaryField: "phoneNumber",
          secondaryFieldFallback: "email", // Optional
          avatarField: "displayPictureUrl",
        },
      ],
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
      if (tab === "users" && next.match.params.hasOwnProperty("id")) {
        this.setState({
          user: this.state.tabs[0].data[next.match.params["id"]],
        });
      }
    } else this.setState({ user: null });
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
    // console.log(this.props.db);
    return (
      <Layout
        tabs={tabs}
        search={{
          data: users, // Optional, In case if you not providing this, tabs data will be placed.
          hintText: "Search Users", // Optional
          labelField: "phoneNumber",
        }}
        fabClickHandler={() => {
          this.props.history.push("/dashboard/new");
        }}
        listClickHandler={this.listClickHandler}
      >
        <Paper style={{ width: "100%", height: "100%" }}>
          {users.length > 0 && user ? (
            <ClientDetails
              user={user}
              bookings={this.props.bookings}
              
            />
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

export default withRouter(Clients);

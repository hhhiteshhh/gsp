import React, { Component } from "react";
import { Route } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import NothingToShow from "../components/NothingToShow";
import { withFirebase } from "../firebase";
import withUser from "../hoc/withUser";
import Loader from "../components/Loader";
class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  render() {
    let moduleAccess = this.props.user.access;
    return moduleAccess ? (
      moduleAccess.dashboard ? (
        <Route
          exact
          path={["/dashboard", "/dashboard/:tab/:id", "/dashboard/new"]}
          render={(props) => <Dashboard {...props} {...this.state} />}
        />
      ) : (
        <NothingToShow />
      )
    ) : (
      <Loader />
    );
  }
}
export default withFirebase(withUser(DashboardContainer));

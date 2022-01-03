import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import withUser from "./hoc/withUser";
import withAuthentication from "./hoc/withAuthentication";
import LoginContainer from "./containers/Login";
import DashboardContainer from "./containers/Dashboard";
import UserAndPermissions from "./containers/UserAndPermissions";
import Loader from "./components/Loader";

// If we won't accept anonymous user as logged in user
const Secure = ({ component: Component, user, ...props }) => (
  <Route
    {...props}
    render={(props) =>
      user && !user.isAnonymous ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

// Loader while login redirect
const RouteLoader = ({ component: Component, user, ...props }) => (
  <Route
    {...props}
    render={(props) =>
      user ? <Redirect to="/dashboard" /> : <Component {...props} />
    }
  />
);

const App = ({ user }) => {
  return (
    <Router>
      <Switch>
        <Secure path="/dashboard" component={DashboardContainer} user={user} />
        <Secure path="/bookings" component={DashboardContainer} user={user} />
        <Secure path="/clients" component={DashboardContainer} user={user} />
        <Secure path="/requests" component={DashboardContainer} user={user} />
        <Secure path="/stories" component={DashboardContainer} user={user} />
        <Secure path="/categories" component={DashboardContainer} user={user} />
        <Secure path="/destinations" component={DashboardContainer} user={user} />
        <Secure path="/packages" component={DashboardContainer} user={user} />
        <Secure path="/photographers" component={DashboardContainer} user={user} />
        <Secure path="/payments" component={DashboardContainer} user={user} />
        <Secure path="/feedbackResponse" component={DashboardContainer} user={user} />
        <RouteLoader path="/authReloadWait" component={Loader} user={user} />
        <Route
          path="/userandpermmision"
          render={(props) => <UserAndPermissions {...props} />}
        />
        <Route
          exact
          path="/login"
          render={(props) => <LoginContainer {...props} />}
        />
        <Redirect from="/" to="/dashboard" />
      </Switch>
    </Router>
  );
};

export default withAuthentication(withUser(App));

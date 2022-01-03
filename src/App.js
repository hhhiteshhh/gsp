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
import BookingsContainer from "./containers/Bookings";
import CategoriesContainer from "./containers/Categories";
import ClientsContainer from "./containers/Clients";
import DestinationsContainer from "./containers/Destinations";
import FeedbackResponseContainer from "./containers/Chats";
import PackagesContainer from "./containers/Packages";
import PaymentsContainer from "./containers/Payments";
import PhotographersContainer from "./containers/Photographers";
import StoriesContainer from "./containers/Stories";
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
  // console.log(user, "gandhi");
  return (
    <Router>
      <Switch>
        <Secure path="/dashboard" component={DashboardContainer} user={user} />
        <Secure path="/bookings" component={BookingsContainer} user={user} />
        <Secure
          path="/destinations"
          component={DestinationsContainer}
          user={user}
        />
        <Secure
          path="/photographers"
          component={PhotographersContainer}
          user={user}
        />
        <Secure path="/clients" component={ClientsContainer} user={user} />
        <Secure path="/stories" component={StoriesContainer} user={user} />
        <Secure
          path="/categories"
          component={CategoriesContainer}
          user={user}
        />
        <Secure path="/packages" component={PackagesContainer} user={user} />
        <Secure path="/payments" component={PaymentsContainer} user={user} />
        <Secure
          path="/chats"
          component={FeedbackResponseContainer}
          user={user}
        />
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

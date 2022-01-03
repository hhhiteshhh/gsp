import React from "react";
import { withFirebase } from "../firebase";
import withUser from "../hoc/withUser";
import { Route } from "react-router-dom";
import Bookings from "../components/Bookings";

function BookingsContainer() {
  return (
    <>
      <Route
        exact
        path={["/bookings", "/bookings/bookings/:id"]}
        render={(props) => <Bookings />}
      />
    </>
  );
}

export default withFirebase(withUser(BookingsContainer));

import React from "react";
import { withFirebase } from "../firebase";
import withUser from "../hoc/withUser";
import { Route } from "react-router-dom";
import Destinations from "../components/Destinations";

function DestinationsContainer() {
  return (
    <>
      <Route
        exact
        path={["/destinations", "/destinations/destinations/:id"]}
        render={(props) => <Destinations />}
      />
    </>
  );
}

export default withFirebase(withUser(DestinationsContainer));

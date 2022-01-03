import React from "react";
import { withFirebase } from "../firebase";
import withUser from "../hoc/withUser";
import { Route } from "react-router-dom";
import Requests from "../components/Requests";

function RequestsContainer() {
  return (
    <>
      <Route
        exact
        path={["/requests", "/requests/requests/:id"]}
        render={(props) => <Requests />}
      />
    </>
  );
}

export default withFirebase(withUser(RequestsContainer));

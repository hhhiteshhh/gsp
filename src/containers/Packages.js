import React from "react";
import { withFirebase } from "../firebase";
import withUser from "../hoc/withUser";
import { Route } from "react-router-dom";
import Packages from "../components/Packages";

function PackagesContainer() {
  return (
    <>
      <Route
        exact
        path={["/packages", "packages/packages/:id"]}
        render={(props) => <Packages />}
      />
    </>
  );
}

export default withFirebase(withUser(PackagesContainer));

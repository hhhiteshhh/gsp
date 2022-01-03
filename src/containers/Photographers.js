import React from "react";
import { withFirebase } from "../firebase";
import withUser from "../hoc/withUser";
import { Route } from "react-router-dom";
import Photographers from "../components/Photographers";

function PhotographersContainer() {
  return (
    <>
      <Route
        exact
        path={["/photographers", "/photographers/photographers/:id"]}
        render={(props) => <Photographers />}
      />
    </>
  );
}

export default withFirebase(withUser(PhotographersContainer));

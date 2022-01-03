import React from "react";
import { withFirebase } from "../firebase";
import withUser from "../hoc/withUser";
import { Route } from "react-router-dom";
import Stories from "../components/Stories";

function StoriesContainer() {
  return (
    <>
      <Route
        exact
        path={["/stories", "/stories/stories/:id"]}
        render={(props) => <Stories />}
      />
    </>
  );
}

export default withFirebase(withUser(StoriesContainer));

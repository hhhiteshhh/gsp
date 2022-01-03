import React from "react";
import { withFirebase } from "../firebase";
import withUser from "../hoc/withUser";
import { Route } from "react-router-dom";
import FeedbackResponse from "../components/FeedbackResponse";

function FeedbackResponseContainer() {
  return (
    <>
      <Route
        exact
        path={["/feedbackResponse", "/feedbackResponse/feedbackResponse/:id"]}
        render={(props) => <FeedbackResponse />}
      />
    </>
  );
}

export default withFirebase(withUser(FeedbackResponseContainer));

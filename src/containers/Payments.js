import React from "react";
import { withFirebase } from "../firebase";
import withUser from "../hoc/withUser";
import { Route } from "react-router-dom";
import Payments from "../components/Payments";

function PaymentsContainer() {
  return (
    <>
      <Route
        exact
        path={["/payments", "/payments/payments/:id"]}
        render={(props) => <Payments />}
      />
    </>
  );
}

export default withFirebase(withUser(PaymentsContainer));

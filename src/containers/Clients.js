import React from "react";
import { withFirebase } from "../firebase";
import withUser from "../hoc/withUser";
import { Route } from "react-router-dom";
import Clients from "../components/Clients";

function ClientsContainer() {
  return (
    <>
      <Route
        exact
        path={["/clients", "/clients/clients/:id"]}
        render={(props) => <Clients />}
      />
    </>
  );
}

export default withFirebase(withUser(ClientsContainer));

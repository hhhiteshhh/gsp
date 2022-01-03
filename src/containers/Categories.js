import React from "react";
import { withFirebase } from "../firebase";
import withUser from "../hoc/withUser";
import { Route } from "react-router-dom";
import Categories from "../components/Categories";

function CategoriesContainer() {
  return (
    <>
      <Route
        exact
        path={["/categories", "/categories/categories/:id"]}
        render={(props) => <Categories />}
      />
    </>
  );
}

export default withFirebase(withUser(CategoriesContainer));

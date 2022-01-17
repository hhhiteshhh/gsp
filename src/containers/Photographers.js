import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { withFirebase } from "../firebase";
import withUser from "../hoc/withUser";
import Photographers from "../components/Photographers";

function UserAndPermissionsContainer(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    allUsers();
  }, []);
  const allUsers = () => {
    props.db.collection(`photographers`).onSnapshot((obj) => {
      const users = [];
      obj.forEach((doc) => {
        if (doc.exists) {
          const user = doc.data();
          user.id = doc.id;
          users.push(user);
        }
      });
      setUsers(users);
    });
  };

  const updateUser = (userId, userDetails) => {
    return props.db.collection(`photographers`).doc(userId).update(userDetails);
  };
  return (
    <>
      <Route
        exact
        path={["/photographers", "/photographers/:tab/:id"]}
        render={(props) => (
          <Photographers {...props} users={users} updateUser={updateUser} />
        )}
      />
    </>
  );
}

export default withFirebase(withUser(UserAndPermissionsContainer));

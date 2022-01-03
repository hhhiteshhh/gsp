import React from "react";
import { withFirebase } from "../firebase";
import withUser from "../hoc/withUser";
import { Route } from "react-router-dom";
import Photographers from "../components/Photographers";

function PhotographersContainer() {
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        const users1 = json.map((element, index) => {
          const user = element;
          user.src = `https://cdn4.iconfinder.com/data/icons/user-avatar-flat-icons/512/User_Avatar-${
            index + 10
          }-512.png`;
          user.logo = user.src;
          user.status = ["pending", "approved", "unidentified"][
            Math.floor(Math.random() * 3)
          ];
          user.currentStatus = ["pending", "unidentified", "authorized"][
            Math.floor(Math.random() * 3)
          ];
          return user;
        });
        setUsers(users1);
      });
  };
  return (
    <>
      <Route
        exact
        path={["/photographers", "/photographers/:tab/:id"]}
        render={(props) => <Photographers props={props} users={users}/>}
      />
    </>
  );
}

export default withFirebase(withUser(PhotographersContainer));

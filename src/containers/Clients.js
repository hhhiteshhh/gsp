import React, { useState } from "react";
import { withFirebase } from "../firebase";
import withUser from "../hoc/withUser";
import { Route } from "react-router-dom";
import Clients from "../components/Clients";

function ClientsContainer(props) {
  const [usersList, setUserList] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  React.useEffect(() => {
    fetchCollectionDocument("users", setUserList);
    fetchCollectionDocument("bookings", setAllBookings);
  }, []);
  const fetchCollectionDocument = (dbName, setterFunction) => {
    let collectionRef = props.db.collection(dbName);
    collectionRef.onSnapshot((obj) => {
      const tempList = [];
      obj.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        tempList.push(data);
      });
      setterFunction(tempList);
    });
  };
  return (
    <>
      <Route
        exact
        path={["/clients", "/clients/:tab/:id"]}
        render={(props) => (
          <Clients props={props} users={usersList} bookings={allBookings} />
        )}
      />
    </>
  );
}

export default withFirebase(withUser(ClientsContainer));

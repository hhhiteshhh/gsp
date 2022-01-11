import React from "react";
import { withFirebase } from "../firebase";
import withUser from "../hoc/withUser";
import { Route } from "react-router-dom";
import Stories from "../components/Stories";

function StoriesContainer(props) {
  const [storiesList, setStoriesList] = React.useState([]);
  React.useEffect(() => {
    fetchCollectionDocument("stories", setStoriesList);
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
        path={["/stories", "/stories/:tab/:id", "/stories/new"]}
        render={(props) => <Stories props={props} stories={storiesList} />}
      />
    </>
  );
}

export default withFirebase(withUser(StoriesContainer));

import React from "react";
import { withFirebase } from "../firebase";
import withUser from "../hoc/withUser";
import { Route } from "react-router-dom";
import Destinations from "../components/Destinations";

function DestinationsContainer(props) {
  const [destinationsList, setDestinationsList] = React.useState([]);
  const [categoriesData, setCategoriesData] = React.useState([]);
  const [packageData, setPackageData] = React.useState([]);
  React.useEffect(() => {
    fetchCollectionDocument("destinations", setDestinationsList);
    fetchCollectionDocument("categories", setCategoriesData);
    fetchCollectionDocument("packages", setPackageData);
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
        path={["/destinations", "/destinations/:tab/:id"]}
        render={(props) => (
          <Destinations
            props={props}
            destinationsList={destinationsList}
            categoriesData={categoriesData}
            packageData={packageData}
          />
        )}
      />
    </>
  );
}

export default withFirebase(withUser(DestinationsContainer));

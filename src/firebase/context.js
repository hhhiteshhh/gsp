import React from "react";

const FirebaseContext = React.createContext(null);

export const withFirebase = (Component) => (props) =>
  (
    <FirebaseContext.Consumer>
      {(firebase) => (
        <Component
          {...props}
          firebase={firebase}
          db={firebase.db}
          storage={firebase.storage}
        />
      )}
    </FirebaseContext.Consumer>
  );

export default FirebaseContext;

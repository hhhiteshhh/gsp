import React from "react";
import Paper from "@material-ui/core/Paper";
import useraccess from "../images/accessDenied.svg";
import withFirebase from "../hoc/withFirebase";
import { withRouter } from "react-router-dom";
import { Button } from "@material-ui/core";
import Retry from "@material-ui/icons/Refresh";
function NothingToShow(props) {
  function logoutFunction(e) {
    e.preventDefault();
    props.firebase.logOut(props);
    // console.log('logout');
  }
  function reloadFunction(e) {
    e.preventDefault();
    console.log("retry");

    window.location.reload(false);
  }
  return (
    <Paper
      style={{
        height: window.innerHeight, // - 70,
        width: "fill-available",
        // overflowY: "scroll",
        display: "flex",
        flexDirection: "column",
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: "center",
      }}
    >
      <img
        style={{
          maxHeight: "300px",
          maxWidth: "300px",
          minWidth: "200px",
          alignSelf: "center",
        }}
        src={useraccess}
      ></img>
      <h2 style={{ alignSelf: "center" }}>
        You don't have enough permissions to see this page
      </h2>

      <h6 style={{ alignSelf: "center" }}>Contact your administrator</h6>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <div>
          <Button
            variant="contained"
            color="primary"
            // startIcon={<Retry/>}
            onClick={(e) => logoutFunction(e)}
          >
            Logout
          </Button>
        </div>
        <div>
          <Button
            style={{ marginLeft: "5px" }}
            variant="contained"
            startIcon={<Retry />}
            onClick={(e) => reloadFunction(e)}
          >
            Retry
          </Button>
        </div>
      </div>
    </Paper>
  );
}

export default withFirebase(withRouter(NothingToShow));

import React, { Component } from "react";
import Snackbar from "@material-ui/core/Snackbar";
// import Fade from '@material-ui/core/Fade'

export default class SnackBar_networkIssue extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {
  //         isDisconnected: true,
  //     };
  // }
  // handleCloseSnack = () => {
  //     this.setState({ isDisconnected: false });
  // };

  render() {
    const { isDisconnected } = this.props;
    return (
      <div>
        <Snackbar
          open={isDisconnected}
          message="Internet Connection Failed"
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        />
      </div>
    );
  }
}

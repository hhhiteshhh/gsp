import React, { Component } from "react";
import Snackbar from "@material-ui/core/Snackbar";
// import Fade from '@material-ui/core/Fade'

export default class SnackBarCustom extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {
  //         openSnackBar: true,
  //     };
  // }
  // handleCloseSnack = () => {
  //     this.setState({ openSnackBar: false });
  // };

  render() {
    const { openSnackBar, handleCloseSnack, msgSnack } = this.props;
    // const { msgSnack} = this.props
    return (
      <div>
        <Snackbar
          open={openSnackBar}
          // TransitionComponent={Fade}
          autoHideDuration={3000}
          onClose={handleCloseSnack}
          message={<span>{msgSnack}</span>}
        />
      </div>
    );
  }
}

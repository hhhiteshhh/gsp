import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Paper from "@material-ui/core/Paper";
import DestinationDetails from "./DestinationDetails";
import SnackbarCustom from "./SnackBarCustom";
import SnackBar_networkIssue from "./SnackBar_networkIssue";

class Destinations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        {
          label: "Destinations",
          tooltip: "click to see destination details",
          data: props.destinationsList,
          route: "/destinations/destinations",
          primaryField: "city",
          primaryFieldFallback: "country",
          // Optional
          secondaryField: "country",
          secondaryFieldFallback: "", // Optional
          avatarField: "displayPictureUrl",
        },
      ],
      destination: null,
      destinations: [],
      newDestination: false,
      callSnackBar: false,
      msgSnack: "",
      isDisconnected: false,
    };
  }

  componentDidMount() {
    this.setInitialValues(this.props);
  }

  UNSAFE_componentWillReceiveProps(next) {
    this.setInitialValues(next);
    if (next.match.params.hasOwnProperty("tab")) {
      let tab = next.match.params["tab"];
      if (tab === "destinations" && next.match.params.hasOwnProperty("id")) {
        this.setState({
          destination: this.state.tabs[0].data[next.match.params["id"]],
        });
      }
    } else this.setState({ destination: null });
    // if (next.match.path === "/dashboard/new") alert("NEW");
  }

  listClickHandler = (value) => {
    // console.log(value);
  };

  setInitialValues(props) {
    const tabs = this.state.tabs.map((e, i) => {
      const tab = e;
      tab.data = props.destinationsList;
      return tab;
    });
    this.setState({ destinations: props.destinationsList, tabs });
  }

  openSnackBarFunction = (msg) => {
    this.setState({
      callSnackBar: true,
      msgSnack: msg,
    });
  };
  handleCloseSnack = () => {
    this.setState({ callSnackBar: false });
  };
  handleCloseAddNew = () => {
    this.setState({ newDestination: false });
  };

  render() {
    const { tabs, destinations, destination, newDestination } = this.state;
    // console.log(this.props);
    return (
      <Layout
        tabs={tabs}
        search={{
          data: destinations, // Optional, In case if you not providing this, tabs data will be placed.
          hintText: "Search Destination", // Optional
          labelField: "city",
        }}
        fabClickHandler={() => {
          this.props.history.push("/destinations/new");
          this.setState({
            newDestination: true,
          });
        }}
        listClickHandler={this.listClickHandler}
      >
        <Paper style={{ width: "100%", height: "100%" }}>
          {destinations.length > 0 && destination ? (
            <DestinationDetails
              destination={destination}
              categoriesData={this.props.categoriesData}
              packageData={this.props.packageData}
              openSnackBarFunction={this.openSnackBarFunction}
              props={this.props}
              newDestination={newDestination}
            />
          ) : newDestination ? (
            <DestinationDetails
              categoriesData={this.props.categoriesData}
              packageData={this.props.packageData}
              newDestination={newDestination}
              openSnackBarFunction={this.openSnackBarFunction}
              props={this.props}
              handleCloseAddNew={this.handleCloseAddNew}
            />
          ) : (
            <div
              style={{
                height: 300,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              "Suppose, nothing to show is appearing"
            </div>
          )}
        </Paper>

        <SnackbarCustom
          msgSnack={this.state.msgSnack}
          handleCloseSnack={this.handleCloseSnack}
          openSnackBar={this.state.callSnackBar}
        />

        <SnackBar_networkIssue isDisconnected={this.state.isDisconnected} />
      </Layout>
    );
  }
}

export default withRouter(Destinations);

// Destinations

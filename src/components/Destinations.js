import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Paper from "@material-ui/core/Paper";
import DestinationDetails from "./DestinationDetails";

// const templateTabs = [
//   {
//     label: "All Destinations",
//     tooltip: "Click to approve pending users",
//     data: [],
//     route: "/destinations/pending",
//     primaryField: "name",
//     primaryFieldFallback: "phone", // Optional
//     secondaryField: "email",
//     avatarField: "src",
//     decorators: {
//       conditionField: "status",
//       options: ["pending", "approved", "unidentified"],
//       colors: ["yellow", "green", "red"],
//     },
//   },
//   {
//     label: "Approved",
//     tooltip: "Click to approve approved users",
//     data: [],
//     route: "/destinations/approved",
//     primaryField: "name",
//     secondaryField: "email",
//     avatarField: "logo",
//     decorators: {
//       conditionField: "currentStatus",
//       options: ["pending", "authorized", "unidentified"],
//       colors: ["teal", "cyan", "magenta"],
//     },
//   },
// ];

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
      users: [],
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
    this.setState({ users: props.destinationsList, tabs });
  }

  render() {
    const { tabs, users, destination } = this.state;
    return (
      <Layout
        tabs={tabs}
        search={{
          data: users, // Optional, In case if you not providing this, tabs data will be placed.
          hintText: "Search Users", // Optional
          labelField: "city",
        }}
        // fabClickHandler={() => {
        //   this.props.history.push("/dashboard/new");
        // }}
        listClickHandler={this.listClickHandler}
      >
        <Paper style={{ width: "100%", height: "100%" }}>
          {users.length > 0 && destination ? (
            <DestinationDetails
              destination={destination}
              categoriesData={this.props.categoriesData}
              packageData={this.props.packageData}
            />
          ) : (
            // <div>
            //   You Have Selected: {destination.city}, {destination.country},{" "}
            //   {destination.description}
            // </div>
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
      </Layout>
    );
  }
}

export default withRouter(Destinations);

// Destinations

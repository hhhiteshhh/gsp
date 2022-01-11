import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import { Paper, Avatar } from "@material-ui/core";
import StoriesDetails from "./StoriesDetails";
import SnackbarCustom from "./SnackBarCustom";
import SnackBar_networkIssue from "./SnackBar_networkIssue";

class Stories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        {
          label: "Saved",
          tooltip: "Click to see saved stories",
          data: props.stories,
          route: "/stories/saved",
          primaryField: "title",
          secondaryField: "status",
          avatarField: "thumbnail",
          lowerCase: true,
        },
        {
          label: "Published",
          tooltip: "Click to see published stories",
          data: props.stories,
          route: "/stories/published",
          primaryField: "title",
          secondaryField: "status",
          avatarField: "thumbnail",
          lowerCase: true,
        },
        {
          label: "Unpublished",
          tooltip: "Click to see unpublished stories",
          data: props.stories,
          route: "/stories/unpublished",
          primaryField: "title",
          secondaryField: "status",
          avatarField: "thumbnail",
          lowerCase: true,
        },
      ],
      story: null,
      currentTab: 0,
      newStory: false,
      callSnackBar: false,
      msgSnack: "",
      isDisconnected: false,
    };
  }

  fetchstory = (data) => {
    let unpublishedStories = data.stories.filter(
      (story) => story.status === "unpublished"
    );
    let publishedStories = data.stories.filter(
      (story) => story.status === "published"
    );
    let savedStories = data.stories.filter((story) => story.status === "saved");

    const tabData = this.state.tabs;
    tabData[0].data = savedStories;
    tabData[1].data = publishedStories;
    tabData[2].data = unpublishedStories;
    this.setState({ tabs: tabData });

    if (data.match.params.hasOwnProperty("tab")) {
      let tab = data.match.params["tab"];
      if (tab === "published" && data.match.params.hasOwnProperty("id")) {
        this.setState({
          story: this.state.tabs[1].data[data.match.params["id"]],
        });
      } else if (
        tab === "unpublished" &&
        data.match.params.hasOwnProperty("id")
      ) {
        this.setState({
          story: this.state.tabs[2].data[data.match.params["id"]],
        });
      } else if (tab === "saved" && data.match.params.hasOwnProperty("id")) {
        this.setState({
          story: this.state.tabs[0].data[data.match.params["id"]],
        });
      }
    } else this.setState({ story: null });
  };

  UNSAFE_componentWillMount() {
    this.fetchstory(this.props);
  }
  UNSAFE_componentWillReceiveProps(next) {
    this.fetchstory(next);
  }

  listClickHandler = (currentSelected) => {
    this.setState({ story: currentSelected });
  };
  closePage = () => {
    this.setState({
      story: null,
    });
  };
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
    this.setState({ newStory: false });
  };

  render() {
    const { tabs, story, currentTab, newStory } = this.state;

    return (
      <Layout
        tabs={tabs}
        search={{
          data:
            currentTab === 0
              ? this.state.tabs[0].data
              : currentTab === 1
              ? this.state.tabs[1].data
              : this.state.tabs[2].data,
          hintText: "Search Stories",
          labelField: "title",
        }}
        listClickHandler={this.listClickHandler}
        setTab={(tab) => {
          this.setState({ currentTab: tab });
        }}
        fabClickHandler={(e) => {
          this.props.history.push("/stories/new");
          this.setState({
            newStory: true,
          });
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "fill-available",
            height: window.innerHeight - 90,
          }}
        >
          <Paper
            style={{ width: "100%", height: "100%", position: "relative" }}
          >
            {story ? (
              <StoriesDetails
                story={story}
                props={this.props}
                currentTab={currentTab}
                openSnackBarFunction={this.openSnackBarFunction}
              />
            ) : // <div>you have selected {story.title}</div>
            newStory ? (
              <StoriesDetails
                newStory={newStory}
                props={this.props}
                handleCloseAddNew={this.handleCloseAddNew}
                currentTab={currentTab}
                openSnackBarFunction={this.openSnackBarFunction}
              />
            ) : (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar
                  style={{
                    backgroundColor: "white",
                    height: "200px",
                    width: "200px",
                    borderRadius: "0px",
                  }}
                  src="/useraccess.jpeg"
                />
                <h3 style={{ padding: 0 }}>No Story Selected</h3>
              </div>
            )}
          </Paper>
        </div>
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

export default withRouter(Stories);

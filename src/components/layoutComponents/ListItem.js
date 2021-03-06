import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

function ListItemElement({
  avatar,
  color,
  index,
  listClickHandler,
  primary,
  secondary,
  selectedIndex,
  lowerCase,
  popular,
  recommended,
}) {
  return (
    <div>
      <ListItem
        alignItems="center"
        style={{
          backgroundColor: selectedIndex === index ? "white" : "",
        }}
        onClick={(e) => {
          e.preventDefault();
          listClickHandler(index);
        }}
      >
        <ListItemAvatar>
          <Avatar alt={primary} src={avatar}>
            {primary?.substring(0, 1)}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          disableTypography
          primary={
            <div
              style={{ color: color || "black", textTransform: "capitalize" }}
            >
              {primary}
            </div>
          }
          secondary={
            <div
              style={{
                textTransform: lowerCase ? "lowercase" : "uppercase",
              }}
            >
              {secondary?.length > 23
                ? `${secondary.slice(0, 22)}...`
                : secondary}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: "5px",
                }}
              >
                {popular && (
                  <p
                    style={{
                      padding: 5,
                      margin: 0,
                      textTransform: "capitalize",
                      backgroundColor: "#0defef",
                      borderRadius: 10,
                      marginRight: 5,
                    }}
                  >
                    popular
                  </p>
                )}
                {recommended && (
                  <p
                    style={{
                      padding: 5,
                      margin: 0,
                      textTransform: "capitalize",
                      backgroundColor: "#0defef",
                      borderRadius: 10,
                    }}
                  >
                    recommended
                  </p>
                )}
              </div>
            </div>
          }
        />
      </ListItem>

      <Divider />
    </div>
  );
}

export default ListItemElement;

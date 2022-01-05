import React, { useEffect } from "react";
import { Paper, Avatar } from "@material-ui/core";

import BookingCard from "./BookingCard";

function ClientDetails({ user, bookings, props }) {
  const [userBookings, setUserBookings] = React.useState([]);
  useEffect(() => {
    const templist = bookings.filter((e) => e.createdBy === user.uid);
    setUserBookings(templist);
  }, [bookings, user]);
  return (
    <Paper
      style={{
        height: window.innerHeight - 70,
        width: "fill-available",
        overflowY: "scroll",
        display: "flex",
        flexDirection: "column",
        paddingLeft: 10,
        paddingRight: 10,
      }}
    >
      <div //DIV FOR TOP OF SCREEN BORDERED QUESTIONS VIEW
        style={{
          // height: 100,
          //   border: `2px solid red`,
          marginBottom: 5,
          borderRadius: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "5px",
          }}
        >
          <div>
            {/* <CloseOutlined onClick={handlePageClose} /> */}
            {/* <Edit style={{ float: 'right' }} onClick={handlePageEdit} /> */}
          </div>
          <div
            style={{
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
                borderRadius: "110px",
              }}
              src={user.displayPictureUrl}
            />
            <span
              style={{
                fontSize: 18,
                fontWeight: 400,
                textAlign: "center",
                display: "flex",
                whiteSpace: "pre-line",
                marginTop: "10px",
              }}
            >
              {user?.firstName} {user?.lastName}
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", margin: 10 }}>
        <span
          style={{
            fontWeight: "bold",
            flex: 1,
          }}
        >
          Contact Number
        </span>
        <span style={{ flex: 1, whiteSpace: "pre-line" }}>
          {user.phoneNumber ? user.phoneNumber : "-"}
        </span>
      </div>
      <div style={{ display: "flex", margin: 10 }}>
        <span
          style={{
            fontWeight: "bold",
            flex: 1,
          }}
        >
          E-mail
        </span>
        <span style={{ flex: 1, whiteSpace: "pre-line" }}>
          {user.email ? user.email : "-"}
        </span>
      </div>
      <span
        style={{
          fontSize: 18,
          fontWeight: "bold",
          textAlign: "center",
          display: "flex",
          whiteSpace: "pre-line",
          marginTop: "10px",
          //   flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Bookings
      </span>
      <div
        style={{
          display: "flex",
          margin: 10,
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "space-around",
        }}
      >
        {userBookings?.length > 0 &&
          userBookings?.map((booking, index) => {
            return (
              <div key={index} style={{ margin: 10 }}>
                <BookingCard booking={booking} />
              </div>
            );
          })}
        {userBookings?.length === 0 && <div>No Bookings Yet</div>}
      </div>
    </Paper>
  );
}

export default ClientDetails;

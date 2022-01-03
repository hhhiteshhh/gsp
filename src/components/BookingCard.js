import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
// import Avatar from '@mui/material/Avatar';
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import {
  Paper,
  Button,
  Snackbar,
  SnackbarContent,
  //   IconButton,
  Avatar,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Tooltip,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { withFirebase } from "../firebase";
import withUser from "../hoc/withUser";
function BookingCard({ booking, db }) {
  const [destinationData, setDestinationData] = React.useState();
  const [packageData, setPackageData] = React.useState();
  const [photographerData, setPhotographerData] = React.useState();
  useEffect(() => {
    db.collection("destinations")
      .doc(booking.destinationId.destinationId)
      .get()
      .then((doc) => {
        const data = doc.data();
        setDestinationData(data);
      });
    db.collection("packages")
      .doc(booking.packageId)
      .get()
      .then((doc) => {
        const data = doc.data();
        setPackageData(data);
      });
    if (booking?.photographerId) {
      db.collection("users")
        .doc(booking.photographerId)
        .get()
        .then((doc) => {
          const data = doc.data();
          setPhotographerData(data);
        });
    }
  }, [booking]);
  var formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });
  return (
    <Card sx={{ width: 250 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {booking.destinationName.charAt(0)}
          </Avatar>
        }
        title={booking.destinationName}
        subheader={`${booking.startDate} - ${booking.endDate}`}
        style={{
          textTransform: "uppercase",
        }}
      />
      <CardMedia
        component="img"
        height="194"
        image={destinationData?.displayImages[0]}
        alt={booking.destinationName}
      />
      <CardContent>
        <Typography
          variant="body2"
          color={
            booking.bookingStatus === "cancelled"
              ? "red"
              : booking.bookingStatus === "onGoing"
              ? "blue"
              : "green"
          }
        >
          <span style={{ color: "black" }}> Status:</span>{" "}
          {booking.bookingStatus}
        </Typography>
        <Typography variant="body2" color={"textSecondary"}>
          <span style={{ color: "black" }}> Package:</span>{" "}
          {packageData?.numberOfPhotos} Edited Photos
        </Typography>{" "}
        <Typography variant="body2" color={"textSecondary"}>
          <span style={{ color: "black" }}> Price:</span>
          {formatter.format(packageData?.price)}
          {/* {packageData?.price} */}
        </Typography>{" "}
        <Typography variant="body2" color={"textSecondary"}>
          <span style={{ color: "black" }}> Photographer:</span>{" "}
          {booking.photographerAllocated
            ? `${photographerData?.firstName}`
            : "Yet To be Assigned"}
        </Typography>{" "}
        <Typography variant="body2" color={"textSecondary"}>
          <span style={{ color: "black" }}> Payment Details:</span> {"pending"}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default withFirebase(withUser(BookingCard));

import React, { useEffect } from "react";
import { withFirebase } from "../firebase";
import withUser from "../hoc/withUser";
import Paper from "@material-ui/core/Paper";
import Edit from "@material-ui/icons/Edit";
import CloseOutlined from "@material-ui/icons/CloseOutlined";
import CategoriesDataChip from "./CategoriesData";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import countryData from "../components/data/countryData";

function DestinationDetails({ db, destination }) {
  const [selected, setSelected] = React.useState(null);
  const [editPage, setEditPage] = React.useState(false);
  const [basicPackageData, setBasicPackageData] = React.useState(null);
  const [newCity, setNewCity] = React.useState(null);
  const [newCountry, setNewCountry] = React.useState(null);
  const [countryIndex, setCountryIndex] = React.useState(null);
  const [newDescription, setNewDescription] = React.useState(null);
  const [newDisplayImage, setNewDisplayImage] = React.useState(null);

  useEffect(() => {
    setSelected(destination);
    setEditPage(false);
    setNewCountry(null);
  }, [destination]);
  useEffect(() => {
    if (selected) {
      let newArray = [];
      db.collection("packages")
        .doc(selected.basicPackage)
        .get()
        .then((doc) => {
          const data = doc.data();
          setBasicPackageData(data);
        });
    }
  }, [destination, selected]);
  const handlePageClose = () => {
    setSelected(null);
  };
  const handlePageEdit = () => {
    setEditPage(true);
  };
  const handleClosePageEdit = () => {
    setEditPage(false);
  };
  var formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  const selectCountry = (val) => {
    setNewCountry(val);
    // this.setState({ country: val });
  };

  const selectCity = (val) => {
    setNewCity(val);
    //   this.setState({ region: val });
  };

  console.log({ countryIndex });
  return selected ? (
    editPage ? (
      //   <h1>This is your edit Page</h1>
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
        <div style={{ display: "flex" }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              height: "100%",
              marginLeft: "-5px",
              alignItems: "center",
            }}
          >
            <CloseOutlined onClick={handleClosePageEdit} />
          </div>
          <div
            style={{
              flex: 9,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2>Edit Destination</h2>
          </div>
        </div>

        {/* <TextField
          // disabled
          label="Destination City"
          variant="outlined"
          style={{ marginTop: 10 }}
          defaultValue={selected.country}
          onChange={
            (e) => setNewCountry(e.target.value)
            // this.setState({
            //   newMetric: e.target.value,
            // })
          }
        ></TextField>
        <TextField
          // disabled
          label="Destination City"
          variant="outlined"
          style={{ marginTop: 10 }}
          defaultValue={selected.city}
          onChange={
            (e) => setNewCity(e.target.value)
            // this.setState({
            //   newMetric: e.target.value,
            // })
          }
        ></TextField> */}
        {/* <TextField
          label="Metric Description"
          variant="outlined"
          style={{ marginTop: 10 }}
          defaultValue={selected.description}
          onChange={(e) =>
            this.setState({
              description: e.target.value,
            })
          }
        ></TextField> */}

        <FormControl
          style={{
            marginTop: 10,
            marginBottom: 1,
            minWidth: 150,
          }}
        >
          <InputLabel>Country</InputLabel>
          <Select
            value={newCountry || selected?.country}
            input={<Input />}
            onChange={(e) => setNewCountry(e.target.value)}
            renderValue={(group) => {
              //   console.log(group);
              return <p style={{ textTransform: "capitalize" }}>{group}</p>;
            }}
          >
            {countryData.map((age, index) => (
              <MenuItem
                key={age.countryShortCode}
                value={age.countryName}
                onClick={() => {
                  setCountryIndex(index);
                }}
              >
                {age.countryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          style={{
            marginTop: 10,
            marginBottom: 1,
            minWidth: 150,
          }}
        >
          <InputLabel>City</InputLabel>
          <Select
            value={newCity || selected?.city}
            input={<Input />}
            onChange={(e) => {
              console.log(e);
              setNewCity(e.target.value);
            }}
            renderValue={(group) => {
              //   console.log(group);
              return <p style={{ textTransform: "capitalize" }}>{group}</p>;
            }}
          >
            {countryData[countryIndex]?.regions?.map((age, index) => (
              <MenuItem key={age} value={age}>
                {age}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Description"
          variant="outlined"
          style={{ marginTop: 10 }}
          defaultValue={selected.description}
          onChange={(e) =>
            this.setState({
              description: e.target.value,
            })
          }
        ></TextField>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <div>
            {/* <Button
                      color='primary'
                      onClick={e=>this.addNewMetric(e)}
                  >Save as new Metric</Button> */}
            <Button color="primary" onClick={(e) => handleClosePageEdit()}>
              Cancel
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              //   onClick={this.updateMetricVal}
              onClick={(e) => handleClosePageEdit()}
            >
              Update
            </Button>
          </div>
        </div>
      </Paper>
    ) : (
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
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              height: "100%",
              marginLeft: "-5px",
              alignItems: "center",
            }}
          >
            <CloseOutlined
              onClick={handlePageClose}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div
            style={{
              flex: 9,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textTransform: "uppercase",
            }}
          >
            <h2>
              {selected?.city} {selected?.country}
            </h2>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              height: "100%",
              alignItems: "center",
            }}
          >
            <Edit onClick={handlePageEdit} style={{ cursor: "pointer" }} />
          </div>
        </div>
        <div style={{ display: "flex", margin: 10 }}>
          <span
            style={{
              fontWeight: "bold",
              flex: 1,
            }}
          >
            Destination City
          </span>
          <span style={{ flex: 1, textTransform: "capitalize" }}>
            {selected.city}
          </span>
        </div>
        <div style={{ display: "flex", margin: 10 }}>
          <span
            style={{
              fontWeight: "bold",
              flex: 1,
            }}
          >
            Destination Country
          </span>
          <span style={{ flex: 1, textTransform: "capitalize" }}>
            {selected.country}
          </span>
        </div>
        <div style={{ display: "flex", margin: 10 }}>
          <span
            style={{
              fontWeight: "bold",
              flex: 1,
            }}
          >
            Destination Description
          </span>
          <span style={{ flex: 1 }}>{selected.description}</span>
        </div>
        <div style={{ display: "flex", margin: 10 }}>
          <span
            style={{
              fontWeight: "bold",
              flex: 1,
            }}
          >
            Avatar Image
          </span>
          <span style={{ flex: 1, textTransform: "capitalize" }}>
            <img
              src={selected?.displayPictureUrl}
              alt={selected?.city}
              style={{
                height: 120,
                width: 120,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: "transparent",
              }}
            ></img>
          </span>
        </div>
        <div style={{ display: "flex", margin: 10 }}>
          <span
            style={{
              fontWeight: "bold",
              flex: 1,
            }}
          >
            Display Images
          </span>
        </div>
        <div
          style={{
            display: "flex",
            margin: 10,
            flexWrap: "wrap",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          {selected?.displayImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={selected?.city}
              style={{
                height: 120,
                width: 120,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: "transparent",
                margin: 10,
              }}
            ></img>
          ))}
        </div>
        <div style={{ display: "flex", margin: 10 }}>
          <span
            style={{
              fontWeight: "bold",
              flex: 1,
            }}
          >
            Memories
          </span>
        </div>
        <div
          style={{
            display: "flex",
            margin: 10,
            flexWrap: "wrap",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          {selected?.memories.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={selected?.city}
              style={{
                height: 120,
                width: 120,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: "transparent",
                margin: 10,
              }}
            ></img>
          ))}
        </div>
        <div style={{ display: "flex", margin: 10 }}>
          <span
            style={{
              fontWeight: "bold",
              flex: 1,
            }}
          >
            Basic Package
          </span>
          <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
            <p style={{ flex: 1 }}>
              Number of Photos: {basicPackageData?.numberOfPhotos} Edited Photos
            </p>
            <p style={{ flex: 1 }}>
              Basic Price:
              {formatter.format(basicPackageData?.price)}
            </p>
          </div>
        </div>
        <div style={{ display: "flex", margin: 10 }}>
          <span
            style={{
              fontWeight: "bold",
              flex: 1,
            }}
          >
            Perfect Destination For
          </span>
          <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
            <CategoriesDataChip destination={destination} db={db} />
          </div>
        </div>
        <div style={{ display: "flex", margin: 10 }}>
          <span
            style={{
              fontWeight: "bold",
              flex: 1,
            }}
          >
            Type
          </span>
          <span style={{ flex: 1 }}>{selected.type}</span>
        </div>
        <div style={{ display: "flex", margin: 10 }}>
          <span
            style={{
              fontWeight: "bold",
              flex: 1,
            }}
          >
            Popular
          </span>
          <span style={{ flex: 1 }}>{selected.isPopular ? "Yes" : "No"}</span>
        </div>
        <div style={{ display: "flex", margin: 10 }}>
          <span
            style={{
              fontWeight: "bold",
              flex: 1,
            }}
          >
            Recommended
          </span>
          <span style={{ flex: 1 }}>
            {selected.isRecommended ? "Yes" : "No"}
          </span>
        </div>
      </Paper>
    )
  ) : (
    <h1>nothing is Selected</h1>
  );
}

export default withFirebase(withUser(DestinationDetails));

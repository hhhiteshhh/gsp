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
import Stack from "@mui/material/Stack";
import countryData from "../components/data/countryData";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import AddIcon from "../images/addImageIcon.png";
function DestinationDetails({
  db,
  destination,
  packageData,
  categoriesData,
  storage,
}) {
  const [selected, setSelected] = React.useState(null);
  const [editPage, setEditPage] = React.useState(false);
  const [basicPackageData, setBasicPackageData] = React.useState(null);
  const [oldCategories, setOldCategories] = React.useState(null);
  const [newCity, setNewCity] = React.useState(null);
  const [newCountry, setNewCountry] = React.useState(null);
  const [countryIndex, setCountryIndex] = React.useState(null);
  const [newDescription, setNewDescription] = React.useState(null);
  const [newCategories, setNewCategories] = React.useState([]);
  const [newPackage, setNewPackage] = React.useState(null);
  const [value, setValue] = React.useState("");
  const [popular, setPopluar] = React.useState(false);
  const [recommended, setRecommended] = React.useState(false);
  const [newAvatarImage, setNewAvatarImage] = React.useState(null);
  const [newDisplayImages, setNewDisplayImages] = React.useState(null);
  const [newMemoriesImages, setNewMemoriesImages] = React.useState(null);
  const [newImage, setNewImage] = React.useState(false);
  useEffect(() => {
    packageData.sort((a, b) =>
      a.numberOfPhotos > b.numberOfPhotos
        ? 1
        : b.numberOfPhotos > a.numberOfPhotos
        ? -1
        : 0
    );
    setSelected(destination);
    setEditPage(false);
    setNewCountry(null);
    setNewCity(null);
    setNewDescription(null);
    setNewPackage(null);
    setNewCategories(null);
  }, [destination]);
  useEffect(() => {
    if (selected) {
      db.collection("packages")
        .doc(selected?.basicPackage)
        .onSnapshot((obj) => {
          const data = obj.data();
          setBasicPackageData(data);
          setNewPackage(data);
        });
      //   .get()
      //   .then((doc) => {});
      let newArray = [];
      selected?.categories?.map((id) => {
        db.collection("categories")
          .doc(id)
          .onSnapshot((obj) => {
            newArray.push(obj.data());
          });
        // .get()
        // .then((doc) => {});
      });

      // setOldCategories(newArray);
      setNewCategories(newArray);
      setOldCategories(newArray);
      setPopluar(selected?.isPopular);
      setRecommended(selected?.isRecommended);
      setNewAvatarImage(selected?.displayPictureUrl);
      setNewDisplayImages(selected?.displayImages);
      setNewMemoriesImages(selected?.memories);
      setNewCountry(selected?.country);
      setNewCity(selected?.city);
      setValue(selected?.type);
      setNewDescription(selected?.description);
    }
  }, [destination, selected]);

  const handlePageClose = () => {
    setSelected(null);
  };
  const handlePageEdit = () => {
    setEditPage(true);
  };
  const handleClosePageEdit = () => {
    setSelected(destination);
    setEditPage(false);
    setNewCountry(null);
    setNewCity(null);
    setNewDescription(null);
    setNewPackage(null);
    setNewCategories(oldCategories);
    setPopluar(selected?.isPopular);
    setRecommended(selected?.isRecommended);
    // setNewAvatarImage(null);
    // setNewDisplayImages(null);
    // setNewMemoriesImages(null);
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

  const handleChangeType = (event) => {
    setValue(event.target.value);
  };
  const handleChangePopular = (event) => {
    setPopluar(event.target.checked);
  };
  const handleChangeRecommended = (event) => {
    setRecommended(event.target.checked);
  };
  //   console.log(packageData);
  const handleDelete = (e, i) => {
    e.preventDefault();
    let temp = [...newCategories];
    temp.splice(i, 1);
    setNewCategories(temp);
  };
  const handleChangeAvatarImage = (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`not an image, the file is a ${typeof image}`);
      return;
    }
    setNewAvatarImage(image);
    setNewImage(true);
  };
  const handleChangeDisplayImages = (e) => {
    e.preventDefault();
    let temp = [...newDisplayImages];
    temp.push(...e.target.files);
    setNewDisplayImages(temp);
  };
  const handleChangeMemoriesImages = (e) => {
    e.preventDefault();
    let temp = [...newMemoriesImages];
    temp.push(...e.target.files);
    setNewMemoriesImages(temp);
  };
  const handleDeleteDisplayImages = (e, i) => {
    e.preventDefault();
    let temp = [...newDisplayImages];
    temp.splice(i, 1);
    setNewDisplayImages(temp);
  };
  const handleDeleteMemoriesImages = (e, i) => {
    e.preventDefault();
    let temp = [...newMemoriesImages];
    temp.splice(i, 1);
    setNewMemoriesImages(temp);
  };
  const handleEditChanges = (e) => {
    e.preventDefault();
    console.log(newMemoriesImages);
    console.log(newDisplayImages);
    console.log(newAvatarImage);
    console.log(newCountry);
    console.log(newCity);
    console.log(newCategories);
    console.log(newPackage);
    console.log(newDescription);
    console.log(popular);
    console.log(recommended);
    console.log(value);
  };
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
              cursor: "pointer",
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
        <FormControl
          style={{
            marginTop: 10,
            marginBottom: 1,
            minWidth: 150,
          }}
        >
          <InputLabel>Country</InputLabel>
          <Select
            value={newCountry}
            input={<Input />}
            onChange={(e) => selectCountry(e.target.value)}
            renderValue={(group) => {
              return <p style={{ textTransform: "capitalize" }}>{group}</p>;
            }}
          >
            {countryData.map((country, index) => (
              <MenuItem
                key={index}
                value={country.countryName}
                onClick={() => {
                  setCountryIndex(index);
                }}
              >
                {country.countryName}
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
            value={newCity}
            input={<Input />}
            onChange={(e) => {
              //   console.log(e);
              selectCity(e.target.value);
            }}
            renderValue={(group) => {
              //   console.log(group);
              return <p style={{ textTransform: "capitalize" }}>{group}</p>;
            }}
          >
            {countryData[countryIndex]?.regions?.map((city, index) => (
              <MenuItem key={`${index}${city}`} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          multiline
          rows={4}
          label="Description"
          variant="outlined"
          style={{ marginTop: 30 }}
          defaultValue={selected.description || newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        ></TextField>
        <Typography
          variant="body2"
          color={"textSecondary"}
          style={{ marginTop: 10, marginBottom: 10 }}
        >
          Avatar Image
        </Typography>
        {newAvatarImage && (
          <div
            style={{
              position: "relative",
              flexDirection: "column",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <img
              src={
                newImage ? URL.createObjectURL(newAvatarImage) : newAvatarImage
              }
              alt={"avatar Image"}
              loading="lazy"
              style={{
                width: 120,
                height: 120,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "transparent",
              }}
            />

            <input
              type="file"
              alt="Choose File"
              accept="image/*"
              name="file"
              id="image"
              style={{ margin: 10 }}
              onChange={handleChangeAvatarImage}
            />
          </div>
        )}
        <Typography
          variant="body2"
          color={"textSecondary"}
          style={{ marginTop: 10, marginBottom: 10 }}
        >
          Display Images
        </Typography>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <label htmlFor="file">
              <div
                style={{
                  backgroundColor: "#dadada",
                  width: 125,
                  height: 125,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "transparent",
                  margin: 5,
                  cursor: "pointer",
                }}
              >
                <img
                  // key={index}
                  src={AddIcon}
                  alt=""
                  loading="lazy"
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "transparent",
                    margin: 5,
                  }}
                />
              </div>
            </label>
            {newDisplayImages.map((image, index) => {
              return (
                <div style={{ position: "relative" }} key={index}>
                  {typeof image === "string" ? (
                    <>
                      <img
                        key={index}
                        src={image}
                        alt=""
                        loading="lazy"
                        style={{
                          width: 120,
                          height: 120,
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: "transparent",
                          margin: 5,
                        }}
                      />
                      <CloseOutlined
                        onClick={(e) => {
                          handleDeleteDisplayImages(e, index);
                        }}
                        style={{
                          color: "#ffffff",
                          position: "absolute",
                          left: 95,
                          top: 10,
                          cursor: "pointer",
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <img
                        key={index}
                        src={URL.createObjectURL(image)}
                        alt=""
                        loading="lazy"
                        style={{
                          width: 120,
                          height: 120,
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: "transparent",
                          margin: 5,
                        }}
                      />
                      <CloseOutlined
                        onClick={(e) => {
                          handleDeleteDisplayImages(e, index);
                        }}
                        style={{
                          color: "#ffffff",
                          position: "absolute",
                          left: 95,
                          top: 10,
                          cursor: "pointer",
                        }}
                      />
                    </>
                  )}
                </div>
              );
            })}
          </div>
          <input
            multiple
            type="file"
            accept="image/*"
            name="image"
            id="file"
            style={{ margin: 10, display: "none" }}
            onChange={(e, i) => handleChangeDisplayImages(e)}
          />
        </div>

        <Typography
          variant="body2"
          color={"textSecondary"}
          style={{ marginTop: 10, marginBottom: 10 }}
        >
          Memories
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <label htmlFor="files">
            <div
              style={{
                backgroundColor: "#dadada",
                width: 125,
                height: 125,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "transparent",
                margin: 5,
                cursor: "pointer",
              }}
            >
              <img
                // key={index}
                src={AddIcon}
                alt=""
                loading="lazy"
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "transparent",
                  margin: 5,
                }}
              />
            </div>
          </label>

          {newMemoriesImages.map((memory, index) => {
            return (
              <div style={{ position: "relative" }} key={index}>
                {typeof memory === "string" ? (
                  <>
                    <img
                      key={memory}
                      src={memory}
                      alt=""
                      loading="lazy"
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: "transparent",
                        margin: 5,
                      }}
                    />
                    <CloseOutlined
                      onClick={(e) => {
                        handleDeleteMemoriesImages(e, index);
                      }}
                      style={{
                        color: "#ffffff",
                        position: "absolute",
                        left: 95,
                        top: 10,
                        cursor: "pointer",
                      }}
                    />
                  </>
                ) : (
                  <>
                    <img
                      key={index}
                      src={URL.createObjectURL(memory)}
                      alt=""
                      loading="lazy"
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: "transparent",
                        margin: 5,
                      }}
                    />
                    <CloseOutlined
                      onClick={(e) => {
                        handleDeleteMemoriesImages(e, index);
                      }}
                      style={{
                        color: "#ffffff",
                        position: "absolute",
                        left: 95,
                        top: 10,
                        cursor: "pointer",
                      }}
                    />
                  </>
                )}
              </div>
            );
          })}
          <input
            multiple
            type="file"
            accept="image/*"
            name="image"
            id="files"
            style={{ margin: 10, display: "none" }}
            onChange={(e, i) => handleChangeMemoriesImages(e)}
          />
        </div>

        <FormControl
          style={{
            marginTop: 10,
            marginBottom: 1,
            minWidth: 150,
          }}
        >
          <InputLabel>Popular Destination For</InputLabel>
          <Select
            multiple
            value={newCategories}
            input={<Input />}
            onChange={(e) => {
              //   console.log(e);
              setNewCategories(e.target.value);
            }}
            renderValue={(group) => {
              console.log({ group });
              return (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  {group?.map((category, i) => (
                    <Chip
                      key={category.categoryName}
                      label={category.categoryName}
                      style={{ margin: 2 }}
                      onDelete={(e) => {
                        handleDelete(e, i);
                        //   this.handleDelete("ageGroup", e, i);
                      }}
                      onMouseDown={(event) => {
                        event.stopPropagation();
                      }}
                    />
                  ))}
                </div>
              );
            }}
          >
            {categoriesData.map((category) => (
              <MenuItem key={category.uid} value={category}>
                {category.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          style={{
            marginTop: 20,
            marginBottom: 1,
            minWidth: 150,
          }}
        >
          <InputLabel>Basic Package</InputLabel>
          <Select
            value={`${newPackage?.numberOfPhotos} photos`}
            input={<Input />}
            onChange={(e) => setNewPackage(e.target.value)}
            renderValue={(group) => {
              //   console.log(group);
              return <p style={{ textTransform: "capitalize" }}>{group}</p>;
            }}
          >
            {packageData.map((customPackage, index) => (
              <MenuItem
                key={index}
                value={customPackage}
                onClick={() => {
                  //   setCountryIndex(index);
                  setNewPackage(customPackage.uid);
                }}
              >
                {customPackage.numberOfPhotos} photos Price:
                {formatter.format(customPackage.price)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          component="fieldset"
          variant="standard"
          style={{ marginRight: "auto" }}
        >
          <FormControlLabel
            control={
              <Switch
                color="primary"
                checked={popular}
                onChange={handleChangePopular}
              />
            }
            label="Popular"
            labelPlacement="start"
            style={{ marginRight: "auto", marginLeft: 0 }}
          />
          <FormControlLabel
            control={
              <Switch
                color="primary"
                checked={recommended}
                onChange={handleChangeRecommended}
              />
            }
            label="Recommended"
            labelPlacement="start"
            style={{ marginRight: "auto", marginLeft: 0 }}
          />
        </FormControl>
        <FormControl component="fieldset">
          <FormLabel component="legend">Type</FormLabel>
          <RadioGroup
            aria-label="type"
            defaultValue="Available"
            value={value}
            onChange={handleChangeType}
            name="controlled-radio-buttons-group"
          >
            <FormControlLabel
              value="Available"
              control={<Radio />}
              label="Available"
            />
            <FormControlLabel
              value="NotAvailable"
              control={<Radio />}
              label="Not Available"
            />
          </RadioGroup>
        </FormControl>
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
              onClick={(e) => handleEditChanges(e)}
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
              loading="lazy"
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
              loading="lazy"
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
              loading="lazy"
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
            <CategoriesDataChip
              destination={destination}
              db={db}
              editPage={editPage}
            />

            <Stack direction="row" spacing={1}>
              {oldCategories?.map((item, index) => (
                <Chip label={item.categoryName} key={index} />
              ))}
            </Stack>
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

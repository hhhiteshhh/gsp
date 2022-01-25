import React, { useState, useEffect } from "react";
import { withFirebase } from "../firebase";
import withUser from "../hoc/withUser";
import Paper from "@material-ui/core/Paper";
import Edit from "@material-ui/icons/Edit";
import CloseOutlined from "@material-ui/icons/CloseOutlined";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Avatar } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import AddIcon from "../images/addImageIcon.png";
import firebase from "firebase";
import Switch from "@mui/material/Switch";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function StoriesDetails({
  story,
  newStory,
  handleCloseAddNew,
  props,
  currentTab,
  openSnackBarFunction,
  db,
  storage,
  user,
}) {
  const [selected, setSelected] = useState(null);
  const [editPage, setEditPage] = useState(false);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [stories, setStories] = useState([]);
  const [publishedDialog, setPublishedDialog] = useState(false);

  useEffect(() => {
    setSelected(null);
    setEditPage(false);
  }, [currentTab]);
  useEffect(() => {
    setSelected(story);
  }, [story]);
  useEffect(() => {
    if (selected) {
      setTitle(selected.title);
      setStatus(selected.status);
      setThumbnail(selected.thumbnail);
      setStories(selected.stories);
    }
  }, [story, selected]);
  useEffect(() => {
    if (newStory) {
      setSelected(null);
      setTitle("");
      setStatus("");
      setThumbnail("");
      setStories([]);
    }
  }, [newStory]);
  const handleClosePageEdit = () => {
    setSelected(story);
    setEditPage(false);
  };
  const handlePageEdit = () => {
    setEditPage(true);
  };
  const handlePageClose = () => {
    setSelected(null);
    props.history.replace("/stories");
  };
  const handleClosePageNew = (e) => {
    e.preventDefault();
    setSelected(null);
    handleCloseAddNew();
    props.history.replace("/stories");
  };
  const handleChangeStatus = (event, uid) => {
    event.preventDefault();
    handleDialogClose();
    if (status === "published") {
      setStatus("unpublished");
      db.collection("stories").doc(uid).update({
        status: "unpublished",
      });
    } else {
      setStatus("published");
      db.collection("stories").doc(uid).update({
        status: "published",
      });
    }
    setSelected(null);
    props.history.replace("/stories");
  };
  const handleDialogClose = () => {
    setPublishedDialog(false);
  };
  const handleChangeThumbnailImage = (e) => {
    const image = e.target.files[0];
    if (image === "" || image === undefined) {
      alert(`not an image, the file is a ${typeof image}`);
      setThumbnail(selected?.thumbnail);
      return;
    }
    setThumbnail(image);
  };
  const handleDeleteStories = (e, i) => {
    e.preventDefault();
    let temp = [...stories];
    temp.splice(i, 1);
    setStories(temp);
  };
  const handleChangeStories = (e) => {
    e.preventDefault();
    let temp = [...stories];
    temp.push(...e.target.files);
    setStories(temp);
  };
  const handleEditChanges = (e) => {
    e.preventDefault();
    db.collection("stories")
      .doc(selected?.uid)
      .update({
        status: status ? status : "saved",
        title: title,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedBy: user?.email,
      });
    if (typeof thumbnail !== "string") {
      const upload = storage
        .ref(`stories/${title}/thumbnail/${thumbnail.name}`)
        .put(thumbnail);
      upload.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (error) => {
          alert(error.message);
        },
        () => {
          storage
            .ref(`stories/${title}/thumbnail`)
            .child(thumbnail.name)
            .getDownloadURL()
            .then((url) => {
              db.collection("stories").doc(selected?.uid).update({
                thumbnail: url,
              });
            });
        }
      );
    }
    let storiesUrl = [];
    stories.map((image) => {
      if (!image.url) {
        const upload = storage
          .ref(`stories/${title}/stories/${image.name}`)
          .put(image);
        upload.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
          },
          (error) => {
            alert(error.message);
          },
          () => {
            storage
              .ref(`stories/${title}/stories`)
              .child(image.name)
              .getDownloadURL()
              .then((url) => {
                storiesUrl.push({ type: "image", url: url });
                db.collection("stories").doc(selected?.uid).update({
                  stories: storiesUrl,
                });
              });
          }
        );
      } else {
        storiesUrl.push(image);
        db.collection("stories").doc(selected?.uid).update({
          stories: storiesUrl,
        });
      }
    });
    openSnackBarFunction("Edited Successfully");
    setEditPage(false);
    setSelected(story);
  };
  const handleAddStory = (e) => {
    e.preventDefault();
    if (!title || !thumbnail || !stories.length > 0 || status === "") {
      openSnackBarFunction("All fields mandatory");
    } else {
      db.collection("stories")
        .add({
          status: status ? status : "saved",
          title: title,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          createdBy: user?.email,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedBy: user?.email,
        })
        .then((docRef) => {
          db.collection("stories").doc(docRef.id).update({
            uid: docRef.id,
          });
          if (typeof thumbnail !== "string") {
            const upload = storage
              .ref(`stories/${title}/thumbnail/${thumbnail.name}`)
              .put(thumbnail);
            upload.on(
              "state_changed",
              (snapshot) => {
                const progress = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
              },
              (error) => {
                alert(error.message);
              },
              () => {
                storage
                  .ref(`stories/${title}/thumbnail`)
                  .child(thumbnail.name)
                  .getDownloadURL()
                  .then((url) => {
                    db.collection("stories").doc(docRef.id).update({
                      thumbnail: url,
                    });
                  });
              }
            );
          }
          let storiesUrl = [];
          stories.map((image) => {
            if (typeof image !== "string") {
              const upload = storage
                .ref(`stories/${title}/stories/${image.name}`)
                .put(image);
              upload.on(
                "state_changed",
                (snapshot) => {
                  const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  );
                },
                (error) => {
                  alert(error.message);
                },
                () => {
                  storage
                    .ref(`stories/${title}/stories`)
                    .child(image.name)
                    .getDownloadURL()
                    .then((url) => {
                      storiesUrl.push({ type: "image", url: url });
                      db.collection("stories").doc(docRef.id).update({
                        stories: storiesUrl,
                      });
                    });
                }
              );
            }
          });
        });
      openSnackBarFunction("Added Successfully");
      handleClosePageNew(e);
    }
  };
  const handleSaveStory = (e) => {
    e.preventDefault();
    if (title) {
      db.collection("stories")
        .add({
          status: "saved",
          title: title ? title : "",
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          createdBy: user?.email,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedBy: user?.email,
          stories: [],
          thumbnail: "",
        })
        .then((docRef) => {
          db.collection("stories").doc(docRef.id).update({
            uid: docRef.id,
          });
          if (typeof thumbnail !== "string") {
            const upload = storage
              .ref(`stories/${title}/thumbnail/${thumbnail.name}`)
              .put(thumbnail);
            upload.on(
              "state_changed",
              (snapshot) => {
                const progress = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
              },
              (error) => {
                alert(error.message);
              },
              () => {
                storage
                  .ref(`stories/${title}/thumbnail`)
                  .child(thumbnail.name)
                  .getDownloadURL()
                  .then((url) => {
                    db.collection("stories").doc(docRef.id).update({
                      thumbnail: url,
                    });
                  });
              }
            );
            console.log("uploaded");
          }
          let storiesUrl = [];
          stories.map((image) => {
            if (typeof image !== "string") {
              const upload = storage
                .ref(`stories/${title}/stories${image.name}`)
                .put(image);
              upload.on(
                "state_changed",
                (snapshot) => {
                  const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  );
                },
                (error) => {
                  alert(error.message);
                },
                () => {
                  storage
                    .ref(`stories/${title}/stories`)
                    .child(image.name)
                    .getDownloadURL()
                    .then((url) => {
                      storiesUrl.push({ type: "image", url: url });
                      db.collection("stories").doc(docRef.id).update({
                        stories: storiesUrl,
                      });
                    });
                }
              );
            }
          });
        });
      openSnackBarFunction("Added Successfully");
      handleClosePageNew(e);
    } else {
      openSnackBarFunction("Please enter title ");
    }
  };
  const handlePublishedDialog = (e) => {
    e.preventDefault();
    setPublishedDialog(true);
  };
  return selected ? (
    editPage ? (
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
            <h2>Edit Story</h2>
          </div>
        </div>
        <TextField
          label="Title"
          variant="outlined"
          style={{ marginTop: 30 }}
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
        ></TextField>
        <Typography
          variant="body2"
          color={"textSecondary"}
          style={{ marginTop: 10, marginBottom: 10 }}
        >
          Avatar Image
        </Typography>
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
              typeof thumbnail === "string"
                ? thumbnail
                : URL.createObjectURL(thumbnail)
            }
            alt={"thumbnail Image"}
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
            onChange={handleChangeThumbnailImage}
          />
        </div>
        <Typography
          variant="body2"
          color={"textSecondary"}
          style={{ marginTop: 10, marginBottom: 10 }}
        >
          Stories
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
            {stories.map((image, index) => {
              return (
                <div style={{ position: "relative" }} key={index}>
                  {typeof image.url === "string" ? (
                    <>
                      <img
                        key={index}
                        src={image.url}
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
                          handleDeleteStories(e, index);
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
                          handleDeleteStories(e, index);
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
            onChange={(e, i) => handleChangeStories(e)}
          />
        </div>
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
            <Button color="primary" onClick={(e) => handleClosePageEdit()}>
              Cancel
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
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
            <CloseOutlined onClick={handlePageClose} />
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
            <h2>{story?.title}</h2>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              height: "100%",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <FormControlLabel
              value="start"
              control={
                <Switch
                  color="primary"
                  checked={status === "published" ? true : false}
                  onChange={handlePublishedDialog}
                />
              }
              label="Published"
              labelPlacement="start"
            />

            <Button
              variant="contained"
              color="primary"
              startIcon={<Edit />}
              onClick={(e) => handlePageEdit(e)}
              style={{ marginLeft: 10 }}
            >
              Edit
            </Button>
          </div>
        </div>
        <div style={{ display: "flex", margin: 10 }}>
          <span
            style={{
              fontWeight: "bold",
              flex: 1,
            }}
          >
            Title
          </span>
          <span style={{ flex: 1, textTransform: "capitalize" }}>
            {selected.title}
          </span>
        </div>
        <div style={{ display: "flex", margin: 10 }}>
          <span
            style={{
              fontWeight: "bold",
              flex: 1,
            }}
          >
            Status{" "}
          </span>
          <span style={{ flex: 1, textTransform: "capitalize" }}>
            {selected.status}
          </span>
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
              src={selected?.thumbnail}
              alt={selected?.title}
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
            Stories{" "}
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
          {selected?.stories?.map((image, index) => (
            <img
              key={index}
              src={image.url}
              loading="lazy"
              alt={index + 1}
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
        <Dialog open={publishedDialog} onClose={handleDialogClose}>
          <DialogTitle>{"Story"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to{" "}
              {status === "published" ? "unpublish" : "publish"} this story?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              No
            </Button>
            <Button
              onClick={(e) => handleChangeStatus(e, selected?.uid)}
              color="primary"
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    )
  ) : newStory ? (
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
          <CloseOutlined onClick={handleClosePageNew} />
        </div>
        <div
          style={{
            flex: 9,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>New Story</h2>
        </div>
      </div>
      <TextField
        label="Title"
        variant="outlined"
        style={{ marginTop: 30 }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></TextField>
      <Typography
        variant="body2"
        color={"textSecondary"}
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        Avatar Image
      </Typography>
      <div
        style={{
          position: "relative",
          flexDirection: "column",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        {thumbnail && (
          <img
            src={URL.createObjectURL(thumbnail)}
            alt={"thumbnail Image"}
            loading="lazy"
            style={{
              width: 120,
              height: 120,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "transparent",
            }}
          />
        )}
        <input
          type="file"
          alt="Choose File"
          accept="image/*"
          name="file"
          id="image"
          style={{ margin: 10 }}
          onChange={handleChangeThumbnailImage}
        />
      </div>
      <Typography
        variant="body2"
        color={"textSecondary"}
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        Stories
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
          {stories?.map((image, index) => {
            return (
              <div style={{ position: "relative" }} key={index}>
                {typeof image?.url === "string" ? (
                  <>
                    <img
                      key={index}
                      src={image?.url}
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
                        handleDeleteStories(e, index);
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
                        handleDeleteStories(e, index);
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
          onChange={(e, i) => handleChangeStories(e)}
        />
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <div style={{ marginRight: 10 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={(e) => {
              handleSaveStory(e);
            }}
          >
            Save
          </Button>
        </div>

        <div style={{ marginRight: 10 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              handleAddStory(e);
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </Paper>
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
  );
}

export default withFirebase(withUser(StoriesDetails));

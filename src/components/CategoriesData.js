import React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

function CategoriesData({ db, destination, editPage }) {
  const [perfectDestinationFor, setPerfectDestinationFor] = React.useState();

  React.useEffect(() => {
    let newArray = [];
    destination?.categories.map((id) => {
      db.collection("categories")
        .doc(id)
        .get()
        .then((doc) => {
          newArray.push(doc.data().categoryName);
        });
    });
    setPerfectDestinationFor(newArray);
  }, [destination, editPage]);
  return (
    <Stack direction="row" spacing={1}>
      {perfectDestinationFor?.map((item, index) => (
        <Chip label={item} key={index} />
      ))}
    </Stack>
  );
}

export default CategoriesData;

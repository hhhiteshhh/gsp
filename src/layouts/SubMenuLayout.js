import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import SubMenuList from "../components/layoutComponents/SubMenuList";

const styles = {
  container: isMobile => ({
    height: isMobile ? 0 : window.innerHeight - 64,
    width: isMobile ? "100%" : 270,
    marginTop: isMobile ? 0 : 64,
    position: "relative"
  }),
  fab: { position: "absolute", bottom: 16, right: 16 }
};

function SubMenuLayout(props) {
  const fabHandler =  e => {
    e.preventDefault();
    if (props.setOpen) props.setOpen(false);
    props.fabClickHandler();
  }
  
  return (
    <div style={styles.container(props.isMobile)}>
      <SubMenuList {...props} />
      {props.tabs && props.fabClickHandler && (
        <Fab
          style={styles.fab}
          color="primary"
          aria-label="add"
          size="medium"
          onClick={fabHandler}
        >
          <AddIcon />
        </Fab>
      )}
    </div>
  );
}

export default SubMenuLayout;

import React, { PropTypes } from "react";

import NavigationMoreVert from "material-ui/svg-icons/navigation/more-vert";
import IconButton from "material-ui/IconButton";

const AppbarRightControlMobile = ({ handleDrawerToggle }) => {
  return (
    <IconButton onClick={handleDrawerToggle}>
      <NavigationMoreVert color="white" />
    </IconButton>
  );
};

AppbarRightControlMobile.propTypes = {};

export default AppbarRightControlMobile;

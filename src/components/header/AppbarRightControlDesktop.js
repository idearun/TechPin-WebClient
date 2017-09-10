/* eslint react/prop-types: 0 */
import React, { PropTypes } from "react";
import { browserHistory } from "react-router";
import FlatButton from "material-ui/FlatButton";

const AppbarRightControlDesktop = ({
  authenticated,
  openModal,
  LogOut,
  handleDrawerToggle
}) => {
  return (
    <div>
      <FlatButton
        label={authenticated ? "logout" : "login"}
        onClick={() => {
          if (!authenticated) {
            openModal();
          } else {
            LogOut();
          }
        }}
      />
      <FlatButton
        label="All Products / Companies"
        onTouchTap={() => browserHistory.push("/all-entries")}
      />
      <FlatButton
        label="categories / markets"
        onTouchTap={handleDrawerToggle}
      />
      <FlatButton
        label="Blog"
        href="http://blog.techpin.ir"
        target="_blank"
        style={{ color: "white" }}
      />
    </div>
  );
};

AppbarRightControlDesktop.propTypes = {};

export default AppbarRightControlDesktop;

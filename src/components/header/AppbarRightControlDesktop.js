/* eslint react/prop-types: 0 */
import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';
import FlatButton from 'material-ui/FlatButton';

const AppbarRightControlDesktop = ({authenticated, openModal, LogOut, handleDrawerToggle}) => {
  return (
    <div>
      <FlatButton
        label={authenticated ? 'logout' : 'login'}
        onClick={() => {
            if(!authenticated) {
              openModal()
            }
            else {
              LogOut();
            }
          }}
      />
      <FlatButton
        label="categories"
        onTouchTap={handleDrawerToggle}
      />
      <FlatButton
        label="A~Z"
        onTouchTap={() => browserHistory.push('/all-entries')}
      />
    </div>
  );
}

AppbarRightControlDesktop.propTypes = {
};

export default AppbarRightControlDesktop

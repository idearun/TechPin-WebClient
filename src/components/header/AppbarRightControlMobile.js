import React, {PropTypes} from 'react';

import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';

const AppbarRightControlMobile = ({handleDrawerToggle}) => {
  return (
    <IconButton><NavigationMoreVert color='white' onClick={handleDrawerToggle}/></IconButton>
  );
}

AppbarRightControlMobile.propTypes = {
};

export default AppbarRightControlMobile

import React, {PropTypes} from 'react';

import ContentSort from 'material-ui/svg-icons/content/sort';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

const SortingMenu = ({onChange}) => {
  return (
    <IconMenu
      className='sort-menu'
      iconButtonElement={
        <IconButton tooltip='change sorting' tooltipPosition="top-center">
        <ContentSort color='#888'/>
      </IconButton>}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      onChange={onChange}
    >
      <MenuItem value={`name`} primaryText="Sort by Name" />
      <MenuItem value={`rating`} primaryText="Sort by Rate" />
      <MenuItem value={`nps`} primaryText="Sort by N.P.S" />
    </IconMenu>
  );
}

SortingMenu.propTypes = {
};

export default SortingMenu;

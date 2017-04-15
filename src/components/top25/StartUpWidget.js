import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {baseUrl} from '../../api/realApi';

import StarRating from '../sharedComponents/StarRating';

import {ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

const StartUpWidget = ({product, i}) => {
  const {name_en, average_p_rate, details, slug} = product;

  const styles = {
    logo: {
      width: 85,
    },
    container: {
      backgroundColor: 'white',
    },
  }
  const generateShortDesc = (desc) => {
    if (desc.length === 0) {
      return 'No descriptions yet. be the first one to add descriptions to this product !'
    } else {
      let shortDesc = desc.split(" ").splice(0, 10).join(" ")
      if (shortDesc.split(' ').length < 10) return shortDesc;
      return `${shortDesc} ...`
    }
  }
  return (
    <div style={styles.container}>
      <Link to={`${slug}`}>
        <ListItem
          className='widget'
          secondaryTextLines={2}
          leftAvatar={<img src={baseUrl + details.logo} alt='logo' style={styles.logo} />}
          primaryText={null}
          secondaryText={null}>
            <div className='widget-title'>{name_en}</div>
            <div className='widget-text'>{generateShortDesc(details.description_en)}</div>
            <StarRating rating={average_p_rate} />
        </ListItem>
        {i < 24 ? <Divider inset={true} /> : ''}
      </Link>
    </div>
  );
};

StartUpWidget.propTypes = {
};

export default StartUpWidget;

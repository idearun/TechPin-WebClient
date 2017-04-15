import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import {baseUrl} from '../../api/realApi';
import Paper from 'material-ui/Paper';
import StarRating from './StarRating'

const styles = {
  paper: {
    height: '350px',
    width: '250px',
    padding: '30px 20px',
  },
  img: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
  }
};
const CategoryPaper = ({product, WrapperClassName}) => {
  return (
    <Link to={`/${product.slug}`}>
      <Paper style={styles.paper} className={`category-paper ${WrapperClassName}`}>
          <div
            className="category-image"
            style={{backgroundImage: `url(${baseUrl}${product.details.logo})`}}>
          </div>
          <span><h3>{product.name_en}</h3></span>
          <div className="category-info-box">
            {product.details.city && <div>{`${product.details.city}, ${product.details.country}`}</div>}
            {product.details.year && <div>{`Founded in ${product.details.year}`}</div>}
            <StarRating rating={product.ranking} editAble={false} className='star-paper'/>
          </div>
          <div id='paper-short-desc'>
            {product.details.summary.split(' ').splice(0, 10).join(' ')}
          </div>
      </Paper>
    </Link>
  );
}

CategoryPaper.propTypes = {
};

export default CategoryPaper;

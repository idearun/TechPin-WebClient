import React from 'react'
import { Link } from 'react-router'

import { baseApiUrl } from '../../api/realApi'
import Paper from 'material-ui/Paper'

const styles = {
  paper: {
    width: '150px',
    minHeight: '150px',
    padding: '10px 10px'
  }
}

const CategoryPaper = ({ product, WrapperClassName }) => {
  return (
    <Link to={`/${product.slug}`}>
      <Paper style={styles.paper} className={`category-paper ${WrapperClassName}`}>
        <div
          className="category-image"
          style={{ backgroundImage: `url(${baseApiUrl}${product.details.logo})` }}
        />
        <span style={{ marginTop: 10, maxWidth: '100%' }}>
          <h3
            style={{
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden'
            }}
          >
            {product.name_en}
          </h3>
        </span>
        {/* <div className="category-info-box">
            {product.details.city && <div>{`${product.details.city}, ${product.details.country}`}</div>}
            {product.details.year && <div>{`Founded in ${product.details.year}`}</div>}
            <StarRating rating={product.ranking} editAble={false} className='star-paper'/>
          </div>
          <div id='paper-short-desc'>
            {product.details.summary.split(' ').splice(0, 10).join(' ')}
          </div> */}
      </Paper>
    </Link>
  )
}

export default CategoryPaper

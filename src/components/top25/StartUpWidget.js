import React from 'react'
import { Link } from 'react-router'
import { baseApiUrl } from '../../api/realApi'
import LazyLoad from 'react-lazy-load'
import StarRating from '../sharedComponents/StarRating'
import Divider from 'material-ui/Divider'

const styles = {
  logo: {
    width: 85
  },
  container: {
    backgroundColor: 'white'
  }
}

const generateShortDesc = desc => {
  if (desc.length === 0) {
    return 'No descriptions yet. be the first one to add descriptions to this product !'
  } else {
    let shortDesc = desc
      .split(' ')
      .splice(0, 10)
      .join(' ')
    if (shortDesc.split(' ').length < 10) return shortDesc
    return `${shortDesc} ...`
  }
}

const LzLoImage = ({ img }) => (
  <LazyLoad width={85} offsetVertical={300}>
    <img src={img} style={styles.logo} alt="" />
  </LazyLoad>
)

const StartUpWidget = ({ product, i }) => {
  const { name_en, average_p_rate, details, slug, categories } = product
  const is100MillionPlus = categories.indexOf('100m') !== -1
  return details ? (
    <div
      style={styles.container}
      className={is100MillionPlus ? 'plus-100-million' : ''}
    >
      <Link to={`${slug}`}>
        {is100MillionPlus && <span className="ribbon">$100 M+</span>}
        <div className="widget">
          <LzLoImage img={baseApiUrl + details.logo} />
          <div>
            <div className="widget-title">{name_en}</div>
            <div className="widget-text">
              {generateShortDesc(details.description_en)}
            </div>
            <StarRating rating={average_p_rate} />
          </div>
        </div>

        {i < 24 ? <Divider inset={true} /> : ''}
      </Link>
    </div>
  ) : null
}

export default StartUpWidget

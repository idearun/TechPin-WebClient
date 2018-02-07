import React from 'react'
import { baseApiUrl } from '../../api/realApi'
import Skeleton from 'react-loading-skeleton'
import ContentLink from 'material-ui/svg-icons/content/link'
import NoLogoImage from '../../../images/nologo.png'

const isNotEmptyObject = object => {
  if (typeof object !== 'object' || Array.isArray(object)) {
    return false
  } else {
    return Object.keys(object).length > 0
  }
}

export default class StartupWidgetMoreInfo extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      product: {
        details: {}
      }
    }
  }

  componentDidMount = () => {
    if (isNotEmptyObject(this.props.product.details)) {
      this.setState({ product: this.props.product, loading: false })
    }
  }

  componentWillReceiveProps = nextProps => {
    if (isNotEmptyObject(nextProps.product.details)) {
      this.setState({ product: nextProps.product, loading: false })
    }
  }

  render() {
    if (this.state.loading) {
      return <Skeleton className="single-body" />
    } else {
      const { product } = this.state
      if (!product.summary) {
        product.summary = product.details.description_en.split(/\s+/, 30).join(' ')
      }
      return (
        <div className="single-body">
          {product.details.logo ? (
            <img src={baseApiUrl + product.details.logo} width="100px" alt="logo" />
          ) : (
            <img src={NoLogoImage} width="100px" alt="logo" />
          )}
          <div style={{ flex: 1 }}>
            <span>
              <a
                href={product.website}
                target="_blank"
                style={{
                  display: 'inline-flex',
                  alignContent: 'center',
                  alignItems: 'center',
                  color: '#0D47A1'
                }}
              >
                {product.name_en}
                <ContentLink
                  color="#0D47A1"
                  style={{ marginLeft: 5 }}
                  hoverColor="aqua"
                />
              </a>
              <span id="single-meta-info">
                {product.city && `${product.city},${product.country}`}
              </span>
            </span>
            <span className="single-page-summary">{product.summary}</span>
          </div>
        </div>
      )
    }
  }
}

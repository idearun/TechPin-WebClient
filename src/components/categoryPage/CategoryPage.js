import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as actions from '../../actions/actionCreators'
import { Helmet } from 'react-helmet'

import IconButton from 'material-ui/IconButton'
import StartupPaper from '../sharedComponents/StartupPaper'
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import CircularProgress from 'material-ui/CircularProgress'

const styles = {
  toolbarBackArrow: {
    marginLeft: 27,
    cursor: 'pointer',
  },
  editModeIcon: {
    cursor: 'pointer',
  },
}

class CategoryPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      aSyncCall: false,
      products: [],
    }
  }

  filterByCategory = arr => {
    return arr.filter(item => {
      return item.categories.some(category => category === this.props.params.category)
    })
  }

  filterDuplicate = arr => {
    return arr.filter((product, index) => {
      return arr.findIndex(item => item.slug === product.slug) === index
    })
  }

  componentDidMount = () => {
    const categorySlug = this.props.params.category
    if (!categorySlug) return
    this.getProductsInCategory(categorySlug)
  }

  componentWillReceiveProps(nextProps) {
    const categorySlug = nextProps.params.category
    if (!categorySlug) return
    this.getProductsInCategory(categorySlug)
  }

  getCategoryNameBySlug = slug => {
    const { categories = [] } = this.props
    if (categories.length > 0) {
      return categories.find(category => category.slug === slug).name_en
    } else {
      return slug
    }
  }

  getProductsInCategory(categorySlug) {
    if (
      Object.keys(this.props.byCategory).length > 0 &&
      this.props.byCategory[categorySlug]
    ) {
      this.setState({ products: this.props.byCategory[categorySlug] })
    } else {
      this.setState({ aSyncCall: true })
      this.props.getProductsByCategory(categorySlug).then(products => {
        let filteredList = this.filterByCategory(products)
        this.setState({
          aSyncCall: false,
          products: this.filterDuplicate(filteredList),
        })
      })
    }
  }

  render() {
    const { category } = this.props.params
    const categoryName = this.getCategoryNameBySlug(category)
    return (
      <div className="category-page main-content">
        <Helmet>
          <title>{`TechPin - ${categoryName}`}</title>
        </Helmet>
        <header className="category-header">
          <IconButton tooltip="Back" tooltipPosition="top-center">
            <NavigationArrowBack
              style={styles.toolbarBackArrow}
              hoverColor={'#9C27B0'}
              onClick={() => browserHistory.goBack()}
            />
          </IconButton>
          <div className="category-title">
            <div>{categoryName}</div>
            <div className="sub-header">
              {`Top Companies, Products And Startups In ${this.getCategoryNameBySlug(
                category
              )} Category / Market`}
            </div>
          </div>
          <div />
        </header>
        <main className="category-flex-container">
          {this.state.aSyncCall ? (
            <CircularProgress id="spinner" color={'#2962FF'} size={50} />
          ) : (
            this.state.products.map((product, i) => (
              <StartupPaper key={i} product={product} />
            ))
          )}
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    byCategory: state.byCategory,
    categories: state.categories,
  }
}

export default connect(mapStateToProps, actions)(CategoryPage)

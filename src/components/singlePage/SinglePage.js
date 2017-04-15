import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/actionCreators';

import SinglePageToolbar from './SinglePageToolbar';
import SinglePageMain from './SinglePageMain';

import CircularProgress from 'material-ui/CircularProgress';

class SinglePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      product: {},
      slug: '',
      isLoading: false,
    }
  }
  componentDidMount = () => {
    if (this.props.authenticated) {
      this.props.getPreviousUserRates(this.props.params.startUpName)
    }
  }

  componentWillMount = () => {
    const productName = this.props.params.startUpName
    const indexOfProductInStore = this.isCached(productName)

    if (indexOfProductInStore === -1) {
      this.setState({isLoading: true})
      this.props.getSingleProduct(productName)
      .then(product => {this.setState({product, isLoading: false, slug: product.product.slug})});
    } else {
      this.setState({
        product: this.props.singleProducts[indexOfProductInStore],
        slug: this.props.singleProducts[indexOfProductInStore].product.slug
      })
    }
  }

  isCached = (productName) => {
    //should check for the data in store and return the index in singleProducts
    let temp = this.props.singleProducts || []
    const index = temp.findIndex(item => item.product.slug === productName)
    return index
  }


  render() {
    return (
      <div className='single-page main-content'>
      {this.state.isLoading ? <CircularProgress id='spinner' color={'#2962FF'} size={50}/> :
          <SinglePageMain product={this.state.product} userRate={this.props.userRates[this.props.params.startUpName]}>
            <SinglePageToolbar
              editAble={true}
              slug={this.state.slug}
              auth={this.props.authenticated}/>
          </SinglePageMain>
      }
      </div>
    )
  }
}
SinglePage.propTypes = {
};

function mapStateToProps(state) {
  return {
    list: state.startUps,
    authenticated: state.auth.authenticated,
    singleProducts: state.singleProducts,
    userRates: state.userRates || {}
  }
}

export default connect(mapStateToProps, actions)(SinglePage);

  
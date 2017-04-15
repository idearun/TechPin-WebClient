import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { browserHistory } from "react-router";
import * as actions from "../../actions/actionCreators";

import IconButton from "material-ui/IconButton";
import StartupPaper from "../sharedComponents/StartupPaper";
import NavigationArrowBack from "material-ui/svg-icons/navigation/arrow-back";
import CircularProgress from "material-ui/CircularProgress";

const styles = {
  toolbarBackArrow: {
    marginLeft: 27,
    cursor: "pointer"
  },
  editModeIcon: {
    cursor: "pointer"
  }
};

class CategoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aSyncCall: false,
      products: []
    };
  }

  // extractAllProducts = products => {
  //   let productsArr = [];
  //   for (let char in products) {
  //     if (products.hasOwnProperty(char)) {
  //       productsArr = [...productsArr, ...products[char]];
  //     }
  //   }
  //   return productsArr;
  // };

  filterByCategory = arr => {
    return arr.filter(item => {
      return item.categories.some(
        category => category === this.props.params.category
      );
    });
  };

  filterDuplicate = arr => {
    return arr.filter((product, index) => {
      return arr.findIndex(item => item.slug === product.slug) === index;
    });
  };

  // componentWillMount = () => {
  //   if (Object.keys(this.props.topProducts).length > 0) {
  //     const allTop = [
  //       ...this.props.topProducts.topNew,
  //       ...this.props.topProducts.topRanked,
  //       ...this.props.topProducts.randomProducts
  //     ];
  //     const filteredByCategory = this.filterByCategory(allTop);
  //     this.setState({
  //       products: this.filterDuplicate(filteredByCategory)
  //     });
  //   } else {
  //     this.props.initialLoadTop25().then(allTop => {
  //       const filteredByCategory = this.filterByCategory([
  //         ...allTop.topNew,
  //         ...allTop.topRanked,
  //         ...allTop.randomProducts
  //       ]);
  //       this.setState({
  //         products: this.filterDuplicate(filteredByCategory)
  //       });
  //     });
  //   }
  // };

  componentDidMount = () => {
    const categorySlug = this.props.params.category
    if(Object.keys(this.props.byCategory).length > 0 && this.props.byCategory[categorySlug]) {
      this.setState({products: this.props.byCategory[categorySlug]})
    }
    else {
      this.setState({aSyncCall: true})
      this.props.getProductsByCategory(categorySlug)
       .then(products => {
         let filteredList = this.filterByCategory(products)
         this.setState({
           aSyncCall: false,
           products: this.filterDuplicate(filteredList)
         })
       })
       .catch(err => console.log(err))
    }
    
    // if (Object.keys(this.props.allProducts).length === 0) {
    //   this.setState({ aSyncCall: true });
    //   this.props.getAllProducts().then(allProducts => {
    //     const filteredList = this.filterByCategory(
    //       this.extractAllProducts(allProducts)
    //     );
    //     this.setState({
    //       products: this.filterDuplicate(filteredList),
    //       aSyncCall: false
    //     });
    //   });
    // } else {
    //   const filteredList = this.filterByCategory(this.extractAllProducts(this.props.allProducts));
    //   this.setState({ products: this.filterDuplicate(filteredList) });
    // }
  };

  render() {
    return (
      <div className="category-page main-content">
        <header className="category-header">
          <IconButton tooltip="back" tooltipPosition="top-center">
            <NavigationArrowBack
              style={styles.toolbarBackArrow}
              hoverColor={"#9C27B0"}
              onClick={() => browserHistory.goBack()}
            />
          </IconButton>
          <div className="category-title">
            <span>Top Startups & Products</span>
            <p className="sub-header">
              {`in ${this.props.params.category} category`}
            </p>
          </div>
          <div />
        </header>
        <main className="category-flex-container">
          {this.state.aSyncCall
            ? <CircularProgress id="spinner" color={"#2962FF"} size={50} />
            : this.state.products.map((product, i) => (
                <StartupPaper key={i} product={product} />
              ))}
        </main>
      </div>
    );
  }
}

CategoryPage.propTypes = {};

function mapStateToProps(state) {
  return {
    byCategory: state.byCategory
  };
}

export default connect(mapStateToProps, actions)(CategoryPage);

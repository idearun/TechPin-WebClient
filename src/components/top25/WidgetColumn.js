import React from "react";
import Skeleton from "react-loading-skeleton";
import SortingMenu from "./SortingMenu";
import StartUpWidget from "./StartUpWidget";

import sort from "../../helpers/helpers";

function generateListItem(product, i) {
  return <StartUpWidget product={product} key={product.name_en} i={i} />;
}

export default class WidgetColumn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: "nps",
      productList: []
    };
    this.handleSort = this.handleSort.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.productList.length > 0) {
      this.setState({ productList: nextProps.productList });
    }
  }

  handleSort = (event, sortBy) => {
    if (sortBy !== this.state.sortBy) {
      let sortedList = sort(this.props.productList, sortBy);
      this.setState({ productList: sortedList, sortBy });
    }
  };

  render() {
    const { productList } = this.state;
    return (
      <div className="column">
        <list className="widget-list">
          <div className="chooser-title">
            <div className="before-top25-title" />
            <div>{this.props.title || ""}</div>
            {<SortingMenu onChange={this.handleSort} />}
          </div>
          {productList.length > 0 ? (
            productList.map(generateListItem).slice(0,5)
          ) : (
            <Skeleton count={10} />
          )}
        </list>
      </div>
    );
  }
}

import React from "react";
import Skeleton from "react-loading-skeleton";
import SortingMenu from "./SortingMenu";
import StartUpWidget from "./StartUpWidget";
import animateScrollTo from 'animated-scroll-to';

import sort from "../../helpers/helpers";
import { WSAEINVALIDPROVIDER } from "constants";

function generateListItem(product, i) {
  return <StartUpWidget product={product} key={product.name_en} i={i} />;
}


export default class WidgetColumn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: "nps",
      productList: [],
      currentStep: 0
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
  

  onArrowClickRight = () => {

    const steps = this.container.offsetWidth/window.innerWidth
    const options = { 
      speed: 500,
      minDuration: 250,
      maxDuration: 1500,
      element: this.container,
      cancelOnUserAction: true,
      passive: true,
      horizontal: true
    };

    animateScrollTo(350, options);

  }


  onArrowClickLeft = () => {
    const steps = this.container.offsetWidth/window.innerWidth

    this.setState({
      currentStep: this.state.currentStep-1
    }, () => {
      const newScrollLeft = this.state.currentStep*window.innerWidth
      const options = { 
        speed: 500,
        minDuration: 250,
        maxDuration: 1500,
        element: this.container,
        cancelOnUserAction: true,
        passive: true,
        horizontal: true
      };
  
      animateScrollTo(newScrollLeft, options);
    })

  }

  render() {
    const { productList } = this.state;
    return (
      <div className="column"> 

        <list className="widget-list" ref={el => {
        this.container = el
      }}>
          <div className="chooser-title">
            <div className="before-top25-title" />
            <div>{this.props.title || ""}</div>
            {<SortingMenu onChange={this.handleSort} />}
          </div>
          {productList.length > 0 ? (
            productList.map(generateListItem).slice(0,10)
          ) : (
            <Skeleton count={10} />
          )}
        </list>

        <div className="column-left-arrow" onClick={this.onArrowClickLeft}>&#8592;</div>
        <div className="column-right-arrow" onClick={this.onArrowClickRight}>&#8594;</div>
      </div>
    );
  }
}

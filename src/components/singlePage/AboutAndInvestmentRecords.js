import React, { Component } from "react";
import SwipeableViews from "react-swipeable-views";
import { Tabs, Tab } from "material-ui/Tabs";
import InvestmentRecords from "./InvestmentRecords";

const tabStyle = { color: "navy", whiteSpace: "normal" };

export default class AboutAndInvestmentRecords extends Component {
  constructor() {
    super();
    this.state = {
      slideIndex: 0
    };
  }

  handleChange = index =>
    this.setState(() => ({
      slideIndex: index
    }));

  render() {
    const { name, desc, investedOn, investmentsDone } = this.props;
    return (
      <div>
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
          inkBarStyle={{ backgroundColor: "navy" }}
          tabItemContainerStyle={{ backgroundColor: "#E8E8E8" }}
        >
          <Tab label={`About ${name}`} value={0} buttonStyle={tabStyle} />
          <Tab label="Investment Records" value={1} buttonStyle={tabStyle} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div className="single-about" style={{ padding: "20px 0" }}>
            <p>{desc}</p>
          </div>
          <InvestmentRecords
            investedOn={investedOn}
            investmentsDone={investmentsDone}
          />
        </SwipeableViews>
      </div>
    );
  }
}

// {investmentsDone.map((item, i) => <InvestmentRow {...item} />)}

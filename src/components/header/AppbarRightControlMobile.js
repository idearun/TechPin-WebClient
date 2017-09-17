import React, { Component } from "react";
import SearchBar from "./SearchInput";
import NavigationMoreVert from "material-ui/svg-icons/navigation/more-vert";
import IconButton from "material-ui/IconButton";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInputIsFocused: false
    };
  }
  handleSearchFocus = () => {
    this.setState({ searchInputIsFocused: true });
    this.props.onSearchStart()
  };

  handleSearchBlur = () => {
    this.setState({ searchInputIsFocused: false });
    this.props.onSearchFinish();
  };

  render() {
    const {
      handleDrawerToggle,
      searchResult,
      onSearchTermUpdate,
      aSyncCall
    } = this.props;
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center"
        }}
      >
        <SearchBar
          searchResult={searchResult}
          onChange={onSearchTermUpdate}
          onFocus={this.handleSearchFocus}
          onBlur={this.handleSearchBlur}
          aSyncCall={aSyncCall}
        />
        {!this.state.searchInputIsFocused && (
          <IconButton onClick={handleDrawerToggle}>
            <NavigationMoreVert color="white" />
          </IconButton>
        )}
      </div>
    );
  }
}

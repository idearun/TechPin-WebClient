import React, { Component } from "react";
import ActionSearch from "material-ui/svg-icons/action/search";
import ClickOutHandler from "react-onclickout";

const styles = {
  icon: {
    cursor: "pointer",
    position: "relative",
    top: 0,
    marginRight: 20
  }
};

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  open = () => {
    this.searchInput.style.width = window.innerWidth - 275 + "px";
    this.searchInput.focus();
    this.props.onFocus();
    this.setState({ isOpen: true });
  };

  close = () => {
    // do nothing if the input is not focused
    if (this.state.isOpen) {
      this.searchInput.classList.remove("active");
      this.searchInput.removeAttribute("style")
      this.setState(state => {
        return { isOpen: false };
      });
      // wait for css animation 0.2s and then
      // notify the parent to show buttons
      setTimeout(() => {
        this.props.onBlur();
        this.searchInput.value = "";
      }, 210);
    }
  };

  getClassName = () => {
    if (this.props.isDesktop) {
      if (this.state.isOpen) {
        return "desktop active";
      } else {
        return "desktop";
      }
    } else {
      if (this.state.isOpen) {
        return "active";
      } else {
        return "";
      }
    }
  };

  render() {
    const { onChange } = this.props;
    return (
      <div id="search-bar-wrapper">
        <ClickOutHandler onClickOut={this.close}>
          <input
            ref={el => {
              this.searchInput = el;
            }}
            id="main-search"
            onChange={onChange}
            onFocus={this.open}
            type="text"
            placeholder="Search..."
            className={this.getClassName()}
          />
          {!this.props.isDesktop && !this.state.isOpen && (
            <ActionSearch
              color="white"
              onClick={this.open}
              style={styles.icon}
            />
          )}
        </ClickOutHandler>
      </div>
    );
  }
}

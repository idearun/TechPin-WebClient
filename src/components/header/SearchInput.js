import React, { Component } from "react";
import ActionSearch from "material-ui/svg-icons/action/search";
import ClickOutHandler from "react-onclickout";
import CircularProgress from "material-ui/CircularProgress";

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
    // to avoid collapsing into the logo
    const { innerWidth } = window;

    if (innerWidth > 450) {
      this.searchInput.style.width = innerWidth - 275 + "px";
    } else {
      this.searchInput.style.width = innerWidth - 50 + "px";
    }

    this.searchInput.focus();
    this.props.onFocus(); //notify parent
    this.setState({ isOpen: true });
  };

  close = () => {
    // do nothing if the input is not focused
    if (this.state.isOpen) {
      this.searchInput.classList.remove("active");
      this.searchInput.removeAttribute("style");
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
    const { onChange, aSyncCall } = this.props;
    return (
      <ClickOutHandler onClickOut={this.close}>
        <div id="search-bar-wrapper">
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
          {aSyncCall && (
            <CircularProgress
              id="search-bar-spinner"
              color={"rgb(13, 71, 161)"}
              size={20}
            />
          )}
          {!this.props.isDesktop &&
          !this.state.isOpen && (
            <ActionSearch
              color="rgb(13, 71, 161)"
              onClick={this.open}
              style={styles.icon}
            />
          )}
        </div>
      </ClickOutHandler>
    );
  }
}

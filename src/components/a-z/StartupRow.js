import React, { PropTypes } from "react";
import StartupPaper from "../sharedComponents/StartupPaper";

export default class StartupRow extends React.Component {
  render() {
    const { filterdList } = this.props;
    return (
      <div className="row-wrapper">
        {/* <div className="char-symbol">{this.props.char}</div> */}
        {filterdList.length > 0 ? (
          <div className="startup-row">
            {filterdList.map((item, i) => (
              <StartupPaper
                WrapperClassName="all-entries-item"
                key={i}
                product={item}
              />
            ))}
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

StartupRow.propTypes = {};

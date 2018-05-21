import React from 'react'
import StartupPaper from '../sharedComponents/StartupPaper'

export default class StartupRow extends React.Component {
  render() {
    const { filteredList } = this.props
    return (
      <div className="row-wrapper">
        {/* <div className="char-symbol">{this.props.char}</div> */}
        {filteredList.length > 0 ? (
          <div className="startup-row">
            {filteredList.map((item, i) => (
              <StartupPaper WrapperClassName="all-entries-item" key={i} product={item} />
            ))}
          </div>
        ) : (
          <div />
        )}
      </div>
    )
  }
}

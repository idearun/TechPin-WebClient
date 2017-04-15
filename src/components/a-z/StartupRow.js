import React, {PropTypes} from 'react';
import StartupPaper from '../sharedComponents/StartupPaper';

export default class StartupRow extends React.Component {

  render() {
    return (
      <div className="row-wrapper">
        <div className="char-symbol">{this.props.char}</div>
        <div className='startup-row'>
        {this.props.filterdList.map(
          (item, i) => <StartupPaper WrapperClassName='all-entries-item' key={i} product={item}/>)}
        </div>
      </div>
    );
  }
}

StartupRow.propTypes = {
};

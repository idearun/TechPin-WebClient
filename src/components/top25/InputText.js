import React from 'react';

class InputText extends React.Component {
  render(props) {
    return (
      <div>
        <input value={this.props.value} onChange={this.props.onChange} placeholder={this.props.placeholder} style={this.props.style} />
        <div className="form-error">{this.props.errorTxt}</div>
      </div>
    );
  }
}

export default InputText;
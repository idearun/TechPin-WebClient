import React from 'react';

class TextArea extends React.Component {
  render(props) {
    return (
      <div>
        <textarea value={this.props.value} onChange={this.props.onChange} placeholder={this.props.placeholder} style={this.props.style} />
        <div className="form-error">{this.props.errorText}</div>
      </div>
    );
  }
}

export default TextArea;
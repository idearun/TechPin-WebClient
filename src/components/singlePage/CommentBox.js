import React, {PropTypes} from 'react';

import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import CircularProgress from 'material-ui/CircularProgress';

export default class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentText: '',
    }
  }

  handleTextFieldChange = (event, value) => {
    this.setState({commentText: value})
  }

  handleNewComment = () => {
    let commentData = {};
    commentData.text = this.state.commentText;
    commentData.created_at = new Date();
    commentData.user = 'You';
    this.props.handlePostComment(commentData);
  }

  render() {
    return (
      <div className="comment-box">
      <TextField
        hintText="Write A Comment"
        rows={3}
        multiLine={true}
        id='comment-field'
        onChange={this.handleTextFieldChange}
      />
      {this.props.commentAsyncCall ?
        <CircularProgress size={33.33} style={{marginBottom: '10px'}}/> :
        <IconButton
          style={{padding: 0}}
          onClick={this.handleNewComment}>
            <ContentAddCircle color='#0D47A1'/>
        </IconButton>
      }
      </div>
    );
  }
}

CommentBox.propTypes = {
};

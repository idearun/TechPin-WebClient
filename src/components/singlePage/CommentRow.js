import React, {PropTypes} from 'react';

import SocialPerson from 'material-ui/svg-icons/social/person'
import Avatar from 'material-ui/Avatar';

const CommentRow = ({comment}) => {
  return (
    <div className='comments-row'>
      <div>
        <div className='avatar'>
          <Avatar
            icon={<SocialPerson />}
          />
        </div>
        <div>
          <div className="comment-author">{comment.user}:</div>
          <span className="comment-text">{comment.text}</span>
          <span className="comment-date">
            {new Date(comment.created_at).toDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
CommentRow.propTypes = {
};

export default CommentRow;

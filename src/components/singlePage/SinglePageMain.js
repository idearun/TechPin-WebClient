import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/actionCreators';

import CommentRow from './CommentRow';
import VisualInfo from './VisualInfo';
import CommentBox from './CommentBox';
import StartupWidgetMoreInfo from './StartupWidgetMoreInfo';
import SocialNetworks from './SocialNetworks';
import ContactInfo from './ContactInfo';
import Rate from './Rate';

import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';

const styles = {
  paper: {
    Width: '100%',
  },
}

class SinglePageMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: {},
      product: {},
      comments: [],
      username: '',
      commentAsyncCall: false,
      snackBarIsOpen: false,
      snackBarText: '',
    }
  }

  componentWillMount = () => {
    this.setState({
      product: this.props.product.product,
      comments: this.props.product.comments,
    })
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.username) {
      this.setState({username: nextProps.username})
    }

    if (nextProps.product) {
      this.setState({
        product: nextProps.product.product,
        comments: nextProps.product.comments
      })
    }
  }

  handlePostComment = (commentData) => {
    if (this.props.authenticated) {
      if (commentData.text.length > 1) {
        this.setState({commentAsyncCall: true})
        this.props.postNewComment(commentData, this.props.product.product.slug)
        .then(response => {
          this.setState({commentAsyncCall: false});
          document.querySelector('#comment-field').value = '';
        })
      }
    } else {
      this.setState({snackBarIsOpen: true, snackBarText: 'please login first'})
    }
  }

  handlePostRate = (rate, slug) => {
    if (this.props.authenticated) {
        this.props.postNewRate(rate, slug)
         .then((res) => {
          this.setState({
          rating: {rating: res.data.new_p_rate, rateCount: res.data.p_rate_count},
          snackBarIsOpen: true,
          snackBarText: 'Successfuly submited your rate',
          userRated: true
        })
      })
    } else {
      this.setState({snackBarIsOpen: true, snackBarText: 'please login first'})
    }
  }

  handleSnackBarClose = () => {
    this.setState({
      snackBarIsOpen: false,
    });
  };


  render() {
    if (this.state.product) {
      var name = this.state.product.name_en || '';
      var details = this.state.product.details;
      if (details) {
        var desc = details.description_en
      } else {
        desc = ''
      }
    }
    const comments = this.state.comments || []
    const socialData = {
      ios: this.state.product.details.ios_app,
      android: this.state.product.details.android_app,
      linkedin: this.state.product.details.linkedin,
      instagram: this.state.product.details.instagram,
      twitter: this.state.product.details.twitter
    }
    const contactData = {
      email: this.state.product.details.email,
      extraUrl: this.state.product.details.extra_url,
      website: this.state.product.website,
    }
    return(
      <div id='single-page-main-container'>
        <Paper id='single-page-main-content' style={styles.paper} zDepth={3}>
          {this.props.children}
          <StartupWidgetMoreInfo product={this.state.product || {}}/>
          <VisualInfo 
            average_p_rate={this.state.rating.rating || this.props.product.product.average_p_rate} 
            rate_count={this.state.rating.rateCount || this.props.product.product.rate_count} 
            n_p_score={this.props.product.product.n_p_score} 
            employees={this.props.product.product.details.employees}
            year={this.props.product.product.details.year}/>
          <div className="rating">
            <Rate
              name={name}
              userRate={this.props.userRate ? this.props.userRate.rate: undefined}
              slug={this.state.product.slug}
              submitRate={this.handlePostRate}
              authenticated={this.props.authenticated}/>
          </div>
          <div className="detailed-info">
            <div className="single-about">
              <span>{`About ${name}`}</span>
              <p>{desc}</p>
            </div>
          </div>
          <div className="single-socials">
            {this.state.product && <SocialNetworks socialData={socialData}/>}
          </div>
          <div className="contact-info">
            <ContactInfo contactData={contactData}/>
          </div>
          <div className="comments">
            <span className="comment-title">Comments</span>
            <CommentBox
              authenticated={this.props.authenticated}
              handlePostComment={this.handlePostComment}
              commentAsyncCall={this.state.commentAsyncCall}/>
                {comments.map((comment, i) => <CommentRow comment={comment} key={i}/>)}
          </div>
        </Paper>
        <Snackbar
          open={this.state.snackBarIsOpen}
          message={this.state.snackBarText}
          autoHideDuration={3500}
          onRequestClose={this.handleSnackBarClose}
        />
      </div>);
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    username: state.auth.username,
    rateCount: state.topProducts,
  }
}
export default connect(mapStateToProps, actions)(SinglePageMain);

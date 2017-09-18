import React, { PropTypes } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/actionCreators";

import CommentRow from "./CommentRow";
import VisualInfo from "./VisualInfo";
import CommentBox from "./CommentBox";
import StartupWidgetMoreInfo from "./StartupWidgetMoreInfo";
import SocialNetworks from "./SocialNetworks";
import ContactInfo from "./ContactInfo";
import Rate from "./Rate";
import AboutAndInvestmentRecords from "./AboutAndInvestmentRecords";
import Skeleton from "react-loading-skeleton";
import Paper from "material-ui/Paper";
import Snackbar from "material-ui/Snackbar";
import ProductCategories from "./ProductCategories";
const styles = {
  paper: {
    Width: "100%"
  }
};

class SinglePageMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: {},
      product: { details: {} },
      comments: [],
      username: "",
      commentAsyncCall: false,
      snackBarIsOpen: false,
      snackBarText: ""
    };
  }

  componentDidMount = () => {
    if (this.props.product.product) {
      this.setState({
        product: this.props.product.product,
        comments: this.props.product.comments
      });
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.username) {
      this.setState({ username: nextProps.username });
    }
    if (nextProps.product.product) {
      this.setState({
        product: nextProps.product.product,
        comments: nextProps.product.comments
      });
    }
  };

  handlePostComment = commentData => {
    if (this.props.authenticated) {
      if (commentData.text.length > 1) {
        this.setState({ commentAsyncCall: true });
        this.props
          .postNewComment(commentData, this.props.product.product.slug)
          .then(response => {
            this.setState({ commentAsyncCall: false });
            document.querySelector("#comment-field").value = "";
          });
      }
    } else {
      this.setState({
        snackBarIsOpen: true,
        snackBarText: "please login first"
      });
    }
  };

  handlePostRate = (rate, slug) => {
    if (this.props.authenticated) {
      this.props.postNewRate(rate, slug).then(res => {
        this.setState({
          rating: {
            rating: res.data.new_p_rate,
            rateCount: res.data.p_rate_count
          },
          snackBarIsOpen: true,
          snackBarText: "Successfuly submited your rate",
          userRated: true
        });
      });
    } else {
      this.setState({
        snackBarIsOpen: true,
        snackBarText: "please login first"
      });
    }
  };

  handleSnackBarClose = () => {
    this.setState({
      snackBarIsOpen: false
    });
  };

  render() {
    const { isLoading } = this.props;
    if (this.state.product) {
      var name = this.state.product.name_en || "";
      var details = this.state.product.details;
      if (details) {
        var desc = details.description_en;
      } else {
        desc = "";
      }
    }
    const comments = this.state.comments || [];
    const getSocialData = () => {
      if (isLoading) {
        return {};
      } else {
        return {
          ios: this.state.product.details.ios_app,
          android: this.state.product.details.android_app,
          linkedin: this.state.product.details.linkedin,
          instagram: this.state.product.details.instagram,
          twitter: this.state.product.details.twitter
        };
      }
    };
    const getContactData = () => {
      if (isLoading) {
        return {};
      } else {
        return {
          email: this.state.product.details.email,
          extraUrl: this.state.product.details.extra_url,
          website: this.state.product.website
        };
      }
    };

    const getCategories = () => {
      if (isLoading) {
        return [];
      } else {
        return this.state.product.product_categories;
      }
    };

    const investedOn = isLoading ? [] : this.state.product.investments_received;

    const investmentsDone = isLoading
      ? []
      : this.state.product.investments_done;
    return (
      <div id="single-page-main-container">
        <div>
          <div id="single-page-main-content">
            <Paper
              className="detail-and-rating-wrapper"
              style={styles.paper}
              zDepth={1}
            >
              {/* {this.props.children} */}
              <StartupWidgetMoreInfo product={this.state.product} />
              <ProductCategories
                isLoading={isLoading}
                categories={getCategories()}
              />
              <div className="rating">
                <Rate
                  isLoading={isLoading}
                  name={name}
                  userRate={
                    this.props.userRate ? this.props.userRate.rate : undefined
                  }
                  slug={this.state.product ? this.state.product.slug : ""}
                  submitRate={this.handlePostRate}
                  authenticated={this.props.authenticated}
                />
              </div>
            </Paper>
            <VisualInfo
              isLoading={isLoading}
              slug={this.props.slug}
              auth={this.props.auth}
              handleInvRecAdd={this.props.handleInvRecAdd}
              average_p_rate={
                this.state.rating.rating || this.state.product.average_p_rate
              }
              rate_count={
                this.state.rating.rateCount || this.state.product.rate_count
              }
              n_p_score={this.state.product.n_p_score}
              employeesCount={this.state.product.details.employees_count}
              year={this.state.product.details.year}
            />
          </div>
          <div style={styles.paper} className="about-inv-visual-wrapper">
            {isLoading ? (
              <Skeleton className="detailed-info" />
            ) : (
              <div className="detailed-info">
                <AboutAndInvestmentRecords
                  name={name}
                  desc={desc}
                  investedOn={investedOn}
                  investmentsDone={investmentsDone}
                />
              </div>
            )}
            {isLoading ? (
              <Skeleton className="social-and-contact-wrapper" />
            ) : (
              <Paper
                className="social-and-contact-wrapper"
                style={styles.paper}
                zDepth={1}
              >
                <div className="contact-info">
                  <ContactInfo contactData={getContactData()} />
                </div>
                <div className="single-socials">
                  {this.state.product && (
                    <SocialNetworks socialData={getSocialData()} />
                  )}
                </div>
              </Paper>
            )}
          </div>
          {isLoading ? (
            <Skeleton className="comments-wrapper" />
          ) : (
            <Paper style={styles.paper} zDepth={1} className="comments-wrapper">
              <div className="comments">
                <span className="comment-title">Comments</span>
                {comments.map((comment, i) => (
                  <CommentRow comment={comment} key={i} />
                ))}
                <CommentBox
                  authenticated={this.props.authenticated}
                  handlePostComment={this.handlePostComment}
                  commentAsyncCall={this.state.commentAsyncCall}
                />
              </div>
            </Paper>
          )}
        </div>

        <Snackbar
          open={this.state.snackBarIsOpen}
          message={this.state.snackBarText}
          autoHideDuration={7000}
          onRequestClose={this.handleSnackBarClose}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    username: state.auth.username,
    rateCount: state.topProducts
  };
}
export default connect(mapStateToProps, actions)(SinglePageMain);

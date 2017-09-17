import React, { PropTypes } from "react";
import StarRating from "../sharedComponents/StarRating";
import FlatButton from "material-ui/FlatButton";
import SocialPeople from "material-ui/svg-icons/social/people";
import ActionWork from "material-ui/svg-icons/action/work";
import ActionGrade from "material-ui/svg-icons/action/grade";
import ActionFlightTakeoff from "material-ui/svg-icons/action/flight-takeoff";
import { browserHistory } from "react-router";
import Snackbar from "material-ui/Snackbar";

const styles = {
  svgIcon: {
    minWidth: "20px",
    color: "#0D47A1"
  }
};

export default class VisualInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      snackBarOpen: false,
      rateCount: null,
      averageRate: null,
      product: {}
    };
  }

  componentDidMount = () => {
    if (this.props.product) {
      this.setState({ product: this.props.product });
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.rating) {
      this.setState({
        product: Object.assign({}, this.state.product, {
          rate_count: nextProps.rateCount,
          average_p_rate: nextProps.rating
        })
      });
    }
  };

  checkAuthAndRedirect = () => {
    if (!this.props.auth) {
      this.setState({ snackBarOpen: true });
    } else {
      browserHistory.push(`/${this.props.slug}/edit`);
    }
  };

  handleSnackBarClose = () => {
    this.setState({ snackBarOpen: false });
  };

  // refactor to more stateless components 😠
  render() {
    return (
      <div className="visual-info-action-button-wrapper">
        <div className="single-page-action-buttons">
          <div>
            <FlatButton
              label="Edit Information"
              fullWidth
              onClick={this.checkAuthAndRedirect}
            />
          </div>
          <div>
            <FlatButton
              label="Add Investment Record"
              fullWidth
              onClick={this.props.handleInvRecAdd}
            />
          </div>
        </div>
        <div className="visual-info ">
          <div className="single-page-visual-parent">
            <div className="single-page-visual-widget">
              {`${this.props.average_p_rate.toFixed(1)}`}
              <StarRating
                rating={this.props.average_p_rate}
                className="visual-info-star"
                editable={false}
              />
            </div>
            <div>
              <div className="visual-info-sub-span">
                <span>{this.props.rate_count}</span>
                <SocialPeople style={styles.svgIcon} />
              </div>
            </div>
          </div>
          <div className="single-page-visual-parent">
            <div className="single-page-visual-widget">
              {this.props.n_p_score}
            </div>
            <div>
              <div className="visual-info-sub-span">
                <span>NPS</span>
                <ActionGrade style={styles.svgIcon} />
              </div>
            </div>
          </div>
          <div className="single-page-visual-parent">
            <div className="single-page-visual-widget">
              {this.props.employeesCount || "?"}
            </div>
            <div>
              <div className="visual-info-sub-span">
                <span>Empl.</span>
                <ActionWork style={styles.svgIcon} />
              </div>
            </div>
          </div>
          <div className="single-page-visual-parent">
            <div className="single-page-visual-widget">
              {this.props.year || "?"}
            </div>
            <div>
              <div className="visual-info-sub-span">
                <span>Launch</span>
                <ActionFlightTakeoff style={styles.svgIcon} />
              </div>
            </div>
          </div>
        </div>
        <Snackbar
          open={this.state.snackBarOpen}
          message="You are not logged in, Please log in first"
          autoHideDuration={5000}
          onRequestClose={this.handleSnackBarClose}
        />
      </div>
    );
  }
}

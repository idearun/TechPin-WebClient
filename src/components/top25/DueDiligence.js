import React, { Component } from "react";
import { Card, CardActions, CardTitle, CardText } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import * as actions from "../../actions/actionCreators";
import { connect } from "react-redux";
import Snackbar from "material-ui/Snackbar";
import { Element } from "react-scroll";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";

const selectOptionsValues = [
  "due-diligence",
  "project",
  "information",
  "consulting",
  "feedback"
];

class DueDiligence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aSyncCall: false,
      formData: {
        name: "",
        email: "",
        phone_number: "",
        company_description: "",
        type: 0
      },
      notificationIsOpen: false,
      notificationMessage: ""
    };
  }

  handleRequestClose = () => {
    this.setState({
      notificationIsOpen: false,
      notificationMessage: ""
    });
  };

  updateFormData = (value, fieldName) => {
    const { formData } = this.state;
    this.setState({ formData: { ...formData, [fieldName]: value } });
  };

  isValid = ({ name, email, company_description, phone_number }) => {
    return Boolean(
      name && email && this.validateEmailAddress(email) && company_description
    );
  };

  validateEmailAddress = email => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  handleSubmit = () => {
    if (this.isValid(this.state.formData)) {
      const formData = this.state.formData;
      formData.type = selectOptionsValues[formData.type];
      this.setState({ aSyncCall: true });
      this.props
        .contactUs(formData)
        .then(() => {
          this.setState({
            formData: {
              name: "",
              email: "",
              phone_number: "",
              company_description: "",
              company_name: "",
              type: 0
            },
            aSyncCall: false,
            notificationIsOpen: true,
            notificationMessage:
              "Thanks for contacting us. Your request will be responded as soon as possible"
          });
        })
        .catch(() => {
          this.setState({
            aSyncCall: false,
            notificationIsOpen: true,
            notificationMessage: "unable to submit your request"
          });
        });
    } else {
      this.setState({
        aSyncCall: false,
        notificationIsOpen: true,
        notificationMessage: "please enter valid inputs"
      });
    }
  };

  render() {
    const className = this.props.show
      ? "due-diligence show"
      : "due-diligence hide";
    return (
      <div className={className}>
        <Element name="due-diligence">
          <Card>
            <CardTitle title="Contact Us" subtitle="Please fill the form" />
            <CardText>
              <DropDownMenu
                value={this.state.formData.type}
                style={{ width: 350 }}
                iconStyle={{ right: 0 }}
                underlineStyle={{ margin: 0 }}
                labelStyle={{ padding: 0, color: "rgba(0,0,0,0.3)" }}
                onChange={(_, val) => this.updateFormData(val, "type")}
              >
                <MenuItem
                  value={0}
                  disabled
                  primaryText="What Is This In regards To?"
                />
                <MenuItem value={1} primaryText="Due Diligence Service" />
                <MenuItem value={2} primaryText="Start A Project With Us" />
                <MenuItem
                  value={3}
                  primaryText="I Want To Share Information About a Start-up Or Investment"
                />
                <MenuItem value={4} primaryText="Consult With Us" />
                <MenuItem value={5} primaryText="Feedback" />
              </DropDownMenu>
              <div className="input-row">
                <TextField
                  value={this.state.formData.name}
                  floatingLabelText="Your Name"
                  style={{ width: 350 }}
                  onChange={(_, val) => this.updateFormData(val, "name")}
                />
                <TextField
                  value={this.state.formData.email}
                  floatingLabelText="Your Email"
                  style={{ width: 350, marginLeft: 20 }}
                  type="email"
                  onChange={(_, val) => this.updateFormData(val, "email")}
                />
              </div>
              <div className="input-row">
                <TextField
                  value={this.state.formData.phone_number}
                  style={{ width: 350 }}
                  floatingLabelText="Your Phone number"
                  onChange={(_, val) =>
                    this.updateFormData(val, "phone_number")}
                />
                <TextField
                  value={this.state.formData.company_name}
                  style={{ width: 350, marginLeft: 20 }}
                  floatingLabelText="Company Name"
                  onChange={(_, val) =>
                    this.updateFormData(val, "company_name")}
                />
              </div>
              <TextField
                value={this.state.formData.company_description}
                floatingLabelText="Description"
                fullWidth
                multiLine
                rows={3}
                fullWidth
                onChange={(_, val) =>
                  this.updateFormData(val, "company_description")}
              />
            </CardText>
            <CardActions>
              <RaisedButton
                primary
                label="Send"
                disabled={this.state.aSyncCall}
                onClick={this.handleSubmit}
              />
            </CardActions>
          </Card>
        </Element>
        <Snackbar
          open={this.state.notificationIsOpen}
          message={this.state.notificationMessage}
          autoHideDuration={7000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

export default connect(null, actions)(DueDiligence);

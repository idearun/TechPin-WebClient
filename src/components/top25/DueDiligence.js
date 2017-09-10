import React, { Component } from "react";
import { Card, CardActions, CardTitle, CardText } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import * as actions from "../../actions/actionCreators";
import { connect } from "react-redux";
import Snackbar from "material-ui/Snackbar";
import { Element } from "react-scroll";

class DueDiligence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aSyncCall: false,
      formData: {
        name: "",
        email: "",
        phone_number: "",
        company_description: ""
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
      name &&
        email &&
        this.validateEmailAddress(email) &&
        company_description &&
        phone_number
    );
  };

  validateEmailAddress = email => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  handleSubmit = () => {
    if (this.isValid(this.state.formData)) {
      const formData = this.state.formData;
      this.setState({ aSyncCall: true });
      this.props
        .contactUs(formData)
        .then(() => {
          this.setState({
            formData: {
              name: "",
              email: "",
              phone_number: "",
              company_description: ""
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
    return (
      <div className="due-diligence">
        <Element name="due-diligence">
          <Card>
            <CardTitle
              title="Due Diligence"
              subtitle="A Service From TechPin"
            />
            <CardText>
              <div className="input-row">
                <TextField
                  value={this.state.formData.name}
                  floatingLabelText="Full Name"
                  onChange={(_, val) => this.updateFormData(val, "name")}
                />
                <TextField
                  value={this.state.formData.email}
                  floatingLabelText="Email"
                  type="email"
                  onChange={(_, val) => this.updateFormData(val, "email")}
                />
                <TextField
                  value={this.state.formData.phone_number}
                  floatingLabelText="Phone number"
                  onChange={(_, val) =>
                    this.updateFormData(val, "phone_number")}
                />
              </div>
              <TextField
                value={this.state.formData.company_description}
                floatingLabelText="Company description"
                fullWidth
                multiLine
                rows={3}
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

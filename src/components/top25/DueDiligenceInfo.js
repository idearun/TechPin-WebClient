import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import DueDiligence from "./DueDiligence";
import { Card, CardActions, CardTitle, CardText } from "material-ui/Card";
import { connect } from "react-redux";

class DueDiligenceInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showContactForm: false
    };
  }

  renderForm = () => this.setState(() => ({ showContactForm: true }));

  render() {
    const { showContactForm } = this.state;
    const { title, text, button_text, sub_title } = this.props;
    return (
      <div className="due-diligence-info" id="contact-form">
        <Card>
          <CardTitle
            title={title}
            subtitle={sub_title ? sub_title : "A Service From TechPin"}
          />
          <CardText style={{ fontSize: "1.1em", color: "#555555" }}>
            <p style={{ fontFamily: "Rubik", whiteSpace: "pre-line" }}>
              {text}
            </p>
          </CardText>
          <CardActions>
            {!showContactForm && (
              <RaisedButton
                label={button_text || " "}
                fullWidth={true}
                primary
                onClick={this.renderForm}
              />
            )}
          </CardActions>
          <DueDiligence show={showContactForm} />
        </Card>
      </div>
    );
  }
}

export default connect(state => ({ ...state.dynamicTextContents.contact_us }))(
  DueDiligenceInfo
);

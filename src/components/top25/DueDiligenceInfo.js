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
        <Card className="due-diligence-card">
          <CardTitle
            title={title}
            subtitle={sub_title ? sub_title : "Are you a VC or an angel investor looking to invest in Iranian Startups?"}
            titleStyle={{textTransform:'uppercase',fontWeight:'bold'}}
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
                onClick={this.renderForm}
                backgroundColor="#0d47a1"
                labelColor="white"
                labelStyle={{ top: -3, padding: '50px' }}
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

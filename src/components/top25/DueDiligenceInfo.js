import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import DueDiligence from "./DueDiligence";
import { Card, CardActions, CardTitle, CardText } from "material-ui/Card";

const InfoText = ({ title, text }) => <div />;

export default class DueDiligenceInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showContactForm: false
    };
  }

  renderForm = () => this.setState(() => ({ showContactForm: true }));

  render() {
    const { showContactForm } = this.state;
    return (
      <div className="due-diligence-info">
        <Card>
          <CardTitle title="Due Diligence" subtitle="A Service From TechPin" />
          <CardText style={{fontSize: '1.1em', color: '#555555'}}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
              eveniet deleniti, modi culpa sit quod, recusandae maxime
              necessitatibus debitis unde quaerat porro eius doloribus facere
              harum eum facilis. Quia, debitis.
            </p>
          </CardText>
          <CardActions>
            {!showContactForm && (
              <RaisedButton
                label="Contact us"
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

import React, { Component } from 'react'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import * as actions from '../../actions/actionCreators'
import { connect } from 'react-redux'
import Snackbar from 'material-ui/Snackbar'
// import DropDownMenu from "material-ui/DropDownMenu";
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import InputText from './InputText'
import TextArea from './TextArea'

const selectOptionsValues = [
  'due-diligence',
  'project',
  'information',
  'consulting',
  'feedback'
]

const menuItems = [
  {
    text: 'What is this in regards to?',
    value: 0
  },
  {
    text: 'Due diligence service',
    value: 1
  },
  {
    text: 'Start a project with us',
    value: 2
  },
  {
    text: 'Share information about a start-up / investment',
    value: 3
  },
  {
    text: 'Consult with us',
    value: 4
  },
  {
    text: 'Feedback',
    value: 5
  }
]

class DueDiligence extends Component {
  constructor(props) {
    super(props)
    this.state = {
      aSyncCall: false,
      formData: {
        name: '',
        email: '',
        phone_number: '',
        company_description: '',
        type: 0
      },
      formErrors: {},
      notificationIsOpen: false,
      notificationMessage: ''
    }
  }

  handleRequestClose = () => {
    this.setState({
      notificationIsOpen: false,
      notificationMessage: ''
    })
  }

  updateFormData = (value, fieldName) => {
    const { formData } = this.state
    this.setState({ formData: { ...formData, [fieldName]: value } })
  }

  isValid = ({ name, email, company_description, phone_number, type }) => {
    const errors = {}
    let isValid = true
    if (!name) {
      errors.name = 'this field is required'
      isValid = false
    }
    if (!email) {
      errors.email = 'this field is required'
      isValid = false
    }
    if (!this.validateEmailAddress(email)) {
      errors.email = 'Enter a valid email'
      isValid = false
    }
    if (!company_description) {
      errors.company_description = 'this field is required'
      isValid = false
    }
    if (!phone_number) {
      errors.phone_number = 'this field is required'
      isValid = false
    }
    if (type === 0) {
      errors.type = 'Please select an option'
      isValid = false
    }
    return { errors, isValid }
  }

  validateEmailAddress = email => {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
  }

  handleSubmit = () => {
    const validationResults = this.isValid(this.state.formData)
    if (validationResults.isValid) {
      const formData = this.state.formData
      formData.type = selectOptionsValues[formData.type]
      this.setState({ aSyncCall: true })
      this.props
        .contactUs(formData)
        .then(() => {
          this.setState({
            formData: {
              name: '',
              email: '',
              phone_number: '',
              company_description: '',
              company_name: '',
              type: 0
            },
            aSyncCall: false,
            notificationIsOpen: true,
            notificationMessage:
              'Thanks for contacting us. Your request will be responded as soon as possible'
          })
        })
        .catch(() => {
          this.setState({
            aSyncCall: false,
            notificationIsOpen: true,
            notificationMessage: 'unable to submit your request'
          })
        })
    } else {
      this.setState({
        aSyncCall: false,
        notificationIsOpen: true,
        notificationMessage: 'please enter valid inputs',
        formErrors: validationResults.errors
      })
    }
  }

  renderSelectMenuItems = () => {
    return menuItems.map((item, index) => (
      <MenuItem
        key={item.value}
        value={item.value}
        disabled={index === 0}
        primaryText={item.text}
      />
    ))
  }

  render() {
    const className = this.props.show ? 'due-diligence show' : 'due-diligence hide'
    return (
      <div className={className}>
        <Card className="contact-form-card">
          <CardTitle
            title="Contact Us" 
            subtitle="Please fill the form" 
            titleStyle={{textTransform: 'uppercase', textAlign: 'left', fontWeight: 'bold'}}
            subtitleStyle={{textTransform: 'uppercase', textAlign: 'left', fontWeight: 'normal'}}  
          />
          <CardText className="contact-form-inputs-wrapper">
            {/* <DropDownMenu
              value={this.state.formData.type}
              style={{ width: 350 }}
              iconStyle={{ right: 0 }}
              errorText={this.state.formErrors.type}
              underlineStyle={{ margin: 0 }}
              labelStyle={{ padding: 0, color: "rgba(0,0,0,0.3)" }}
              onChange={(_, val) => this.updateFormData(val, "type")}
            > */}
            <SelectField
              value={this.state.formData.type}
              style={{ width: 350 }}
              errorText={this.state.formErrors.type}
              onChange={(_, val) => this.updateFormData(val, 'type')}
            >
              {this.renderSelectMenuItems()}
            </SelectField>
            <div className="input-row">
              {/* <TextField
                value={this.state.formData.name}
                errorText={this.state.formErrors.name}
                floatingLabelText="Your Name"
                style={{ width: 350 }}
                onChange={(_, val) => this.updateFormData(val, 'name')}
              /> */}
              {/* <InputText 
                onChange={(event) => this.updateFormData(event.target.value, 'name')}
                value={this.state.formData.name}
                placeholder="Your Name"
                style={{ width: 350 }}
              /> */}
              <InputText 
                onChange={(event) => this.updateFormData(event.target.value, 'name')}
                value={this.state.formData.name}
                style={{ width: 350 }}
                placeholder="Your Name"
                type="text"
              />
              {/* <TextField
                value={this.state.formData.email}
                errorText={this.state.formErrors.email}
                floatingLabelText="Your Email"
                style={{ width: 350, marginLeft: 20 }}
                type="email"
                onChange={(_, val) => this.updateFormData(val, 'email')}
              /> */}
             <InputText 
                onChange={(event) => this.updateFormData(event.target.value, 'email')}
                value={this.state.formData.email}
                style={{ width: 350, marginLeft: 20}}
                placeholder="Your Email"
                type="email"
              />

            </div>
            <div className="input-row">
              {/* <TextField
                value={this.state.formData.phone_number}
                errorText={this.state.formErrors.phone_number}
                style={{ width: 350 }}
                floatingLabelText="Your Phone number"
                onChange={(_, val) => this.updateFormData(val, 'phone_number')}
              /> */}

              <InputText 
                onChange={(event) => this.updateFormData(event.target.value, 'phone_number')}
                value={this.state.formData.phone_number}
                placeholder="Your Phone number"
                style={{ width: 350 }}
                errorText={this.state.formErrors.phone_number}
                type="tel"
              />

              {/* <TextField
                value={this.state.formData.company_name}
                errorText={this.state.formErrors.company_name}
                style={{ width: 350, marginLeft: 20 }}
                floatingLabelText="Company Name"
                onChange={(_, val) => this.updateFormData(val, 'company_name')}
              /> */}

              <InputText 
                onChange={(event) => this.updateFormData(event.target.value, 'company_name')}
                value={this.state.formData.company_name}
                placeholder="Company Name"
                style={{ width: 350, marginLeft: 20 }}
                errorText={this.state.formErrors.company_name}
                type="text"
              />

            </div>

             <TextArea
              value={this.state.formData.company_description}
              errorText={this.state.formErrors.company_description}
              placeholder="Description"
              onChange={(event) => this.updateFormData(event.target.value, 'company_description')}
              style={{width: "100%"}}
             />

            {/* <TextField
              value={this.state.formData.company_description}
              errorText={this.state.formErrors.company_description}
              floatingLabelText="Description"
              fullWidth
              multiLine
              rows={3}
              onChange={(_, val) => this.updateFormData(val, 'company_description')}
            /> */}
          </CardText>
          <CardActions style={{padding: 16}}>
            <RaisedButton
              label="Send"
              backgroundColor="#0d47a1"
              labelColor="white"
              style={{ width:150 }}
              labelStyle={{ display: 'flex', justifyContent: 'center' }}
              disabled={this.state.aSyncCall}
              onClick={this.handleSubmit}
            />
          </CardActions>
        </Card>
        <Snackbar
          open={this.state.notificationIsOpen}
          message={this.state.notificationMessage}
          autoHideDuration={7000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }
}

export default connect(null, actions)(DueDiligence)

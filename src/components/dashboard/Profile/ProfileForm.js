import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { RaisedButton } from 'material-ui'
import { TextField } from 'redux-form-material-ui'
import { required, email } from 'redux-form-validators'
import { Row, Col } from 'react-simple-flex-grid'
import 'react-simple-flex-grid/lib/main.css'

const ProfileForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit} className="form profile-form" method="POST">
    <Row>
      <div className="profile-form-title">Edit Your Profile</div>
    </Row>

    <Row gutter={40}>
      <Col xs={12} md={3}>
        <Field
          name="first_name"
          floatingLabelText="First name"
          component={TextField}
          validate={[required()]}
        />
      </Col>
      <Col xs={12} md={3}>
        <Field
          name="last_name"
          floatingLabelText="Last name"
          component={TextField}
          validate={[required()]}
        />
      </Col>
      <Col xs={12} md={3} offset={-3}>
        <Field
          name="email"
          floatingLabelText="Email"
          component={TextField}
          validate={[email({ allowBlank: true })]}
        />
      </Col>
    </Row>

    <Row>
      <RaisedButton primary type="submit" label="save" />
    </Row>
  </form>
)

const formOptions = {
  form: 'profileForm',
}

export default reduxForm(formOptions)(ProfileForm)

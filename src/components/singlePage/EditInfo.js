import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
// import * as actions from '../actions/actionCreators';

import SinglePageToolbar from './SinglePageToolbar';
import StartupWidgetMoreInfo from './StartupWidgetMoreInfo';

require('core-js/fn/object/values')
require('core-js/fn/object/entries')

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FileFileUpload from 'material-ui/svg-icons/file/file-upload';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import {PulseLoader} from 'halogen';

const editFormSubmitSuccessFeedbackText = 'Thanks, your info will be shown after approval';
const editFormSubmitFailedFeedbackText = 'Oops, please try again';

class EditInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackBarOpen: false,
      responseText: '',
      formData: {},
      aSyncCall: false
    }
  }

  textFieldChangeHandler = (event, value) => {
    const formVals = {};
    formVals[event.target.id] = value;
    const prevFormData = this.state.formData;
    const newFormData = Object.assign({}, prevFormData, formVals);
    this.setState({formData: newFormData})
  }

  valid = (values) => {
    if (values.length >= 1) {
      return true;
    }
    return false;
  }

  isSafari = () => {
     let ua = navigator.userAgent.toLowerCase(); 
      if (ua.indexOf('safari') !== -1) { 
        if (ua.indexOf('chrome') > -1) {
          return(false) // Chrome
        } else {
          return(true) // Safari
        }
      }
  } 


  handleSubmit = () => {
    let formData = new FormData();
    const keys = Object.keys(this.state.formData);
    const values = Object.values(this.state.formData);
    if(this.valid(values)) {
      this.setState({formIsValid: true, aSyncCall: true})
      for (let i = 0; i < keys.length; i++) {
        formData.append(keys[i], values[i])
      }
      formData.append('logo', document.getElementById('logo').files[0]);
      let slug = this.props.newProductSlug || this.props.params.startUpName || ''
      if (this.props.newProductSlug) {
        this.props.actions.submitAddFirstVersion(formData, slug)
        .then(
          response => {
            this.setState({snackBarOpen: true, aSyncCall: false, responseText: editFormSubmitSuccessFeedbackText})
            if(this.props.newProductSlug) {this.props.cleanNewProduct()}
          },
          response => {
            this.setState({snackBarOpen: true, aSyncCall: false, responseText: editFormSubmitFailedFeedbackText})
          }
        );
      } else {
          this.props.actions.submitAddNewVersion(formData, slug)
        .then(
          response => {
            this.setState({snackBarOpen: true, aSyncCall: false, responseText: editFormSubmitSuccessFeedbackText})
            if(this.props.newProductSlug) {this.props.cleanNewProduct()}
          },
          response => {
            this.setState({snackBarOpen: true, aSyncCall: false, responseText: editFormSubmitFailedFeedbackText})
          }
        );
      }
    } else {
      this.setState({
        snackBarOpen: true, 
        aSyncCall: false,
        responseText: 'please fill at least 1 field', 
        formIsValid: false})
    }
  }

  handleSnackBarClose = () => {
    if(!this.props.newProductSlug) {
      this.state.formIsValid && browserHistory.push(`/${this.props.params.startUpName}/`);
    } else {
      this.state.formIsValid && browserHistory.push(`/`);
    }
  }

  render() {
    if(!this.props.newProductSlug) {
       var productSlug = this.props.params && this.props.params.startUpName;
       var index = this.props.singleProducts
          .findIndex(item => item.product.slug === productSlug);
       var product = this.props.singleProducts[index];
       var name = product && product.product.name_en;  
    } else {
      var product = {}
      product.product = {}
      product.product.details = {}
    }
   
    return (
      <div className='single-page main-content edit-info'>
        <Paper style={{width: '100%'}} zDepth={3}>
          <SinglePageToolbar editAble={false} closeModal={this.props.closeModal} inModal={this.props.inModal}/>
            {!this.props.newProductSlug && <StartupWidgetMoreInfo {...product}/> }
          <div className="share-info">
            {`Share your info about ${name || 'it '} with us!`}
          </div>
          <form className="edit-info-form">
            <TextField id='extra_url' defaultValue={product.product.details.extra_url} className='three-field' floatingLabelText="extra url" onChange={this.textFieldChangeHandler} />
            <TextField id='email' defaultValue={product.product.details.email} className='three-field' floatingLabelText="email address" type='email' onChange={this.textFieldChangeHandler}/>
            <TextField id='employees' defaultValue={product.product.details.employees} className='three-field' floatingLabelText="Number of Employees" onChange={this.textFieldChangeHandler}/>
            <TextField id='year' defaultValue={product.product.details.year} className='three-field' floatingLabelText="Launch Year" onChange={this.textFieldChangeHandler}/>
            <TextField id='city' defaultValue={product.product.details.city} className='three-field' floatingLabelText="City" onChange={this.textFieldChangeHandler}/>
            <TextField id='country' defaultValue={product.product.details.country} className='three-field' floatingLabelText="Country" onChange={this.textFieldChangeHandler}/>
            <TextField id='description_en' defaultValue={product.product.details.description_en} fullWidth={true} rows={3} multiLine={true} floatingLabelText="What do they do?" onChange={this.textFieldChangeHandler}/>
            <TextField id='android_app' defaultValue={product.product.details.android_app} fullWidth={true} floatingLabelText="Android App Url" onChange={this.textFieldChangeHandler}/>
            <TextField id='ios_app' defaultValue={product.product.details.ios_app} fullWidth={true} floatingLabelText="iOs App Url" onChange={this.textFieldChangeHandler}/>
            <TextField id='linkedin' defaultValue={product.product.details.linkedin} className='three-field' floatingLabelText="Linkedin profile" onChange={this.textFieldChangeHandler}/>
            <TextField id='twitter' defaultValue={product.product.details.twitter} className='three-field' floatingLabelText="Twitter Account" onChange={this.textFieldChangeHandler}/>
            <TextField id='instagram' defaultValue={product.product.details.instagram} className='three-field' floatingLabelText="Instagram profile" onChange={this.textFieldChangeHandler}/>
            <div className='full upload-button'>
              <div>
                <div className="upload-logo-text" onClick={() => this.uploadButton.click()}>upload logo</div>
                <IconButton style={{width: '24px', height: '24px', padding: 0}}>
                  <label htmlFor='logo' ref={(node) => this.uploadButton = node}><FileFileUpload/></label>
                  <input type="file" id='logo' name='logo' className='input-file'/>  
                </IconButton>
              </div>
            </div>
          </form>
          <div className="submit-edit">
            <RaisedButton 
              label="Submit for review" 
              primary={true} 
              onClick={this.handleSubmit}>
                {this.state.aSyncCall && <PulseLoader color="#FFFFFF" size="6px"/> }
            </RaisedButton>  
          </div>
        </Paper>
        <Snackbar
          open={this.state.snackBarOpen}
          message={this.state.responseText}
          autoHideDuration={3500}
          onRequestClose={this.handleSnackBarClose}
        />
      </div>

    );
  }
}

EditInfo.propTypes = {
};

function mapStateToProps(state){
  return {token: state.auth.token};
}
export default connect(mapStateToProps)(EditInfo);

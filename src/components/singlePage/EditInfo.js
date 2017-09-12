import React from "react";
import { connect } from "react-redux";
import { browserHistory } from "react-router";
// import * as actions from '../actions/actionCreators';
import AutoComplete from "material-ui/AutoComplete";
import SinglePageToolbar from "./SinglePageToolbar";
import StartupWidgetMoreInfo from "./StartupWidgetMoreInfo";
import TagAutoCompleteInput from "../sharedComponents/TagAutoCompleteInput";
import { appendToFormData } from "../../helpers/helpers";
require("core-js/fn/object/values");
require("core-js/fn/object/entries");

import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import FileFileUpload from "material-ui/svg-icons/file/file-upload";
import IconButton from "material-ui/IconButton";
import Snackbar from "material-ui/Snackbar";
import { PulseLoader } from "halogen";

const editFormSubmitSuccessFeedbackText =
  "Thanks, your info will be shown after approval";
const editFormSubmitFailedFeedbackText = "Oops, please try again";

const empRange = [
  "0-5",
  "5-10",
  "10-20",
  "20-50",
  "50-200",
  "200-1000",
  "1000+"
];

class EditInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackBarOpen: false,
      responseText: "",
      formData: {},
      aSyncCall: false,
      selectedLogoFilename: null,
      empRangeSearchTerm: ""
    };
  }

  updateEmpRangeSearchTerm = chosenOption => {
    this.setState({ empRangeSearchTerm: chosenOption });
  };

  setEmpRangeFormData = option => {
    const formVals = {};
    formVals.employees = option;
    const prevFormData = this.state.formData;
    const newFormData = Object.assign({}, prevFormData, formVals);
    this.setState({ formData: newFormData });
  };

  textFieldChangeHandler = (event, value) => {
    const formVals = {};
    formVals[event.target.id] = value;
    const prevFormData = this.state.formData;
    const newFormData = Object.assign({}, prevFormData, formVals);
    this.setState({ formData: newFormData });
  };

  valid = (values, logoName) => {
    if (values.length >= 1) {
      return true;
    } else if (logoName !== "") {
      return true;
    }
    return false;
  };

  isSafari = () => {
    let ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("safari") !== -1) {
      if (ua.indexOf("chrome") > -1) {
        return false; // Chrome
      } else {
        return true; // Safari
      }
    }
  };

  handleAddTag = categories => {
    const newFormData = Object.assign({}, this.state.formData, {
      categories: categories
    });
    this.setState({ formData: newFormData });
  };

  handleSubmit = () => {
    const values = Object.values(this.state.formData);
    if (this.valid(values, this.state.selectedLogoFilename)) {
      this.setState({ formIsValid: true, aSyncCall: true });

      const formData = appendToFormData(this.state.formData);

      formData.append("logo", document.getElementById("logo").files[0]);
      let slug =
        this.props.newProductSlug || this.props.params.startUpName || "";

      if (this.props.newProductSlug) {
        this.props.actions.submitAddFirstVersion(formData, slug).then(
          response => {
            this.setState({
              snackBarOpen: true,
              aSyncCall: false,
              responseText: editFormSubmitSuccessFeedbackText
            });
            if (this.props.newProductSlug) {
              this.props.cleanNewProduct();
            }
          },
          response => {
            this.setState({
              snackBarOpen: true,
              aSyncCall: false,
              responseText: editFormSubmitFailedFeedbackText
            });
          }
        );
      } else {
        this.props.actions.submitAddNewVersion(formData, slug).then(
          response => {
            this.setState({
              snackBarOpen: true,
              aSyncCall: false,
              responseText: editFormSubmitSuccessFeedbackText
            });
            if (this.props.newProductSlug) {
              this.props.cleanNewProduct();
            }
          },
          response => {
            this.setState({
              snackBarOpen: true,
              aSyncCall: false,
              responseText: editFormSubmitFailedFeedbackText
            });
          }
        );
      }
    } else {
      this.setState({
        snackBarOpen: true,
        aSyncCall: false,
        responseText: "please fill at least 1 field",
        formIsValid: false
      });
    }
  };

  handleSnackBarClose = () => {
    if (!this.props.newProductSlug) {
      this.state.formIsValid &&
        browserHistory.push(`/${this.props.params.startUpName}/`);
    } else {
      this.state.formIsValid && browserHistory.push(`/`);
    }
  };

  handleLogoFile = event => {
    const selectedLogoFilename = event.target.files[0].name;
    this.setState(() => ({ selectedLogoFilename }));
  };

  render() {
    if (!this.props.newProductSlug) {
      var productSlug = this.props.params && this.props.params.startUpName;
      var index = this.props.singleProducts.findIndex(
        item => item.product.slug === productSlug
      );
      var product = this.props.singleProducts[index];
      var name = product && product.product.name_en;
    } else {
      var product = {};
      product.product = {};
      product.product.details = {};
    }

    return (
      <div className="single-page main-content edit-info">
        <Paper style={{ width: "100%" }} zDepth={3}>
          <SinglePageToolbar
            editAble={false}
            closeModal={this.props.closeModal}
            inModal={this.props.inModal}
          />
          {!this.props.newProductSlug && <StartupWidgetMoreInfo {...product} />}
          <div className="share-info">
            {`Share your info about ${name || "it "} with us!`}
          </div>
          <form className="edit-info-form">
            <TextField
              id="extra_url"
              defaultValue={product ? product.product.details.extra_url : ""}
              className="three-field"
              floatingLabelText="extra url"
              onChange={this.textFieldChangeHandler}
            />
            <TextField
              id="email"
              defaultValue={product.product.details.email}
              className="three-field"
              floatingLabelText="email address"
              type="email"
              onChange={this.textFieldChangeHandler}
            />
            {/* <TextField
              id="employees"
              defaultValue={product.product.details.employees}
              className="three-field"
              floatingLabelText="Number of Employees"
              onChange={this.textFieldChangeHandler}
            /> */}
            <AutoComplete
              id="employees"
              hintText="Type A Number"
              floatingLabelText="Number of Employees"
              dataSource={empRange}
              defaultValue={product.product.details.employees}
              filter={AutoComplete.caseInsensitiveFilter}
              searchText={this.state.empRangeSearchTerm}
              maxSearchResults={5}
              style={{ width: "30%" }}
              textFieldStyle={{ width: "auto" }}
              onUpdateInput={this.updateEmpRangeSearchTerm}
              onNewRequest={this.setEmpRangeFormData}
              openOnFocus
            />
            <TextField
              id="year"
              defaultValue={product.product.details.year}
              className="three-field"
              floatingLabelText="Launch Year"
              onChange={this.textFieldChangeHandler}
            />
            <TextField
              id="city"
              defaultValue={product.product.details.city}
              className="three-field"
              floatingLabelText="City"
              onChange={this.textFieldChangeHandler}
            />
            <TextField
              id="country"
              defaultValue={product.product.details.country}
              className="three-field"
              floatingLabelText="Country"
              onChange={this.textFieldChangeHandler}
            />
            {/*<TagAutoCompleteInput
              categories={this.props.categories}
              onChange={this.handleAddTag}
              defaultValue={product.product.categories}
            /> */}
            <TextField
              id="description_en"
              defaultValue={product.product.details.description_en}
              fullWidth={true}
              rows={3}
              multiLine={true}
              floatingLabelText="What do they do?"
              onChange={this.textFieldChangeHandler}
            />
            <TextField
              id="android_app"
              defaultValue={product.product.details.android_app}
              fullWidth={true}
              floatingLabelText="Android App Url"
              onChange={this.textFieldChangeHandler}
            />
            <TextField
              id="ios_app"
              defaultValue={product.product.details.ios_app}
              fullWidth={true}
              floatingLabelText="iOs App Url"
              onChange={this.textFieldChangeHandler}
            />
            <TextField
              id="linkedin"
              defaultValue={product.product.details.linkedin}
              className="three-field"
              floatingLabelText="Linkedin profile"
              onChange={this.textFieldChangeHandler}
            />
            <TextField
              id="twitter"
              defaultValue={product.product.details.twitter}
              className="three-field"
              floatingLabelText="Twitter Account"
              onChange={this.textFieldChangeHandler}
            />
            <TextField
              id="instagram"
              defaultValue={product.product.details.instagram}
              className="three-field"
              floatingLabelText="Instagram profile"
              onChange={this.textFieldChangeHandler}
            />
            <div className="full upload-button">
              <div>
                <div
                  className="upload-logo-text"
                  onClick={() => this.uploadButton.click()}
                >
                  {this.state.selectedLogoFilename || "upload logo"}
                </div>
                <IconButton
                  style={{ width: "24px", height: "24px", padding: 0 }}
                >
                  <label
                    htmlFor="logo"
                    ref={node => (this.uploadButton = node)}
                  >
                    <FileFileUpload />
                  </label>
                  <input
                    onChange={this.handleLogoFile}
                    type="file"
                    id="logo"
                    name="logo"
                    accept="image/*"
                    className="input-file"
                  />
                </IconButton>
              </div>
            </div>
          </form>
          <div className="submit-edit">
            <RaisedButton
              label="Submit for review"
              primary={true}
              onClick={this.handleSubmit}
            >
              {this.state.aSyncCall && (
                <PulseLoader color="#FFFFFF" size="6px" />
              )}
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

EditInfo.propTypes = {};

function mapStateToProps(state) {
  return {
    token: state.auth.token,
    categories: state.categories
  };
}
export default connect(mapStateToProps)(EditInfo);

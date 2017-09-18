import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/actionCreators";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import SinglePageToolbar from "./SinglePageToolbar";
import SinglePageMain from "./SinglePageMain";
import TextField from "material-ui/TextField";
import CircularProgress from "material-ui/CircularProgress";
import AutoComplete from "material-ui/AutoComplete";
import Snackbar from "material-ui/Snackbar";
import { appendToFormData } from "../../helpers/helpers";
import MoneyInput from "../sharedComponents/MoneyInput";

const autoCompleteMenuStyles = {
  maxHeight: "200px",
  overflowY: "auto"
};

const currentYear = new Date().getFullYear();

const years = [];
for (let year = 1990; year <= currentYear; year++) {
  years.unshift(String(year));
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

class SinglePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      slug: "",
      isLoading: false,
      invModalIsOpen: false,
      addInvRecFormData: {},
      allProducts: [],
      autoCompleteSelection: null,
      proofDocument: null,
      notificationMessage: "",
      notificationIsOpen: false,
      allProductsNameOnly: [],
      yearSearchTerm: "",
      monthSearchTerm: ""
    };
  }

  componentDidMount = () => {
    if (this.props.authenticated) {
      this.props.getPreviousUserRates(this.props.params.startUpName);
    }
  };

  componentWillMount = () => {
    const productName = this.props.params.startUpName;
    const indexOfProductInStore = this.isCached(productName);

    if (indexOfProductInStore === -1) {
      this.setState({ isLoading: true });
      this.props.getSingleProduct(productName).then(product => {
        this.setState({
          product,
          isLoading: false,
          slug: product.product.slug
        });
      });
    } else {
      this.setState({
        product: this.props.singleProducts[indexOfProductInStore],
        slug: this.props.singleProducts[indexOfProductInStore].product.slug,
        isLoading: false,
      });
    }
    // load all products to use in autocomplete
    this.props.getAllProductsSlimVersion().then(allProducts => {
      this.setState({
        allProducts,
        allProductsNameOnly: allProducts.map(item => item.name_en)
      });
    });
  };

  handleYearSelection = selectedYear => {
    this.setState({
      addInvRecFormData: { ...this.state.addInvRecFormData, year: selectedYear }
    });
  };

  updateYearSearchTerm = input => {
    this.setState({ yearSearchTerm: input });
  };

  updateMonthSearchTerm = input => {
    this.setState({ monthSearchTerm: input });
  };

  handleMonthSelection = selectedMonth => {
    this.setState({
      addInvRecFormData: {
        ...this.state.addInvRecFormData,
        month: months.indexOf(selectedMonth)
      }
    });
  };

  isCached = productName => {
    //should check for the data in store and return the index in singleProducts
    let temp = this.props.singleProducts || [];
    const index = temp.findIndex(item => item.product.slug === productName);
    return index;
  };

  updateInvRecFormData = (value, fieldName) => {
    const { addInvRecFormData } = this.state;
    this.setState({
      addInvRecFormData: { ...addInvRecFormData, [fieldName]: value }
    });
  };

  handleInvRecAdd = () => {
    this.openInvRecordModal();
  };

  closeInvRecordModal = () => {
    this.setState({ invModalIsOpen: false });
  };

  openInvRecordModal = () => {
    this.setState({ invModalIsOpen: true });
  };

  handleAutoCompleteSelection = selected => {
    const investor = this.state.allProducts.find(
      product => product.name_en === selected
    );
    this.setState({ autoCompleteSelection: investor.slug });
  };

  handleProofDocument = event => {
    this.setState({ proofDocument: event.target.files[0] });
  };

  handleRequestClose = () => {
    this.setState({ notificationIsOpen: false });
  };

  handleSubmit = () => {
    const {
      autoCompleteSelection,
      proofDocument,
      addInvRecFormData,
      slug
    } = this.state;

    const data = {
      invested_on: slug,
      investor: autoCompleteSelection,
      document: proofDocument,
      ...addInvRecFormData
    };

    if (this.isValid(data)) {
      const formData = appendToFormData(data);
      this.setState({ aSyncCall: true });
      this.props
        .postNewInvestmentRecord(formData)
        .then(() => {
          this.setState({
            aSyncCall: false,
            addInvRecFormData: {},
            invModalIsOpen: false,
            notificationIsOpen: true,
            notificationMessage:
              "Thanks for submitting new information, we will review it"
          });
        })
        .catch(error => {
          this.setState({
            aSyncCall: false,
            notificationIsOpen: true,
            notificationMessage: "Unable to submit the form"
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

  isValid = formData => {
    return Boolean(formData.investor);
  };

  render() {
    const actions = [
      <FlatButton label="Cancel" onClick={this.closeInvRecordModal} />,
      <FlatButton
        label="Submit"
        disabled={this.state.aSyncCall}
        primary={true}
        onClick={this.handleSubmit}
      />
    ];
    return (
      <div className="single-page main-content">
        {/* {this.state.isLoading ? (
          <CircularProgress id="spinner" color={"#2962FF"} size={50} />
        ) : ( */}
        <SinglePageMain
          product={this.state.product}
          userRate={this.props.userRates[this.props.params.startUpName]}
          slug={this.state.slug}
          auth={this.props.authenticated}
          handleInvRecAdd={this.handleInvRecAdd}
          isLoading={this.state.isLoading}
        >
          {/*<SinglePageToolbar
              editAble={true}
              showInvestmentRecord={true}
              slug={this.state.slug}
              auth={this.props.authenticated}
              handleInvRecAdd={this.handleInvRecAdd}
            />*/}
        </SinglePageMain>
        {/* )} */}
        <Dialog
          title="Add Investment Record"
          actions={actions}
          modal={false}
          autoScrollBodyContent={true}
          open={this.state.invModalIsOpen}
          onRequestClose={this.closeInvRecordModal}
        >
          <div id="add-investment-record-form">
            <AutoComplete
              floatingLabelText="Investor (*)"
              filter={AutoComplete.caseInsensitiveFilter}
              searchText={this.state.searchText}
              dataSource={this.state.allProductsNameOnly}
              openOnFocus
              menuStyle={autoCompleteMenuStyles}
              onNewRequest={this.handleAutoCompleteSelection}
              fullWidth
            />
            <MoneyInput
              floatingLabelText="How Much Investment $"
              type="text"
              fullWidth
              onChange={value =>
                this.updateInvRecFormData(value.replace(/,/g, ""), "amount")}
              mask="999,999,999,999,999,999"
            />
            <div className="two-columns">
              <AutoComplete
                filter={AutoComplete.caseInsensitiveFilter}
                floatingLabelText="Year Of Investment"
                searchText={this.state.yearSearchTerm}
                dataSource={years}
                openOnFocus
                onUpdateInput={this.updateYearSearchTerm}
                menuStyle={autoCompleteMenuStyles}
                onNewRequest={this.handleYearSelection}
              />
              <AutoComplete
                filter={AutoComplete.caseInsensitiveFilter}
                floatingLabelText="Month Of Investment"
                searchText={this.state.monthSearchTerm}
                dataSource={months}
                openOnFocus
                onUpdateInput={this.updateMonthSearchTerm}
                menuStyle={autoCompleteMenuStyles}
                onNewRequest={this.handleMonthSelection}
              />
            </div>
            <TextField
              fullWidth
              floatingLabelText="Extra Information"
              multiLine
              onChange={(_, val) => this.updateInvRecFormData(val, "text")}
            />
            <TextField
              fullWidth
              floatingLabelText="Proof Link"
              onChange={(_, val) => this.updateInvRecFormData(val, "link")}
            />
            <label htmlFor="proof">
              <span style={{ marginRight: "20px" }}>Proof Document</span>
              <input
                type="file"
                name="proof"
                id="proof"
                style={{ marginTop: "20px" }}
                onChange={this.handleProofDocument}
              />
            </label>
          </div>
        </Dialog>
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

// form fields:
// invested_on => current product
// investor => from list
// amount
// investor_name
// text
// year
// month
// link
// document => file

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    singleProducts: state.singleProducts,
    userRates: state.userRates || {}
  };
}

export default connect(mapStateToProps, actions)(SinglePage);

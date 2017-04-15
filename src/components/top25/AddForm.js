import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/actionCreators';

import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle';

class AddForm extends React.Component {
  constructor () {
    super();
    this.state = {
      product_type : 1,
      chipList : [],
      categoryIds : [],
      errors: {},
      snackBarOpen: false,
      addStartUpResponseText: '',
      name_en: '',
      website: '',
      aSyncCall: false,
      aSyncSuccess: false,
      categories: [],
    };
    this.styles = {
     chip: {
       margin: 4,
     },
   };
  }

  componentDidMount = () => {
    this.setState({categories: this.props.categories});
  }

  handleSelectFieldChange = (event, index, selectFieldValue) => this.setState({product_type: selectFieldValue});

  handleFormFields = (event, value) => {
    const field = event.target.name;
    field === 'name_en' && this.setState({name_en: value})
    field === 'website' && this.setState({website: value})
  };

  handleAddTag = tag => {
    if (this.state.chipList.length < 3) {
      let chipList = this.state.chipList;
      let categoryIds = this.state.categoryIds;
      let index = this.state.categories.findIndex(item => item.name_en === this.state.searchText)
      categoryIds.push(this.state.categories[index].id)
      chipList.push(this.state.searchText);
      this.setState({chipList, searchText: ''});
    }
  };

  handleRequestDelete = key => {
    const chips = this.state.chipList;
    chips.splice(key, 1);
    this.setState({chipList: chips});
  };

  handleUpdateInput = searchText => {
    this.setState({
      searchText: searchText,
    });
  };

  handleSnackBarClose = () => {
    //this will not do anything because when it is called the component is unmounted
    this.setState({
      snackBarOpen: false,
    });
    // this.props.aSyncSuccess && this.props.closeModal();
  };

  handleSubmit = () => {

    const formData = {
      name_en: this.state.name_en,
      website: this.state.website,
      product_type: this.state.product_type,
      categories: this.state.categoryIds
    }
    const validationResult = this.validateForms(formData);
    if (validationResult.valid) {
      this.clearStateAndSubmit(formData)
      this.setState({aSyncCall: true});
    } else {
      this.setState({errors: validationResult.errors})
    }
  }
  clearStateAndSubmit = formData => {
    this.setState({errors: {}});
    this.props.submitProduct(formData)
      .then(response => {
        if (response.success) {
          this.props.persistNewProduct(response.slug)
          // set state is not needed anymore, user is redirected
          // this.setState({
          //   addStartUpResponseText: 'successfully submitted, we will review it asap!',
          //   product_type : 1,
          //   chipList : [],
          //   errors: {},
          //   snackBarOpen: true,
          //   name_en: '',
          //   website: '',
          //   aSyncCall: false,
          //   aSyncSuccess: true
          // });\
        } else {
          debugger
          //check for error object and respond accordingly
          // or close the modal ?
          let errorText = Object.values(response.detail).join(', ')  
          this.setState({
            addStartUpResponseText: errorText,
            snackBarOpen: true,
            aSyncCall: false,
          });
        }
      })
      .catch(response => {
        let errorText = Object.values(response.detail).join(', ')
        this.setState({
          addStartUpResponseText: errorText,
          snackBarOpen: true,
          aSyncCall: false,
        });
      });
  }

  validateForms = formData => {
    const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);
    let valid = true;
    let errors = {};

    if (formData.categories.length === 0) {
      errors.categories = 'select at least 1 category form this list'
      valid = false
    }
    if (!formData.name_en || formData.name_en === '' || formData.name_en.length <= 1) {
      errors.name = 'name is rquired !';
      valid = false;
    }
    if (!formData.website || formData.website === '') {
      errors.website = 'website address is required';
      valid = false;
    } else if (!formData.website.match(regex)) {
      errors.website = 'please enter a valid website address'
      valid = false;
    }
    return {valid, errors};
  }

  generateSubmitArea = () => {
    if (this.state.aSyncCall) {
      return <CircularProgress style={{height: '36px'}} />;
    } else if (this.state.aSyncSuccess) {
      return <ActionCheckCircle style={{fill: '#00bcd4', transform: 'scale(1.8)'}} />;
    } else {
      return <RaisedButton label="next" primary={true} onClick={this.handleSubmit} />
    }
  }

  render() {
    return (
      <div className='add-form'>
        <div><h3>Add a Product!</h3></div>
        <div>
          <TextField
            name='name_en'
            errorText={this.state.errors.name}
            floatingLabelText="Product Name"
            onChange={(event, newValue)=>this.handleFormFields(event, newValue)}/>
        </div>
        <div>
          <TextField
            name='website'
            errorText={this.state.errors.website}
            floatingLabelText="Product Website"
            onChange={(event, newValue)=>this.handleFormFields(event, newValue)}/>
        </div>
        <div>
          <SelectField
            name='product_type'
            floatingLabelText="Product Type"
            value={this.state.product_type}
            onChange={this.handleSelectFieldChange}>
              {this.props.productTypes.map((type, i) => <MenuItem key={i} value={type.id} primaryText={type.name} />)}
          </SelectField></div>
        <div>
          <AutoComplete
            errorText={this.state.errors.categories}
            floatingLabelText="Add Categories (use suggestions)"
            filter={AutoComplete.caseInsensitiveFilter}
            searchText={this.state.searchText}
            dataSource={this.state.categories.map(item => item.name_en)}
            openOnFocus={true}
            maxSearchResults={3}
            onUpdateInput={this.handleUpdateInput}
            onNewRequest={(tag) => this.handleAddTag(tag)}
          />
        </div>
        <br/>
        <div className='chip-wrapper'>
          {this.state.chipList
            .map((chipName, i) => <Chip
              key={i}
              onRequestDelete={() => this.handleRequestDelete(i)}
              style={this.styles.chip}>
            {chipName}
          </Chip>)}
        </div>
        <br/>

        <div>
          {this.generateSubmitArea()}
        </div>
        <Snackbar
          open={this.state.snackBarOpen}
          message={this.state.addStartUpResponseText}
          autoHideDuration={5000}
          onRequestClose={this.handleSnackBarClose}
        />
      </div>
    );
  }
}

AddForm.propTypes = {
};

function mapStateToProps(state) {
  return {
    categories: state.categories,
    productTypes: state.productTypes,
  }
}
export default connect(mapStateToProps, actions)(AddForm);

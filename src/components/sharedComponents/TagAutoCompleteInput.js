import React, { Component } from "react";
import AutoComplete from "material-ui/AutoComplete";
import Chip from "material-ui/Chip";

const autoCompleteMenuStyles = {
  maxHeight: "200px",
  overflowY: "auto",
  width: "100%"
};

const chipsStyles = {
  chip: {
    margin: 4
  }
};
export default class TagAutoCompleteInput extends Component {
  constructor(props) {
    super(props);
    this.state = { searchText: "", chipList: [] };
  }

  componentDidMount = () => {
    if (
      this.props.categories.length > 0 &&
      this.props.defaultValue.length > 0
    ) {
      const defaults = this.props.defaultValue.map(categorySlug =>
        this.props.categories.find(category => category.slug === categorySlug)
      );
      this.setState({
        chipList: defaults
      });
    }
  };

  handleUpdateInput = searchText => {
    this.setState({ searchText });
  };

  handleAddTag = tag => {
    // tag is a string -> name_en of the category
    // only 3 cats are accepted
    if (this.state.chipList.length < 3) {
      const chipList = this.state.chipList;

      const selectedCategory = this.props.categories.find(
        item => item.name_en === tag
      );
      chipList.push(selectedCategory);

      this.setState({ chipList, searchText: "" }, this.notifyParent);
    }
  };

  handleRequestDelete = key => {
    const chips = this.state.chipList;
    chips.splice(key, 1);
    this.setState({ chipList: chips }, this.notifyParent);
  };

  notifyParent = () => {
    this.props.onChange(this.state.chipList);
  };

  render() {
    const { categories = [] } = this.props;
    return (
      <div id="tag-auto-complete-input">
        <AutoComplete
          floatingLabelText="Add Categories (use suggestions)"
          filter={AutoComplete.caseInsensitiveFilter}
          searchText={this.state.searchText}
          dataSource={categories.map(item => item.name_en)}
          openOnFocus={true}
          menuStyle={autoCompleteMenuStyles}
          textFieldStyle={{ width: "100%" }}
          onUpdateInput={this.handleUpdateInput}
          onNewRequest={tag => this.handleAddTag(tag)}
        />
        <br />
        <div className="chip-wrapper">
          {this.state.chipList.map((category, i) => (
            <Chip
              key={i}
              onRequestDelete={() => this.handleRequestDelete(i)}
              style={chipsStyles}
            >
              {category.name_en}
            </Chip>
          ))}
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import AutoComplete from "material-ui/AutoComplete";
import Chip from "material-ui/Chip";

const autoCompleteMenuStyles = {
  maxHeight: "200px",
  overflowY: "auto"
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

  handleUpdateInput = searchText => {
    this.setState({ searchText });
  };

  handleAddTag = tag => {
    console.log(tag);
    if (this.state.chipList.length < 3) {
      let chipList = this.state.chipList;
      let categoryIds = this.state.categoryIds;
      let index = this.state.categories.findIndex(
        item => item.name_en === this.state.searchText
      );
      categoryIds.push(this.state.categories[index].id);
      chipList.push(this.state.searchText);
      this.setState({ chipList, searchText: "" });
    }
  };

  handleRequestDelete = key => {
    const chips = this.state.chipList;
    chips.splice(key, 1);
    this.setState({ chipList: chips });
  };

  render() {
    const { categories = [] } = this.props;
    return (
      <div>
        <AutoComplete
          floatingLabelText="Add Categories (use suggestions)"
          filter={AutoComplete.caseInsensitiveFilter}
          searchText={this.state.searchText}
          dataSource={categories.map(item => item.name_en)}
          openOnFocus={true}
          menuStyle={autoCompleteMenuStyles}
          onUpdateInput={this.handleUpdateInput}
          onNewRequest={tag => this.handleAddTag(tag)}
        />
        <br />
        <div className="chip-wrapper">
          {this.state.chipList.map((chipName, i) => (
            <Chip
              key={i}
              onRequestDelete={() => this.handleRequestDelete(i)}
              style={chipsStyles}
            >
              {chipName}
            </Chip>
          ))}
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import Select from "react-select";
import "../../styles/sortBy.css";

class SortBy extends Component {
  state = {};

  render() {
    const { sortBy, options } = this.props;
    return (
      <React.Fragment>
        <Select onChange={sortBy} options={options}></Select>
      </React.Fragment>
    );
  }
}

export default SortBy;

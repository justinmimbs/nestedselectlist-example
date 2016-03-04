require('./main.css');

import React from 'react';
import ReactDOM from 'react-dom';
import NestedSelectList from './components/NestedSelectList';
import _locations from './locations';

class LocationSelectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: _locations,
      selectedKey: null,
    };
    this.handleSelectItem = this.handleSelectItem.bind(this);
  }

  handleSelectItem(data) {
    console.log(`${data.level}: ${data.key}`);
    this.setState({ selectedKey: data.key });
  }

  render() {
    return (
      <NestedSelectList
        className="locations"
        values={this.state.locations}
        selectedKey={this.state.selectedKey}
        onSelectItem={this.handleSelectItem}
      />
    );
  }
}

function init() {
  ReactDOM.render(<LocationSelectList />, document.querySelector('#output'));
}

window.addEventListener('DOMContentLoaded', init);

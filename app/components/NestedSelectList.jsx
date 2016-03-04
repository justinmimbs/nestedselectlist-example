require('./NestedSelectList.css');

import React, { PropTypes } from 'react';
import NestedSelectListItem from './NestedSelectListItem';

const propTypes = {
  values: PropTypes.arrayOf(NestedSelectListItem.propTypes.data).isRequired,
  onSelectItem: PropTypes.func,
  selectedKey: PropTypes.string,
  className: PropTypes.string,
};

class NestedSelectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { highlightedKey: null };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleItemMouseOver = this.handleItemMouseOver.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleItemClick(data) {
    if (data.key !== this.props.selectedKey) {
      this.props.onSelectItem(data);
    }
  }

  handleItemMouseOver(key) {
    this.setState({ highlightedKey: key });
  }

  handleMouseLeave() {
    this.setState({ highlightedKey: null });
  }

  render() {
    const className = ['nested-select-list', this.props.className].filter(x => x).join(' ');
    const root = {
      selectedKey: this.props.selectedKey,
      highlightedKey: this.state.highlightedKey,
      onClick: this.handleItemClick,
      onMouseOver: this.handleItemMouseOver,
    };

    return (
      <ul className={className} onMouseLeave={this.handleMouseLeave}>
        {this.props.values.map(item =>
          <NestedSelectListItem key={item.key} data={item} root={root} />
        )}
      </ul>
    );
  }
}

NestedSelectList.propTypes = propTypes;

export default NestedSelectList;

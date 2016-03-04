import React, { PropTypes } from 'react';

function cx(classMap) {
  return Object.keys(classMap)
    .filter(key => classMap[key])
    .join(' ');
}

const propTypes = {
  data: PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string,
    values: PropTypes.arrayOf(PropTypes.object), // arrayOf(NestedSelectListItem.propTypes.data)
  }).isRequired,
  root: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
    onMouseOver: PropTypes.func.isRequired,
    selectedKey: PropTypes.string,
    highlightedKey: PropTypes.string,
  }).isRequired,
};

class NestedSelectListItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
  }

  handleClick() {
    this.props.root.onClick(this.props.data);
  }

  handleMouseOver() {
    this.props.root.onMouseOver(this.props.data.key);
  }

  render() {
    const props = this.props;
    const className = cx({
      selected: props.root.selectedKey === props.data.key,
      highlighted: props.root.highlightedKey === props.data.key,
    });
    return (
      <li className={className}>
        <label onClick={this.handleClick} onMouseOver={this.handleMouseOver}>
          {props.data.label || props.data.key}
        </label>
        {props.data.values
          ? <ul>
            {props.data.values.map(item =>
              <NestedSelectListItem key={item.key} data={item} root={props.root} />
            )}
            </ul>
          : null}
      </li>
    );
  }
}

NestedSelectListItem.propTypes = propTypes;

export default NestedSelectListItem;

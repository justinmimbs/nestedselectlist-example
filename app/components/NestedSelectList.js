require("./NestedSelectList.css");
var React = require("react");

function cx(classMap) {
    return Object.keys(classMap)
        .filter(function (key) { return classMap[key]; })
        .join(" ");
}

function NestedSelectListItem(props) {
    return React.DOM.li({
            className: cx({
                "selected": props.root.selectedKey === props.data.key,
                "highlighted": props.root.highlightedKey === props.data.key
            })
        },
        React.DOM.label({
                onClick: props.root.onClick.bind(null, props.data),
                onMouseOver: props.root.onMouseOver.bind(null, props.data.key)
            },
            props.data.label || props.data.key
        ),
        props.data.values ?
            React.DOM.ul(null, props.data.values.map(function (item) {
                return React.createElement(NestedSelectListItem, {key: item.key, data: item, root: props.root})
            }))
        :
            null
    );
}
NestedSelectListItem.propTypes = {
    data: React.PropTypes.shape({
        key:    React.PropTypes.string.isRequired,
        label:  React.PropTypes.string,
        values: React.PropTypes.arrayOf(React.PropTypes.object) // arrayOf(NestedSelectListItem.propTypes.data)
    }).isRequired,
    root: React.PropTypes.shape({
        onClick:        React.PropTypes.func.isRequired,
        onMouseOver:    React.PropTypes.func.isRequired,
        selectedKey:    React.PropTypes.string,
        highlightedKey: React.PropTypes.string
    }).isRequired
};

var NestedSelectList = React.createClass({
        displayName: "NestedSelectList",
        propTypes: {
            values: React.PropTypes.arrayOf(NestedSelectListItem.propTypes.data).isRequired,
            onSelectItem: React.PropTypes.func,
            selectedKey: React.PropTypes.string,
            className: React.PropTypes.string
        },
        handleItemClick: function (data) {
            if (data.key !== this.props.selectedKey) {
                this.props.onSelectItem(data);
            }
        },
        handleItemMouseOver: function (key) {
            this.setState({highlightedKey: key});
        },
        handleMouseLeave: function () {
            this.setState({highlightedKey: null});
        },
        getInitialState: function () {
            return {
                highlightedKey: null
            };
        },
        render: function () {
            var values = this.props.values;
            return React.DOM.ul({
                    className: ["nested-select-list", this.props.className].filter(function (x) { return x; }).join(" "),
                    onMouseLeave: this.handleMouseLeave
                },
                values.map(function (item) {
                    var root = {
                            selectedKey: this.props.selectedKey,
                            highlightedKey: this.state.highlightedKey,
                            onClick: this.handleItemClick,
                            onMouseOver: this.handleItemMouseOver
                        };
                    return React.createElement(NestedSelectListItem, {key: item.key, data: item, root: root})
                }, this)
            );
        }
    });

module.exports = NestedSelectList;

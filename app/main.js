require("./main.css");
var React = require("react");
var ReactDOM = require("react-dom");
var NestedSelectList = require("./components/NestedSelectList");
var locations = require("./locations");

var LocationSelectList = React.createClass({
        getInitialState: function () {
            return {
                locations: locations,
                selectedKey: null
            };
        },
        handleSelectItem: function (data) {
            console.log([data.level, data.key].join(": "));
            this.setState({selectedKey: data.key});
        },
        render: function () {
            return React.createElement(NestedSelectList, {
                    className: "locations",
                    values: this.state.locations,
                    selectedKey: this.state.selectedKey,
                    onSelectItem: this.handleSelectItem
                }
            );
        }
    });

function init() {
    ReactDOM.render(React.createElement(LocationSelectList), document.querySelector("#output"));
}

window.addEventListener("DOMContentLoaded", init);

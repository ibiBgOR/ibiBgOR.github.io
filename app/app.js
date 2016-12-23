var h = React.createElement;

var App = React.createClass({
  render: function() {
    return (
      h('div', null,
        h(Front, null),
        h(Seats, null)
      )
    );
  }
});

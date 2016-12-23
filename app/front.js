var h = React.createElement;

var Front = React.createClass({
  render: function() {
    return (
      h('div', { 'id': 'front' },
        h('div', { 'id': 'left-curtain', 'className': 'curtain' }),
        h(Screen, null),
        h('div', { 'id': 'right-curtain', 'className': 'curtain' })
      )
    );
  }
});

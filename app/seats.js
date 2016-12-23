var h = React.createElement;
var IMAGE_HEIGHT = 35; //px
var IMAGE_WIDTH = 100; //px

var Seats =  React.createClass({
  getInitialState: function(){
    return { viewportwidth: undefined, viewportheight: undefined };
  },

  componentDidMount: function() {
    var seats = document.getElementById("seats");
    if (typeof window.innerWidth != "undefined") {
      this.setState({
        viewportwidth: seats.clientWidth - 50,
        viewportheight: seats.clientHeight
      });
    }
  },

  render: function() {
    if (this.state.viewportwidth === undefined || this.state.viewportheight === undefined) {
      return h('div', { 'id': 'seats' });
    }

    var seatrows = [];

    var toggle = false;

    for (i = 0; i < this.state.viewportheight; i += IMAGE_HEIGHT) {
      var seatrow = [];

      var dynamicSeatWidth = 35 - (i / 7);

      for (j = 0; j < this.state.viewportwidth; j += IMAGE_WIDTH) {
        seatrow.push(h('img', { 'key': 'seat' + i + j, 'className': 'seat', 'src': '../img/seat.png', 'style': { 'marginTop': '-' + dynamicSeatWidth + 'px' } }));
      }
      toggle = !toggle;

      if (toggle) {
        seatrows.push(h('div', { 'key': 'seatrow' + i, 'className': 'seatrow even' }, seatrow));
      } else {
        seatrows.push(h('div', { 'key': 'seatrow' + i, 'className': 'seatrow uneven' }, seatrow));
      }
    }

    return (
      h('div', { 'key': 'seats', 'id': 'seats' }, seatrows)
    );
  }
});

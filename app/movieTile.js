var h = React.createElement;

var BASE_IMAGE_PATH = "http://image.tmdb.org/t/p/w185";

var MovieTile = React.createClass({
  getInitialState: function() {
    return {
      transitionCssClass: "",
      transitionStyle: {}
    };
  },

  onImageLoaded: function() {
    this.setState({
      transitionCssClass: "imageFadeIn",
      transitionStyle: {
        'transition': 'all .5s ' + this.props.index/6 + 's'
      }
    });
  },

  onImageClicked: function() {
    this.props.onClick(this.props.movie);
  },

  render: function() {
    return (
      h('div', { 'key': this.props.movie.id, 'className': 'movieWrapper hoverTransition', 'onClick': this.onImageClicked },
        h('img', { 'key': this.props.movie.id + 'img', 'src': BASE_IMAGE_PATH + this.props.movie.poster_path, 'onLoad': this.onImageLoaded, 'className': 'movie ' + this.state.transitionCssClass, 'style': this.state.transitionStyle })
      )
    );
  }
});

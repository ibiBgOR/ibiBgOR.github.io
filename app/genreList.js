var h = React.createElement;

var GenreList = React.createClass({
  render: function() {
    if (!this.props.genres) {
      return null;
    }

    var genres = [];

    this.props.genres.forEach(genre => {
      genres.push(
        h('div', {
          'id': genre.name,
          'key': genre.name,
          'className': 'genreItem'
        }, genre.name)
      );
    });

    return (
      h('div', { 'id': 'genreList' },
        h('h2', null, "Genres:"),
        h('div', null, genres)
      )
    );
  }
});

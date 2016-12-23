var h = React.createElement;

var UPCOMING = "UPCOMING";
var UPCOMING_URL = "https://api.themoviedb.org/3/movie/upcoming?api_key=4a2a0b517d5ecae60eae89248998b237&language=de_DE&region=de&page=";
var NOW_PLAYING = "NOW_PLAYING";
var NOW_PLAYING_URL = "https://api.themoviedb.org/3/movie/now_playing?api_key=4a2a0b517d5ecae60eae89248998b237&language=de-de&region=de&page=";

var Screen = React.createClass({
  getInitialState: function(){
    return {
      page: 1,
      max_upcoming_sites: 1,
      max_now_playing_sites: 1,
      result: [],
      showLoadingScreen: false,
      showDetailView: undefined
    };
  },

  loadMovies: function(url, page) {
    loadContent(
      url + page,
      () => { this.setState({ showLoadingScreen: true }); },
      (content) => {
        var accessor = "";
        var newState = {};
        var result = this.state.result;

        if (url.startsWith(UPCOMING_URL)) {
          accessor = UPCOMING;
          newState['max_upcoming_sites'] = content.total_pages;
        } else if (url.startsWith(NOW_PLAYING_URL)) {
          accessor = NOW_PLAYING;
          newState['max_now_playing_sites'] = content.total_pages;
        } else {
          accessor = url;
        }
        if (result[accessor] === undefined) {
          result[accessor] = [];
        }
        result[accessor] = result[accessor].concat(content.results);

        newState['result'] = result;
        newState['page'] = page + 1;
        newState['showLoadingScreen'] = false;

        this.setState(newState);
      }
    );
  },

  // Load data from web
  componentWillMount: function() {
    this.loadMovies(NOW_PLAYING_URL, this.state.page);
    this.loadMovies(UPCOMING_URL, this.state.page);
  },

  componentDidUpdate: function() {
    if (this.state.showLoadingScreen || this.state.showDetailView) {
      return;
    }

    var self = this; // To access the state in the callback function.

    var options = {
      distance: 100,
      nestedElement: document.getElementById('screen'),
      callback: function(done) {
        if (self.state.page <= self.state.max_upcoming_sites) {
          self.loadMovies(UPCOMING_URL, self.state.page);
        }
        if (self.state.page <= self.state.max_now_playing_sites) {
          self.loadMovies(NOW_PLAYING_URL, self.state.page);
        }
        document.getElementById('screen').offsetTop = document.getElementById('screen').scrollTop;
        done();
      }
    }
    infiniteScroll(options);
  },

  shouldBeFiltered: function(movie) {
    // GenreId 27: Horror
    return movie.adult || movie.genre_ids.includes(27) || !movie.poster_path;
  },

  generateHeadline: function(key) {
    switch(key) {
      case UPCOMING:
      return "Bald im Kino";
      case NOW_PLAYING:
      return "Derzeit im Kino";
      default:
      return "";
    }
  },

  onMovieClicked: function(movie) {
    this.setState({ showDetailView: movie });
  },

  generateMovieColumn: function(key, movies) {
    var result = [];
    var headlineTitle = this.generateHeadline(key);
    result.push(h('div', { 'key': key, 'className': 'headline' }, headlineTitle));

    movies.forEach( (movie, index) => {
      if (!this.shouldBeFiltered(movie)) {
        result.push(h(MovieTile, { 'key': movie.id, 'movie': movie, 'index': index, 'onClick': this.onMovieClicked } ));
      }
    });

    return result;
  },

  render: function() {
    if (this.state.showLoadingScreen) {
      return (
        h('div', { 'id': 'screen' }, h(LoadingBackground, null))
      );
    } else if (this.state.showDetailView) {
      return (
        h('div', { 'id': 'screen' }, h(DetailView, { 'id': 'screen', 'movie': this.state.showDetailView, 'onBackPressed': () => { this.setState({ showDetailView: undefined }); } }))
      );
    }

    var movieColumns = [],
        keys = Object.keys(this.state.result);

    keys.sort();

    keys.forEach(key => {
      var movieColumn = this.generateMovieColumn(key, this.state.result[key]);

      movieColumns.push(h('div', { 'key': movieColumn.toString(), 'id': key, 'className': 'movierow' }, movieColumn));
    });

    return (
      h('div', { 'id': 'screen' }, movieColumns)
    );
  }
});

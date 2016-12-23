var detailUrl = "https://api.themoviedb.org/3/movie/{0}?api_key=4a2a0b517d5ecae60eae89248998b237&language=de-de&append_to_response=videos,images,release_dates";
var BASE_IMAGE_DETAIL_PATH = "http://image.tmdb.org/t/p/w500";

var h = React.createElement;

var DetailView = React.createClass({
  getInitialState: function() {
    return {
      showLoadingScreen: true,
      content: undefined,
      video: undefined
    }
  },

  componentWillMount: function() {
    loadContent(
      detailUrl.replace("{0}", this.props.movie.id),
      () => { this.setState({ showLoadingScreen: true }); },                              // before load
      (content) => { this.setState({ content: content, showLoadingScreen: false }); }     // after load
    );
  },

  onVideoClicked: function(video) {
    this.setState({ 'video': video });
  },

  render: function() {
    if (this.state.showLoadingScreen) {
      return (
        h(LoadingBackground, null)
      );
    } else if (this.state.video) {
      return (
        h('div', { 'id': 'videoPlayer' },
          h('img', { 'className': 'close', 'src': '../img/ic_close_black_24px.png', 'onClick': () => { this.setState({ 'video': undefined }); } }),
          h('iframe', {
            'id': 'video',
            'src': 'https://www.youtube.com/embed/' + this.state.video.key,
            'allowFullScreen': 'allowfullscreen',
            'mozAllowFullScreen': 'mozallowfullscreen',
            'msAllowFullScreen':'msallowfullscreen',
            'oAllowFullScreen':'oallowfullscreen',
            'webkitAllowFullScreen':'webkitallowfullscreen',
            'frameBorder': '0'
          })
        )
      );
    }

    var movie = this.state.content;

    var fsk = undefined;
    movie.release_dates.results.forEach(element => {
      if (element.iso_3166_1 == "DE") {
        fsk = element.release_dates[0].certification;
      }
    });

    var tagline = movie.tagline ? h('h2', null, movie.tagline) : null;

    return (
      h('div', { 'id': 'detailView' },
        h('img', { 'className': 'close', 'src': '../img/ic_close_black_24px.png', 'onClick': () => { this.props.onBackPressed(); } }),
        h('div', { 'id': 'viewContent' },
          h('img', { 'class': 'poster', 'src': BASE_IMAGE_DETAIL_PATH + movie.poster_path }),
          h('div', { 'id': 'detailContent'},
            h('h1', null, movie.title),
            tagline,
            h('div', { 'id': 'filmstart' }, "Filmstart: " + movie.release_date + " | Laufzeit: " + movie.runtime + " Min." + (fsk ? "| FSK: " + fsk : "")),
            h(GenreList, { 'genres': movie.genres }),
            h('div', { 'id': 'overview' },
              h('h2', null, "Filmbeschreibung:"),
              h('div', null, movie.overview)
            ),
            h(VideoCarousel, { 'videos': movie.videos.results, 'onVideoClicked': this.onVideoClicked })
          )
        )
      )
    );
  }
});

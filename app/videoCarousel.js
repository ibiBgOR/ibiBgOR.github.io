var h = React.createElement;

var BASE_VIDEO_PREVIEW_URL = "https://img.youtube.com/vi/{0}/default.jpg"

var VideoCarousel = React.createClass({
  render: function() {
    if (!this.props.videos) {
      return null;
    }

    var videos = [];

    this.props.videos.forEach(video => {
      videos.push(
        h('img', {
          'id': video.key,
          'key': video.key,
          'className': 'previewVideo',
          'src': BASE_VIDEO_PREVIEW_URL.replace('{0}', video.key),
          'alt': video.name,
          'title': video.name,
          'onClick': () => { this.props.onVideoClicked(video); }
        })
      );
    });

    return (
      h('div', { 'id': 'videoCarousel' },
        h('h2', null, "Videos:"),
        h('div', null, videos)
      )
    );
  }
});

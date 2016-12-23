

loadUpcomingMovies(NOW_PLAYING_URL, page, processMovies);
loadUpcomingMovies(UPCOMING_URL, page, processMovies);

var options = {
  distance: 100,
  nestedElement: screen,
  callback: function(done) {
    page++;
    if (page <= max_upcoming_sites) {
      loadUpcomingMovies(UPCOMING_URL, page, processMovies);
    }
    if (page <= max_now_playing_sites) {
      loadUpcomingMovies(NOW_PLAYING_URL, page, processMovies);
    }
    done();
  }
}

// setup infinite scroll
infiniteScroll(options);

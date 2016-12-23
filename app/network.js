function loadContent(url, beforeLoad, afterLoad) {
  beforeLoad();

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", url, true);
  xmlHttp.onload = () => {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      afterLoad(JSON.parse(xmlHttp.responseText));
    }
  }
  xmlHttp.send(null);
}

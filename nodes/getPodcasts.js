const axios = require("axios");
// xml parser
const DOMParser = require("xmldom").DOMParser;
const getFeed = async () => {
  const feedRes = await axios(
    "https://feed.podbean.com/rainforestalberta/feed.xml"
  );
  const feed = feedRes.data;
  let parser = new DOMParser();
  let xmlDoc = parser.parseFromString(feed, "text/xml");
  let items = xmlDoc.getElementsByTagName("item");

  // items is an object
  let podcastItems = [];
  let keys = Object.keys(items);
  for (let i = 0; i < keys.length; i++) {
    let item = items[keys[i]];
    if (item.nodeType === 1) {
      let pubDate =
        items[keys[i]].getElementsByTagName("pubDate")[0].childNodes[0]
          .nodeValue;
      let episode =
        items[keys[i]].getElementsByTagName("itunes:episode")[0].childNodes[0]
          .nodeValue;

      console.log("pubDate", pubDate);
      console.log("episode", episode);
      podcastItems.push({
        pubDate,
        episode,
      });
    }
  }
  return podcastItems;
};

module.exports = getFeed;

const axios = require("axios");
const { createDiffieHellmanGroup } = require("crypto");
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
      podcastItems.push({
        pubDate,
        episode,
      });
    }
  }
  return podcastItems;
};
const getPublishedDate = async (episodenumber) => {
  let feed = await getFeed();
  try {
    let date = feed.find(podcast => podcast.episode == episodenumber).pubDate
    let dateString = new Date(date)
      .toLocaleString("en-US", {
        timeZone: "America/Edmonton",
      })
      .replace(",", "");
    return dateString
  } catch (error) {
    console.log(error, episodenumber)
  }
}
module.exports = getPublishedDate;

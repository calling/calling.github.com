/*
 * now.js answers the question "What's up, Colin?". Including:
 * - What music am I listening to now?
 * - What books am I reading now?
 * now.js parses rss feeds with Google Feed API and constructs relevant DOM.
 */
(function() {
  "use strict";
  /* global google */
  google.load("feeds", "1");

  function dateToString(date) {
    return date.toDateString() + " " +
      ((date.getHours() % 12) < 10 ? "0" : "") + date.getHours() % 12 + ":" +
      (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
  }

  function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  /*
   * Returns a node inspired from a date, url and urlText
   * date is a date object
   * url is a string link
   * urlText is a string a describes url
   */
  function dateAndLinkToHtml(date, url, urlText) {
    var div = document.createElement("div");

    var dateString = dateToString(date);
    var timeElement = document.createElement("time");
    timeElement.appendChild(document.createTextNode(dateString));
    div.appendChild(timeElement);

    var titleElement = document.createTextNode(urlText);
    var anchor = document.createElement("a");
    anchor.className = "title";
    anchor.appendChild(titleElement);
    anchor.href = url;

    div.appendChild(anchor);

    return div;
  }

  /*
   * lastFMSongToHtml takes a song from the last.fm rss feed and returns html.
   * song is a POJSO consisting of:
   * - title: string of artist, em-dash, then song title
   * - publishedDate: string date song was listened to. In RFC-822 format.
   * - link: url to last.fm user page with my user GUID as a hash.
   * - contentSnippet: url to last.fm artist profile.
   * - content: AFAICT identical to contentSnippet.
   * - categories: Array that is empty. Unknown purpose.
   * - author: string that is empty. Unknown purpose.
   */
  function lastFMSongToHtml(song) {
    var date = new Date(song.publishedDate);
    return dateAndLinkToHtml(date, song.content, song.title);
  }

  /*
   * goodReadsBookToHtml takes a book from the Good Reads rss feed and
   * returns html.
   * book is a POJSO consisting of:
   * - title: Book title.
   * - publishedDate: string date when I added book to Good Reads. In RFC-822.
   * - link: Personalized url to book (my "review").
   * - contentSnippet: string that's whitespaced heavily. Contains author and
   * my name.
   * - content: String of HTML that contains link to book, author and
   * other unwanted info.
   * - categories: Array that is empty. Unknown purpose.
   * - author: string that is empty. Unknown purpose.
   */
  function goodReadsBookToHtml(book) {
    var date = new Date(book.publishedDate);
    var content = document.createElement("div");
    content.innerHTML = book.content;
    return dateAndLinkToHtml(date, content.firstChild.href, book.title);
  }

  /*
   * Appends a salt parameter to a url. Refreshes once per day.
   */
  function salt(url) {
    var now = new Date();
    var saltDate = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    var saltString = saltDate.getTime();
    if (url.indexOf("?") > -1) {
      return url + "&" + saltString;
    } else {
      return url + "?" + saltString;
    }
  }

  /*
   * Leverages Google Feed API to convert rss to html.
   * url is the feed's rss url.
   * func is the entry-to-html function.
   * id is the id on the DOM where we append entry elements. Also
   * used to create a header.
   */
  function rssToHtml(feedObj) {
    var url = feedObj.url;
    var func = feedObj.func;
    var id = feedObj.id;
    var desc = feedObj.desc;

    var feed = new google.feeds.Feed(salt(url));

    feed.setNumEntries(10);
    feed.load(function(result) {
      if (!result.error) {
        var container = document.getElementById(id);

        // Create header
        var headerElement = document.createElement("h2");
        headerElement.appendChild(document.createTextNode(capitaliseFirstLetter(id)));
        container.appendChild(headerElement);

        // Create byline
        var smallElement = document.createElement("small");
        smallElement.appendChild(document.createTextNode(desc));
        container.appendChild(smallElement);

        // HTML-ize each entry
        for (var i = 0; i < result.feed.entries.length; i++) {
          var entry = result.feed.entries[i];
          container.appendChild(func(entry));
        }
      }
    });
  }

  function initialize() {
    var feeds = [{
      url: "http://ws.audioscrobbler.com/1.0/user/likecolin/recenttracks.rss",
      func: lastFMSongToHtml,
      id: "music",
      desc: "What I am listening to"
    }, {
      url: "https://www.goodreads.com/review/list_rss/18475261?key=XcsEYye_PZ-at6g5lx30pQkXVbKO0-4aJmOZnu0Vi-gVCRuO&shelf=currently-reading",
      func: goodReadsBookToHtml,
      id: "books",
      desc: "What I am reading"
    }];

    feeds.forEach(rssToHtml);
  }

  google.setOnLoadCallback(initialize);
})();
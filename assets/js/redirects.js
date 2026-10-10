/* Legacy URL redirects — mirrors the old WordPress structure so that any
   bookmarked links from the original site keep working on kaasolai.in.

   Loaded on the Home page and the 404 page. Only acts when it finds a link
   from the original site (or a direct page_id), otherwise it does nothing.
   If the target URL differs from the current page, it does a client-side
   redirect. This runs after the page has painted, so broken links still show
   the normal page when JavaScript is disabled. */

(function () {
  "use strict";

  var legacy = [
    { id: 9,  url: "/personal-finance-roadmap/" },
    { id: 16, url: "/fundamental-analysis/" },
    { id: 19, url: "/technical-analysis/" },
    { id: 23, url: "/equity-funds/" },
    { id: 25, url: "/economics/" },
    { id: 49, url: "/market/" },
    { id: 219, url: "/corporate-action/" },
    { id: 246, url: "/retirement-planning/" },
    { id: 259, url: "/derivates/" },
    { id: 264, url: "/references/" },
    { id: 2,  url: "/" },    // original home page_id
    { id: 0,  url: "/" }     // unknown/page not found → home
  ];

  function findUrl(pageId) {
    for (var i = 0; i < legacy.length; i++) {
      if (legacy[i].id === pageId) {
        return legacy[i].url;
      }
    }
    return null;
  }

  function redirectTo(url) {
    if (!url || url === window.location.pathname) {
      return;
    }
    window.location.replace(url);
  }

  try {
    var params = new URLSearchParams(window.location.search);
    if (params.has("page_id")) {
      var id = parseInt(params.get("page_id"), 10);
      if (!isNaN(id)) {
        redirectTo(findUrl(id) || "/");
        return;
      }
    }

    var path = window.location.pathname;
    var m = path.match(/^\/(\d{4})\/\d{2}\/\d{2}\/([a-z0-9-]+)\/?$/);
    if (m) {
      var slug = m[2];
      if (slug === "page") {
        redirectTo("/");
        return;
      }
      for (var k = 0; k < legacy.length; k++) {
        if (legacy[k].url === "/" + slug + "/" || legacy[k].url === "/" + slug) {
          redirectTo(legacy[k].url);
          return;
        }
      }
    }
  } catch (e) {
    /* malformed URL — leave the current page alone */
  }
})();
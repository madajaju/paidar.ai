(function () {
  "use strict";

  var STORAGE_KEY = "paidarFunnelAttribution";
  var TRACKED_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "qr", "book", "page"];

  function readParams() {
    var params = new URLSearchParams(window.location.search || "");
    var data = {};
    TRACKED_KEYS.forEach(function (key) {
      var value = params.get(key);
      if (value) data[key] = value;
    });
    return data;
  }

  function getStoredAttribution() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function storeAttribution(newData) {
    var merged = Object.assign({}, getStoredAttribution(), newData);
    if (!merged.first_seen_at) {
      merged.first_seen_at = new Date().toISOString();
    }
    merged.last_seen_at = new Date().toISOString();
    merged.landing_path = merged.landing_path || window.location.pathname;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    } catch (e) {
      // Ignore localStorage errors.
    }

    return merged;
  }

  function appendAttributionToLinks(attribution) {
    var links = document.querySelectorAll("a[data-propagate-utm='true']");
    links.forEach(function (link) {
      var href = link.getAttribute("href");
      if (!href || href.indexOf("mailto:") === 0 || href.indexOf("tel:") === 0 || href.indexOf("#") === 0) return;

      var url;
      try {
        url = new URL(href, window.location.origin);
      } catch (e) {
        return;
      }

      TRACKED_KEYS.forEach(function (key) {
        if (attribution[key]) url.searchParams.set(key, attribution[key]);
      });

      if (href.indexOf("http") === 0) {
        link.setAttribute("href", url.toString());
      } else {
        link.setAttribute("href", url.pathname + url.search + url.hash);
      }
    });
  }

  function mapAttributionToInputs(attribution) {
    var fields = document.querySelectorAll("input[data-utm-field='true']");
    fields.forEach(function (field) {
      var key = field.name;
      if (key && attribution[key]) {
        field.value = attribution[key];
      }
    });
  }

  function pushTrackingEvent(eventName, details) {
    var payload = {
      event: eventName,
      event_time: new Date().toISOString(),
      page_path: window.location.pathname,
      details: details || {}
    };

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);

    try {
      var tracker = new CustomEvent("paidar:track", { detail: payload });
      window.dispatchEvent(tracker);
    } catch (e) {
      // Ignore browsers that do not support CustomEvent construction.
    }

    if (window.console && window.console.info) {
      console.info("[paidar-track]", payload);
    }
  }

  function bindTrackedElements() {
    var nodes = document.querySelectorAll("[data-track]");
    nodes.forEach(function (node) {
      node.addEventListener("click", function () {
        pushTrackingEvent(node.getAttribute("data-track"), {
          cta_text: (node.textContent || "").trim(),
          target: node.getAttribute("href") || node.getAttribute("id") || ""
        });
      });
    });
  }

  function trackPageTime() {
    var fired = false;
    setTimeout(function () {
      if (fired) return;
      fired = true;
      pushTrackingEvent("time_on_page_30s", { seconds: 30 });
    }, 30000);
  }

  var pageParams = readParams();
  var attribution = storeAttribution(pageParams);
  mapAttributionToInputs(attribution);
  appendAttributionToLinks(attribution);
  bindTrackedElements();
  trackPageTime();
  pushTrackingEvent("qr_scan_landing", {
    attribution: attribution,
    referrer: document.referrer || "direct"
  });

  window.paidarTrack = {
    push: pushTrackingEvent,
    attribution: attribution
  };
})();

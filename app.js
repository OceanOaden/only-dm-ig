(function () {
  'use strict';

  var DM_URL = 'https://www.instagram.com/direct/inbox/';

  // Clear any old service workers that may be serving stale content
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      registrations.forEach(function (r) { r.unregister(); });
    });
  }

  // Detect if running as installed PWA
  // navigator.standalone is iOS-only. display-mode: standalone is the standard check.
  // In a normal browser tab, both should be false/undefined.
  var isStandalone =
    window.navigator.standalone === true ||
    window.matchMedia('(display-mode: standalone)').matches;

  if (isStandalone) {
    document.getElementById('landing').hidden = true;
    document.getElementById('splash').hidden = false;
    window.location.href = DM_URL;
    return;
  }

  // Platform detection
  var ua = navigator.userAgent;
  var isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.maxTouchPoints > 1 && /Macintosh/.test(ua));
  var isAndroid = /Android/.test(ua);

  // Show platform-specific install instructions
  if (isIOS) {
    document.getElementById('install-ios').hidden = false;
  } else if (isAndroid) {
    document.getElementById('install-android').hidden = false;
  } else {
    document.getElementById('install-desktop').hidden = false;
  }

  // "Show all platforms" toggle
  document.getElementById('show-all-platforms').addEventListener('click', function () {
    document.getElementById('install-ios').hidden = false;
    document.getElementById('install-android').hidden = false;
    document.getElementById('install-desktop').hidden = false;
    this.hidden = true;
  });

  // Register service worker for PWA installability
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
  }
})();

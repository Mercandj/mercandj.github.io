/**
 * Store redirection: when "one_link_package_name_bunld_id" is set, open the
 * Google Play (Android) or the App Store (iOS) for this package name / bundle id.
 */
(function() {
  var appId = new URLSearchParams(window.location.search).get('one_link_package_name_bunld_id');
  if (!appId) {
    return;
  }
  appId = appId.trim();
  if (!/^[A-Za-z0-9._-]+$/.test(appId)) {
    return;
  }

  var ua = navigator.userAgent || '';
  var isIos = /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var isAndroid = /Android/i.test(ua);

  if (isAndroid) {
    window.location.replace('https://play.google.com/store/apps/details?id=' + encodeURIComponent(appId));
  } else if (isIos) {
    // The App Store needs the numeric app id: resolve it from the bundle id.
    var fallback = 'https://apps.apple.com/search?term=' + encodeURIComponent(appId);
    fetch('https://itunes.apple.com/lookup?bundleId=' + encodeURIComponent(appId))
      .then(function(response) { return response.json(); })
      .then(function(data) {
        var url = data.results && data.results[0] && data.results[0].trackViewUrl;
        window.location.replace(url || fallback);
      })
      .catch(function() {
        window.location.replace(fallback);
      });
  }
})();

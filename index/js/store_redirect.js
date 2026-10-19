/**
 * Store redirection: when both "one_link_mobile_package_name" (Android) and
 * "one_link_mobile_bundle_id" (iOS) are set, open the Google Play (Android) or
 * the App Store (iOS) for the matching app.
 */
(function() {
  var params = new URLSearchParams(window.location.search);
  var packageName = (params.get('one_link_mobile_package_name') || '').trim();
  var bundleId = (params.get('one_link_mobile_bundle_id') || '').trim();
  var idPattern = /^[A-Za-z0-9._-]+$/;
  if (!idPattern.test(packageName) || !idPattern.test(bundleId)) {
    return;
  }

  var ua = navigator.userAgent || '';
  var isIos = /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var isAndroid = /Android/i.test(ua);

  if (isAndroid) {
    window.location.replace('https://play.google.com/store/apps/details?id=' + encodeURIComponent(packageName));
  } else if (isIos) {
    // The App Store needs the numeric app id: resolve it from the bundle id.
    var fallback = 'https://apps.apple.com/search?term=' + encodeURIComponent(bundleId);
    fetch('https://itunes.apple.com/lookup?bundleId=' + encodeURIComponent(bundleId))
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

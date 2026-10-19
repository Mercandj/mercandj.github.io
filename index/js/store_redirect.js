/**
 * Store redirection: when both "one_link_mobile_package_name" (Android) and
 * "one_link_mobile_app_store_id" (iOS) are set, open the Google Play (Android) or
 * the App Store (iOS) for the matching app.
 */
(function() {
  var params = new URLSearchParams(window.location.search);
  var packageName = (params.get('one_link_mobile_package_name') || '').trim();
  var appStoreId = (params.get('one_link_mobile_app_store_id') || '').trim();
  if (!/^[A-Za-z0-9._-]+$/.test(packageName) || !/^\d+$/.test(appStoreId)) {
    return;
  }

  var ua = navigator.userAgent || '';
  var isIos = /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var isAndroid = /Android/i.test(ua);

  if (isAndroid) {
    window.location.replace('https://play.google.com/store/apps/details?id=' + encodeURIComponent(packageName));
  } else if (isIos) {
    window.location.replace('https://apps.apple.com/app/id' + appStoreId);
  }
})();

(function($, cloudUI) {
  var makeNavigation = function(args) {
    var browser = args.browser;
    var $navigation = browser.$navigation;

    $navigation.append($('<ul>'));
  };

  cloudUI.widgets.browser = function(args) {
    var browser = {
      $container: args.$container,
      $navigation: args.$navigation
    };

    makeNavigation({
      browser: browser
    });

    return browser;
  };
}(jQuery, cloudUI));

(function($, cloudUI) {
  module('Browser');

  test('Basic', function() {
    var $container = $('<div>');
    var $navigation = $('<div>');
    var browser = cloudUI.widgets.browser({
      $container: $container,
      $navigation: $navigation
    });

    ok(browser, 'Browser object initialized');
    ok(browser.$container.size(), '$container passed in browser object');
    ok(browser.$navigation.size(), '$navigation passed in browser object');
    equal($navigation.find('ul').size(), 1, 'Navigation list present');
  });
}(jQuery, cloudUI));


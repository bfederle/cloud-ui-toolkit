(function($) {
  module('CloudStack UI - Main widget');

  test('Basic', function() {
    var $ui = $('<div>').addClass('ui-container');
    var $header, $logo, $navigation;
    var ui = {};

    ok($ui.cloudStackUI(ui), 'Initialize UI widget');
    ok($ui.attr('cloudstack-container'), 'Container has cloudstack-container indicator');

    // Check header
    $header = $ui.find('#header');
    $logo = $header.find('.logo');
    $navigation = $ui.find('#navigation');
    equal($header.size(), 1, 'Header present');
    equal($logo.size(), 1, 'Logo present');
    equal($navigation.size(), 1, 'Navigation present');
  });
}(jQuery));
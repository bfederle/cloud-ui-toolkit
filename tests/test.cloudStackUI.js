(function($) {
  module('CloudStack UI - Main widget');

  test('Basic', function() {
    var $ui = $('<div>').addClass('ui-container');
    var $header, $logo;
    var ui = {};

    ok($ui.cloudStackUI(ui), 'Initialize UI widget');
    ok($ui.attr('cloudstack-container'), 'Container has cloudstack-container indicator');

    // Check header
    $header = $ui.find('#header');
    $logo = $header.find('.logo');
    equal($header.size(), 1, 'Header present');
    equal($logo.size(), 1, 'Logo present');
  });
}(jQuery));
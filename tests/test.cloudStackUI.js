(function($) {
  module('CloudStack UI - Main widget');

  test('Basic', function() {
    var $ui = $('<div>').addClass('ui-container');
    var ui = {};

    ok($ui.cloudStackUI(ui), 'Initialize UI widget');
  });
}(jQuery));
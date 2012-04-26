(function($) {
  module('Container');

  test('Basic', function() {
    var $ui = $('<div>').addClass('ui-container');
    var $header, $logo, $navigation, $mainArea;
    var ui = {};

    ok($ui.cloudContainer(ui), 'Initialize UI widget');

    // Check layout
    $header = $ui.find('#header');
    $logo = $header.find('.logo');
    $navigation = $ui.find('#navigation ul');
    $mainArea = $ui.find('#main-area');
    equal($header.size(), 1, 'Header present');
    equal($logo.size(), 1, 'Logo present');
    equal($navigation.size(), 1, 'Navigation present');
    equal($mainArea.size(), 1, 'Main area present');
  });

  test('Add navigation items', function() {
    var $ui = $('<div>').addClass('ui-container');
    var $navItems, $navItemA, $navItemB;
    var ui = {
      sections: {
        testSectionA: {
          title: 'testSectionATitle'
        },
        testSectionB: {
          title: 'testSectionBTitle'
        }
      }
    };

    $ui.cloudContainer(ui);
    $navItems = $ui.find('#navigation ul li');
    $navItemA = $navItems.filter('.testSectionA');
    $navItemB = $navItems.filter('.testSectionB');
    equal($navItems.size(), 2, 'Nav item present');
    equal($navItemA.find('span.title').html(), 'testSectionATitle', 'Section A has correct title');
    equal($navItemB.find('span.title').html(), 'testSectionBTitle', 'Section B has correct title');
    ok($navItems.filter(':last').hasClass('last'), 'Last nav item has correct class');
    ok($navItems.filter(':first').hasClass('first'), 'First nav item has correct class');
  });
}(jQuery));
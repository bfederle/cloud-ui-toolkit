(function($, cloudUI) {
  module('Container');

  test('Basic', function() {
    var $ui = $('<div>').addClass('ui-container');
    var $header, $logo, $navigation, $mainArea;
    var container;

    container = cloudUI.widgets.container({
      $elem: $ui
    });
    ok(container, 'Container object initialized');
    equal(container.$elem, $ui, '$elem accessible');

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
    var container = cloudUI.widgets.container({
      $elem: $ui,
      sections: {
        testSectionA: {
          title: 'testSectionATitle'
        },
        testSectionB: {
          title: 'testSectionBTitle'
        }
      }
    });

    $navItems = $ui.find('#navigation ul li');
    $navItemA = $navItems.filter('.testSectionA');
    $navItemB = $navItems.filter('.testSectionB');
    equal($navItems.size(), 2, 'Nav item present');
    equal($navItemA.find('span.title').html(), 'testSectionATitle', 'Section A has correct title');
    equal($navItemA.attr('title'), 'testSectionATitle', 'Section A has tooltip');
    equal($navItemB.find('span.title').html(), 'testSectionBTitle', 'Section B has correct title');
    equal($navItemB.attr('title'), 'testSectionBTitle', 'Section B has tooltip');
    ok($navItems.filter(':last').hasClass('last'), 'Last nav item has correct class');
    ok($navItems.filter(':first').hasClass('first'), 'First nav item has correct class');
  });

  test('Control navigation item display', function() {
    var $ui = $('<div>');
    var container = cloudUI.widgets.container({
      $elem: $ui,
      sectionDisplay: ['testSectionB', 'testSectionA'],
      sections: {
        testSectionA: {
          title: 'testSectionATitle'
        },
        testSectionB: {
          title: 'testSectionBTitle'
        },
        doNotUse: {
          title: 'Hide this section'
        }
      }
    });
    var $navItems;

    $navItems = $ui.find('#navigation ul li');
    ok($navItems.filter(':first').hasClass('testSectionB'), 'Section B is first nav item');
    ok($navItems.filter(':last').hasClass('testSectionA'), 'Section A is last nav item');
    ok(!$navItems.filter('.doNotUse').size(), 'doNotUse section is hidden');
  });

  test('Show section', function() {
    var $ui = $('<div>').addClass('ui-container').appendTo('#qunit-fixture');
    var container = cloudUI.widgets.container({
      $elem: $ui,
      sections: {
        testSectionA: {
          title: 'testSectionATitle'
        },
        testSectionB: {
          title: 'testSectionBTitle'
        }
      }
    });
    var $navItems;

    $navItems = $ui.find('#navigation ul li');
    equal($navItems.filter('.active').size(), 1, 'One section is active');
    ok($navItems.filter('.active').hasClass('testSectionA'), 'Section A active');
    ok(container.showSection('testSectionB'), 'Activate section B');
    equal($navItems.filter('.active').size(), 1, 'One section is active');
    ok($navItems.filter('.active').hasClass('testSectionB'), 'Section B active');
    ok($navItems.filter('.testSectionA').click(), 'Click on section A');
    equal($navItems.filter('.active').size(), 1, 'One section is active');
    ok($navItems.filter('.active').hasClass('testSectionA'), 'Section A active');
  });

  test('Append new section', function() {
    var $ui = $('<div>').addClass('ui-container').appendTo('#qunit-fixture');
    var container = cloudUI.widgets.container({
      $elem: $ui,
      sections: {
        testSectionA: {
          title: 'testSectionATitle'
        },
        testSectionB: {
          title: 'testSectionBTitle'
        }
      }
    });
    var $navItems, $navItemC;

    $navItems = $ui.find('#navigation ul li');
    ok(container.addSection({
      id: 'testSectionC',
      section: {
        title: 'testSectionCTitle'
      }
    }), 'Add new section');
    $navItems = $ui.find('#navigation ul li');
    $navItemC = $ui.find('#navigation ul li:last');
    equal($navItems.size(), 3, 'Correct # of nav items');
    ok($navItemC.hasClass('testSectionC'), 'New section has correct CSS class');
    equal($navItemC.find('span.title').html(), 'testSectionCTitle', 'New section has correct title');
    equal($navItemC.attr('title'), 'testSectionCTitle', 'New section has tooltip');
    ok($navItemC.click(), 'Click section C');
    equal($navItems.filter('.active').size(), 1, 'One section is active');
    ok($navItemC.hasClass('active'), 'Section C active');
  });
}(jQuery, cloudUI));
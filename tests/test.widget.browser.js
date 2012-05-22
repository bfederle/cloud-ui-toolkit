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
    equal($navigation.find('ul').size(), 1, 'Navigation list present');
  });


  test('Add panel', function() {
    var $container = $('<div>');
    var $navigation = $('<div>');
    var browser = cloudUI.widgets.browser({
      $container: $container,
      $navigation: $navigation
    });

    // Explictly set container width for testing panels
    $container.width(1000);

    stop();
    browser.addPanel({
      title: 'test',
      content: function($panel1) {
        var zIndexPanel1 = parseInt($panel1.css('z-index'));

        $panel1.append(
          $('<div>').addClass('testContents').html('test contents')
        );

        start();
        ok(true, 'addPanel complete called');
        equal($navigation.find('ul li').size(), 1, 'Navigation item added');
        equal($navigation.find('ul li span').html(), 'test', 'Navigation item has label');
        equal($navigation.find('ul > div.end').size(), 1, 'Navigation item has end piece');
        equal($container.find('.panel').size(), 1, 'Panel added');
        equal($container.find('.panel > div.shadow').size(), 1, 'Panel has shadow');
        equal($container.find('.panel > div.testContents').html(), 'test contents', 'Panel has contents');
        stop();
        
        browser.addPanel({
          title: 'test2',
          content: function($panel2) {
            var zIndexPanel2 = parseInt($panel2.css('z-index'));

            $panel2.append(
              $('<div>').addClass('testContents2').html('test contents 2')
            );

            start();
            equal($navigation.find('ul li').size(), 2, 'Second navigation item added');
            equal($container.find('.panel').size(), 2, 'Second panel added');
            equal($container.find('.panel:last > div.testContents2').html(), 'test contents 2', 'Second panel has contents');
            equal(zIndexPanel2, zIndexPanel1 + 1, 'Z-index correct');
            equal($panel2.width(), $container.width(), 'Width correct');
          }
        });
      }
    });
  });

  test('Reset', function() {
    var $container = $('<div>').appendTo('#qunit-fixture');
    var $navigation = $('<div>').appendTo('#qunit-fixture');
    var browser = cloudUI.widgets.browser({
      $container: $container,
      $navigation: $navigation
    });

    stop();
    browser.addPanel({
      title: 'test',
      content: function($panel) {
        browser.addPanel({
          title: 'test2',
          content: function($panel) {
            start();
            browser.reset();
            equal($container.find('.panel').size(), 0, 'All panels cleared');
            equal($navigation.find('li, .end').size(), 0, 'All nav items cleared');
          }
        });
      }
    });
  });
}(jQuery, cloudUI));

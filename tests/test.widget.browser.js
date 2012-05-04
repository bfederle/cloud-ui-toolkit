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

    stop();
    browser.addPanel({
      title: 'test',
      complete: function($panel) {
        $panel.append('test contents');
        start();
        ok(true, 'addPanel complete called');
        equal($navigation.find('ul li').size(), 1, 'Navigation item added');
        equal($navigation.find('ul li span').html(), 'test', 'Navigation item has label');
        equal($navigation.find('ul > div.end').size(), 1, 'Navigation item has end piece');
        equal($container.find('.panel').size(), 1, 'Panel added');
        equal($container.find('.panel').html(), 'test contents', 'Panel has contents');

        stop();
        browser.addPanel({
          title: 'test2',
          complete: function($panel) {
            $panel.append('test contents 2');
            start();
            equal($navigation.find('ul li').size(), 2, 'Second navigation item added');
            equal($container.find('.panel').size(), 2, 'Second panel added');
            equal($container.find('.panel:last').html(), 'test contents 2', 'Second panel has contents');
          }
        });
      }
    });
  });
}(jQuery, cloudUI));


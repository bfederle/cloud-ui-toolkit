(function($, cloudUI) {
  module('Application: List');

  test('Basic', function() {
    var $app = $('<div>').appendTo('#qunit-fixture');
    var app;
    
    stop();
    // application-list->init event
    var testEvent = true;
    cloudUI.event.handler({
      'application-list': {
        init: function(args) {
          if (!testEvent) return;
          
          start();
          ok(true, 'init called');
          ok($.isPlainObject(args.section), 'section passed');
          ok($.isPlainObject(args.listArgs), 'listArgs passed');

          testEvent = false;
        }
      }
    });

    // Test with list: {}
    app = cloudUI.application({
      $container: $app,
      home: 'sectionA',
      sections: {
        sectionA: {
          title: 'sectionATitle',
          list: {
            id: 'testList'
          }
        }
      }
    });
    
    equal($app.find('#browser .container .list-view[cs-event-id=application-list]').size(), 1, 'List present in browser');

    // Test with listView: {}
    $app.remove();
    $app = $('<div>').appendTo('#qunit-fixture');
    app = cloudUI.application({
      $container: $app,
      home: 'sectionA',
      sections: {
        sectionA: {
          title: 'sectionATitle',
          listView: {
            id: 'testList'
          }
        }
      }
    });

    equal($app.find('#browser .container .list-view[cs-event-id=application-list]').size(), 1, 'List present in browser');
  });
}(jQuery, cloudUI));
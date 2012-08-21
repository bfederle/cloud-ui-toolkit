(function($, cloudUI) {
  // Make sure no animations play -- messes up the timing for tests!
  $.fx.off = true;

  module('Core');

  test('Basic', function() {
    ok($.isPlainObject(window.cloudUI), 'cloudUI namespace exists');
    ok($.isPlainObject(window.cloudUI.widgets), 'cloudUI widget namespace exists');
  });

  test('Data', function() {
    var $elem = $('<div>');
    var data = cloudUI.data($elem);

    ok($.isPlainObject(data), 'Data object present');
    ok(cloudUI.data($elem).test = 'test', 'Store data');
    equal(cloudUI.data($elem).test, 'test', 'Data retrieved correctly');
    ok(cloudUI.data($elem).test2 = 'test2', 'Store more data');
    equal(cloudUI.data($elem).test, 'test', 'First data item retrieved correctly');
    equal(cloudUI.data($elem).test2, 'test2', 'Second data item retrieved correctly');
  });

  test('Register event', function() {
    var $elem = $('<div>');

    ok(cloudUI.event.register({
      $elem: $elem,
      id: 'test-event',
      data: {
        testData: true
      }
    }), 'Register event');
    equal($elem.attr('cs-event-id'), 'test-event', 'Element has event ID');
    ok($elem.data('cloudUI').eventData.testData, 'Element has embedded data');
  });

  test('Handle event', function() {
    var $elem = $('<div>').appendTo('#qunit-fixture');

    ok(cloudUI.event.register({
      $elem: $elem,
      id: 'test-event',
      data: {
        testData: true
      }
    }), 'Event registered');

    ok(cloudUI.event.handler({
      'test-event': {
        click: function(args) {
          start();
          ok(true, 'Click event handled');
          ok(args.testData, 'Test data present');
        }
      }
    }), 'Event handler setup');

    stop();
    $elem.click();
  });

  test('dataProvider handler', function() {
    var dataProvider = function(args) {
      start();

      ok(true, 'Data provider called');
      ok($.isArray(args.context), 'Context passed');
      ok(args.response.success, 'Success callback passed');
      ok(args.response.error, 'Error callback passed');

      stop();

      args.response.success({ data: [ { testItem: 'testItemData' } ] });
    };

    stop();

    cloudUI.dataProvider({
      dataProvider: dataProvider,
      success: function(args) {
        start();

        ok(true, 'Success called');
        ok(args.data.length, 1, 'Data passed');
        equal(args.data[0].testItem, 'testItemData', 'Data values correct');
      },
      error: function(args) {}
    });
  });

  test('Widget factory', function() {
    var widget = cloudUI.widget({
      methods: {
        _init: function(widget, widgetArgs) {
          start();
          ok(true, '_init called');
          equal(widgetArgs.$container.size(), 1, 'widgetArgs has pased $container');
          equal(widgetArgs.testWidgetArg, 'test123', 'widgetArgs has passed test option');
          stop();
        },
        testMethod: function(widget, widgetArgs, args) {
          start();
          ok(true, '_init called');
          equal(widgetArgs.$container.size(), 1, 'widgetArgs has pased $container');
          equal(widgetArgs.testWidgetArg, 'test123', 'widgetArgs has passed test option');
          equal(args.testArg, 'testArg123', 'args has passed option');
        }
      }
    });

    stop();
    var testWidget = widget({
      $container: $('<div>'),
      testWidgetArg: 'test123'
    });

    testWidget.testMethod({ testArg: 'testArg123' });
  });
}(jQuery, cloudUI));

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
}(jQuery, cloudUI));

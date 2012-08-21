(function($, _) {
  var cloudUI = window.cloudUI = {
    // DOM data storage and retrieval
    // -- based on jQuery data handling
    data: function($elem) {
      var cloudUI = $elem.data('cloudUI');

      if (!_.isObject(cloudUI)) {
        cloudUI = {};
        $elem.data('cloudUI', cloudUI);
      }

      return cloudUI;
    },

    // Event handling
    event: {
      register: function(args) {
        var $elem = args.$elem;
        var id = args.id;
        var data = args.data;

        $elem.attr('cs-event-id', id);
        cloudUI.data($elem).eventData = data;

        return $elem;
      },
      handler: function(args) {
        var handlers = args;

        _.each(handlers, function(handler, id) {
          var events = _.keys(handler).join(' ');

          $(document).bind(events, function(event) {
            var $target = $(event.target);
            var $eventTarget = $target.closest('[cs-event-id=' + id + ']');
            var type = event.type;
            var data;

            if (!$eventTarget.size()) return true;

            data = $eventTarget.data('cloudUI').eventData;

            return handler[type](data);
          });
        });

        return true;
      }
    }
  };

  // Handler for dataProvider, to maintain consistency for data retrieval
  cloudUI.dataProvider = function(args) {
    var dataProvider = args.dataProvider;
    var success = args.success;
    var error = args.error;

    dataProvider({
      context: [],
      response: {
        success: function(args) {
          success(args);
        },
        error: function(args) {
          error(args);
        }
      }
    });
  };

  // Widget factory
  cloudUI.widget = function(args) {
    var methods = args.methods;
    var events = args.events;

    return function(args) {
      var widgetArgs = args;
      var widget = {};

      // Build method map
      _.map(methods, function(method, methodID) {
        widget[methodID] = function(args) {
          methods[methodID](widget, widgetArgs, args);

          return widget;
        };
      });

      widget._init(widget, widgetArgs, args);


      // Register event handling
      if (events) {
        cloudUI.event.handler(events);
      }

      return widget;
    };
  };

  // Holds standard widgets
  cloudUI.widgets = {};
}(jQuery, _));

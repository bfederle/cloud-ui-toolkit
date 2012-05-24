(function($) {
  var cloudUI = window.cloudUI = {
    // DOM data storage and retrieval
    // -- based on jQuery data handling
    data: function($elem) {
      var cloudUI = $elem.data('cloudUI');

      if (!$.isPlainObject(cloudUI)) {
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

        $.each(handlers, function(id, handler) {
          var events = $.map(handler, function(value, key) { return key; }).join(' ');

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

  // Holds widget factories
  cloudUI.widgets = {};
}(jQuery));

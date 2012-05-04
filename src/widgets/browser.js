(function($, cloudUI) {
  var elems = {
    navigationItem: function(args) {
      var $li = $('<li>');
      var $end = $('<div>').addClass('end');
      var $label = $('<span>').html(args.title);

      $li.append($label);

      return $.merge($li, $end);
    },
    panel: function() {
      return $('<div>').addClass('panel');
    }
  };
  var navigation = {
    // Gets the nav item corresponding to the specified panel;
    getItem: function(args) {
      var $panel = args.$panel;
      var $navigation = args.$navigation;
      var $navigationItem, $navigationItemEnd;
      var index = $panel.index('.panel');

      $navigationItem = $($navigation.find('li')[index]);
      $navigationItemEnd = $navigationItem.next('.end');

      return $.merge($navigationItem, $navigationItemEnd);
    },

    removeItem: function($navItem) {
      $navItem.remove();
    }
  };
  var panel = {
    add: function(args) {
      var browser = args.browser;
      var $panel = elems.panel();
      var $container = args.$container;
      var $navigationList = args.$navigation.find('ul');
      var $navigationItem = elems.navigationItem({
        title: args.title
      });

      $container.append($panel);
      $navigationList.append($navigationItem);
      args.complete($panel);
    },

    remove: function(args) {
      var $panel = args.$panel;
      var $navigation = args.$navigation;
      var $navigationItem = navigation.getItem({
        $panel: $panel,
        $navigation: $navigation
      });
      var $container = args.$container;

      $panel.remove();
      navigation.removeItem($navigationItem);
    },

    removeAll: function(args) {
      var $container = args.$container;
      var $navigation = args.$navigation;
      var $panels = $container.find('.panel');

      $panels.each(function() {
        var $panel = $(this);

        panel.remove({
          $panel: $panel,
          $navigation: $navigation,
          $container: $container
        });
      });
    }
  };
  var makeNavigation = function(args) {
    var browser = args.browser;
    var $navigation = args.$navigation;

    $navigation.append($('<ul>'));
  };

  cloudUI.widgets.browser = function(args) {
    var $container = args.$container;
    var $navigation = args.$navigation;
    var browser = {
      addPanel: function(args) {
        panel.add({
          $container: $container,
          $navigation: $navigation,
          browser: browser,
          complete: args.complete,
          title: args.title
        });

        return browser;
      },
      reset: function() {
        panel.removeAll({
          $container: $container,
          $navigation: $navigation
        });
        return browser;
      }
    };

    makeNavigation({
      $container: $container,
      $navigation: $navigation,
      browser: browser
    });

    return browser;
  };
}(jQuery, cloudUI));

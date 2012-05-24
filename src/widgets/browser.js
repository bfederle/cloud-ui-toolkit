(function($, cloudUI) {
  var elems = {
    navigationItem: function(args) {
      var $li = $('<li>');
      var $end = $('<div>').addClass('end');
      var $label = $('<span>').html(args.title);

      $li.append($label);
      $li.attr('title', args.title);

      return $.merge($li, $end);
    },
    panel: function() {
      var $panel = $('<div>').addClass('panel');
      var $shadow = $('<div>').addClass('shadow');

      // For consistency, width and positoning computation is handled directly in JS
      $panel.css({
        position: 'absolute'
      });

      return $panel.append($shadow);
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
    // Get new z-index for adding panel, for correct stacking
    zIndex: function(args) {
      var $container = args.$container;
      var $panels = panel.getAll($container);

      return $panels.size() ?
        parseInt($panels.filter(':last').css('z-index')) + 1 : 0;
    },

    // Compute initial panel width, based on container's dimensions
    width: function(args) {
      var $container = args.$container;

      return $container.width();
    },

    // Compute initial position of hidden panel
    //
    // Returns CSS 'left' attr in pixels
    hiddenPosition: function(args) {
      var $container = args.$container;
      var $panel = args.$panel;

      return $container.width();
    },

    // Append new panel to browser
    add: function(args) {
      var browser = args.browser;
      var duration = args.duration;
      var $panel = elems.panel();
      var $container = args.$container;
      var $navigationList = args.$navigation.find('ul');
      var $navigationItem = elems.navigationItem({
        title: args.title
      });
      var zIndex, panelWidth, panelInitialPos;

      // Setup nav item event behavior
      cloudUI.event.register({
        $elem: $navigationItem,
        id: 'browser-navigation-item',
        data: {
          browser: browser,
          $panel: $panel
        }
      });

      // Get initial positioning
      zIndex = panel.zIndex({ $container: $container });
      panelWidth = panel.width({ $container: $container });
      panelInitialPos = panel.hiddenPosition({
        $container: $container,
        $panel: $panel
      });
      $panel.css({
        zIndex: zIndex,
        left: panelInitialPos
      });
      $panel.width(panelWidth);

      // Append elements
      $container.append($panel);
      $navigationList.append($navigationItem);

      // Slide-in panel
      if ($panel.index()) {
        $panel.animate(
          {
            left: 0
          },
          {
            duration: duration,
            easing: 'easeOutCirc',
            complete: function() {
              if (!$panel.is(':visible')) {
                return false;
              }

              args.content($panel);

              return true;
            }
          }
        );
      } else {
        $panel.css({ left: 0 });
        args.content($panel);
      }
    },

    // Remove panel from browser
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

    // Clears out all panels from browser
    removeAll: function(args) {
      var $container = args.$container;
      var $navigation = args.$navigation;
      var $panels = panel.getAll($container);

      $panels.each(function() {
        var $panel = $(this);

        panel.remove({
          $panel: $panel,
          $navigation: $navigation,
          $container: $container
        });
      });
    },

    // Get every panel from container
    getAll: function($container) {
      return $container.find('.panel');
    },

    // Make target panel the last
    // -- remove all panels/navigation after it
    makeLast: function(args) {
      var $container = args.$container;
      var $navigation = args.$navigation;
      var $targetPanel = args.$targetPanel;
      var browser = args.browser;
      var complete = args.complete;
      var $removePanels;

      // Get panels to remove
      $removePanels = panel.getAll($container).filter(function() {
        var $panel = $(this);

        return $panel.index() > $targetPanel.index();
      });

      // Remove specified panels + navigation
      $removePanels.each(function() {
        var $panel = $(this);

        panel.remove({
          $panel: $panel,
          $navigation: $navigation
        });
      });

      if (complete) {
        args.complete($targetPanel);
      }
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
    var panelSpeed = args.panelSpeed; // The duration of panel slide-in/out

    var browser = {
      addPanel: function(args) {
        panel.add({
          $container: $container,
          $navigation: $navigation,
          browser: browser,
          content: args.content,
          title: args.title,
          duration: panelSpeed ? args.panelSpeed : 500
        });

        return browser;
      },
      selectPanel: function(args) {
        var $panel = args.$panel;
        var complete = args.complete;

        panel.makeLast({
          $container: $container,
          $navigation: $navigation,
          $targetPanel: $panel,
          browser: browser,
          complete: complete
        });
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

  cloudUI.event.handler({
    'browser-navigation-item': {
      click: function(args) {
        var browser = args.browser;
        var $panel = args.$panel;

        browser.selectPanel({ $panel: $panel });
      }
    }
  });
}(jQuery, cloudUI));

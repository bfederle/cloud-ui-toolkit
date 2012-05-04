(function($, cloudUI) {
  var elems = {
    navigationItem: function(args) {
      var $li = $('<li>');
      var $label = $('<span>').html(args.title);

      $li.append($label);

      return $li;
    },
    panel: function() {
      return $('<div>').addClass('panel');
    }
  };

  var panel = {
    add: function(args) {
      var browser = args.browser;
      var $panel = elems.panel();
      var $container = browser.$container;
      var $navigationList = browser.$navigation.find('ul');
      var $navigationItem = elems.navigationItem({
        title: args.title
      });

      $container.append($panel);
      $navigationList.append($navigationItem);
      args.complete($panel);
    }
  };
  var makeNavigation = function(args) {
    var browser = args.browser;
    var $navigation = browser.$navigation;

    $navigation.append($('<ul>'));
  };

  cloudUI.widgets.browser = function(args) {
    var browser = {
      $container: args.$container,
      $navigation: args.$navigation,

      addPanel: function(args) {
        panel.add({
          browser: browser,
          complete: args.complete,
          title: args.title
        });

        return browser;
      }
    };

    makeNavigation({
      browser: browser
    });

    return browser;
  };
}(jQuery, cloudUI));

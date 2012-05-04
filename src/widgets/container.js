(function($, cloudUI) {
  // UI elements
  var elems = {
    header: function() {
      return $('<div>').attr('id', 'header');
    },

    logo: function() {
      return $('<div>').addClass('logo');
    },

    navigation: function() {
      return $('<div>').attr('id', 'navigation').append($('<ul>'));
    },

    navItem: function(args) {
      var $navItem = $('<li>');
      var $icon = $('<span>').addClass('icon').html('&nbsp;');
      var $title = $('<span>').addClass('title');
      var $container = args.$container;
      var container = args.container;
      var sectionID = args.sectionID;
      var title = args.title;

      $title.html(title);
      $navItem.attr('title', title);
      $navItem.addClass('navigation-item');
      $navItem.addClass(sectionID);
      $navItem.append($icon, $title);
      cloudUI.event.register({
        $elem: $navItem,
        id: 'container-navigation-item',
        data: {
          container: container,
          $container: $container,
          sectionID: sectionID
        }
      });
      
      return $navItem;
    },

    // Where the browser is contained
    mainArea: function() {
      return $('<div>').attr('id', 'main-area');
    }
  };

  // Navigation bar-related functions
  var navigation = {
    addItem: function(args) {
      var container = args.container;
      var $container = args.$container;
      var $navigation = args.$navigation;
      var $navItem, $navItems;
      var sectionID = args.sectionID;
      var title = args.title;

      $navItem = elems.navItem({
        $container: $container,
        container: container,
        sectionID: sectionID,
        title: title
      });
      $navItem.appendTo($navigation.find('ul'));

      // Setup first/last item CSS styling
      $navItems = $navigation.find('li');
      $navItems.removeClass('first last');
      $navItems.filter(':first').addClass('first');
      $navItems.filter(':last').addClass('last');

      return $navItem;
    },

    makeActive: function(args) {
      var sectionID = args.sectionID;
      var $navigation = args.$navigation;
      var $navItems = $navigation.find('li');
      var $targetNavItem = $navItems.filter(function() {
        return $(this).hasClass(sectionID);
      });

      $targetNavItem.addClass('active');
      $targetNavItem.siblings().removeClass('active');
    }
  };

  // Activate section
  var showSection = function(args) {
    var $navigation = args.$navigation;
    var sectionID = args.sectionID;

    navigation.makeActive({
      $navigation: $navigation,
      sectionID: sectionID
    });
  };

  // Add a new section
  var addSection = function(args) {
    var $container = args.$container;
    var container = args.container;
    var $navigation = args.$navigation;
    var sectionID = args.sectionID;
    var section = args.section;

    navigation.addItem({
      $container: $container,
      container: container,
      $navigation: $navigation,
      sectionID: sectionID,
      title: section.title
    });
  };

  // Make container elements
  var buildUI = function(args) {
    var container = args.container;
    var $container = container.$elem;
    var $header = elems.header();
    var $logo = elems.logo();
    var $navigation = elems.navigation();
    var $mainArea = elems.mainArea();
    var sections = args.sections;
    var sectionDisplay, firstSection;

    $header.append($logo);
    $container.append($header,
                      $navigation,
                      $mainArea); 

    if (args.sections) {
      sectionDisplay = args.sectionDisplay ?
        args.sectionDisplay :
        $.map(sections, function(section, sectionID) {
          return sectionID;
        });

      $(sectionDisplay).each(function() {
        var sectionID = this.toString();
        var section = sections[sectionID];

        addSection({
          container: container,
          $container: $container,
          $navigation: $navigation,
          sectionID: sectionID,
          section: section
        });
      });

      // Get first section
      firstSection = sectionDisplay[0];

      showSection({
        $navigation: $navigation,
        sectionID: firstSection
      });
    }
  };

  cloudUI.widgets.container = function(args) {
    var $container = args.$elem;
    var container = {
      $elem: $container,
      showSection: function(sectionID) {
        showSection({
          $navigation: $container.find('#navigation'),
          sectionID: sectionID
        });

        return container;
      },
      addSection: function(args) {
        var sectionID = args.id;
        var section = args.section;

        addSection({
          $container: $container,
          container: container,
          $navigation: $container.find('#navigation'),
          sectionID: sectionID,
          section: section
        });

        return container;
      }
    };

    buildUI($.extend(args, { container: container }));

    return container;
  };

  cloudUI.event.handler({
    'container-navigation-item': {
      click: function(args) {
        var container = args.container;
        var sectionID = args.sectionID;

        container.showSection(sectionID);

        return false;
      }
    }
  });
}(jQuery, cloudUI));

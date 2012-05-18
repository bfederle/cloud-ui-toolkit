(function($, cloudUI) {
  // Build widget elements
  var elems = {
    container: function(args) {
      var $container = args.$container;
      var container = args.container;
      var sections = args.sections;
      var home = args.home;
      var events = args.events;
      
      // Make widget
      container = cloudUI.widgets.container({
        $container: $container,
        navItems: {}, // These will be built dynamically
        events: events
      });

      // Make nav item map
      $.each(sections, function(sectionID, section) {
        container.addNavItem({
          id: sectionID,
          navItem: {
            title: section.title,
            action: function() {}
          }
        });
      });

      return container;
    },
    browser: function(args) {
      var $container = args.$container;
      var $browserContainer = $('<div>').attr('id', 'browser');
      var $browserSubContainer = $('<div>').addClass('container');
      var $navigation = $('<div>').addClass('navigation').attr('id', 'breadcrumbs');
      var $homeButton = $.merge( // Home button placed in breadcrumbs
        $('<div>').addClass('home'),
        $('<div>').addClass('end')
      );
      var application = args.application;
      var browser;
      
      // Setup home button behavior
      cloudUI.event.register({
        $elem: $homeButton,
        id: 'application-home',
        data: {
          $application: $container,
          application: application
        }
      });
      
      $navigation.append($homeButton);
      $browserContainer.append($navigation, $browserSubContainer);
      $container.find('#main-area').append($browserContainer);

      // Initialize browser widget
      browser = cloudUI.widgets.browser({
        $container: $browserSubContainer,
        $navigation: $navigation
      });
      
      return browser;
    }
  };

  // Make section active, by selecting nav item and making new browser pane
  var showSection = function(args) {
    var application = args.application;
    var browser = args.application.widgets.browser;
    var container = args.application.widgets.container;
    var sectionID = args.sectionID;
    var selectNavItem = args.selectNavItem;

    browser.reset();
    browser.addPanel({
      content: function($panel) {
        return '';
      },
      title: sectionID
    });

    if (selectNavItem) {
      container.selectNavItem(sectionID);      
    }
  };
  
  cloudUI.application = function(args) {
    var $container = args.$container;
    var sections = args.sections;
    var home = args.home;
    var application, container, browser;

    // Define return object
    application = {
      widgets: {}, // Stores widget instances used by app

      showSection: function(sectionID) {
        showSection({
          application: application,
          sectionID: sectionID,
          selectNavItem: true
        });
        
        return application;
      }
    };

    // Create widgets
    container = application.widgets.container = elems.container({
      $container: $container,
      container: container,
      sections: sections,
      home: home,
      events: {
        selectNavItem: function(args) {
          var sectionID = args.navID;

          showSection({
            application: application,
            sectionID: sectionID,
            selectNavItem: false
          }); 
        }
      }
    });
    browser = application.widgets.browser = elems.browser({
      $container: $container,
      application: application
    });

    // Create persistent data store
    $.extend(cloudUI.data($container), {
      application: {
        _application: application,
        home: home
      }
    });

    // Make home section active by default
    application.showSection(home);

    return application;
  };

  cloudUI.event.handler({
    'application-home': {
      click: function(args) {
        var $application = args.$application;
        var application = args.application;
        var homeSection = cloudUI.data($application).application.home;

        application.showSection(homeSection);
      }
    }
  });
}(jQuery, cloudUI));

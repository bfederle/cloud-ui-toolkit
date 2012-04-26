(function($) {
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
      var sectionID = args.sectionID;
      var title = args.title;

      $title.html(title);
      $navItem.attr('title', title);
      $navItem.addClass('navigation-item');
      $navItem.addClass(sectionID);
      $navItem.append($icon, $title);
      $navItem.click(function() {
        $container.cloudContainer('showSection', sectionID);
      });

      return $navItem;
    },

    mainArea: function() {
      return $('<div>').attr('id', 'main-area');
    }
  };

  // Navigation bar-related functions
  var navigation = {
    addItem: function(args) {
      var $container = args.$container;
      var $navigation = args.$navigation;
      var $navItem;
      var sectionID = args.sectionID;
      var title = args.title;

      $navItem = elems.navItem({
        $container: $container,
        sectionID: sectionID,
        title: title
      });
      $navItem.appendTo($navigation.find('ul'));

      return $navItem;
    },

    populate: function(args) {
      var $container = args.$container;
      var $navigation = args.$navigation;
      var sections = args.sections;
      var sectionDisplay = args.sectionDisplay ?
            args.sectionDisplay :
            $.map(sections, function(section, sectionID) {
              return sectionID;
            });

      // Append sections to nav bar
      $(sectionDisplay).each(function() {
        var sectionID = this.toString();
        var section = sections[sectionID];

        navigation.addItem({
          $container: $container,
          $navigation: $navigation,
          sectionID: sectionID,
          title: section.title
        });
      });

      // First/last item labeling
      $navigation.find('li:first').addClass('first');
      $navigation.find('li:last').addClass('last');

      return $navigation;
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

  var showSection = function(args) {
    var $navigation = args.$navigation;
    var sectionID = args.sectionID;

    navigation.makeActive({
      $navigation: $navigation,
      sectionID: sectionID
    });
  };

  var buildUI = function(args) {
    var $container = args.$container;
    var $header = elems.header();
    var $logo = elems.logo();
    var $navigation = elems.navigation();
    var $mainArea = elems.mainArea();
    var sections = args.sections;
    var sectionDisplay = args.sectionDisplay;
    var firstSection;

    $header.append($logo);
    $container.append(
      $header,
      $navigation,
      $mainArea
    );

    if (args.sections) {
      navigation.populate({
        $container: $container,
        $navigation: $navigation,
        sections: sections,
        sectionDisplay: sectionDisplay
      });

      // Get first section
      firstSection = sectionDisplay ?
        sectionDisplay[0] :
        $.map(sections, function(section, sectionID) {
          return sectionID;
        })[0];

      showSection({
        $navigation: $navigation,
        sectionID: firstSection
      });
    }
  };

  $.widget('cloudUI.cloudContainer', {
    _init: function() {
      buildUI($.extend(this.options, {
        $container: this.element
      }));
    },
    showSection: function(sectionID) {
      showSection({
        $navigation: this.element.find('#navigation'),
        sectionID: sectionID
      });
    }
  });
}(jQuery));
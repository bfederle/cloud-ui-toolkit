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
      var sectionID = args.sectionID;
      var title = args.title;

      $title.html(title);
      $navItem.addClass('navigation-item');
      $navItem.addClass(sectionID);
      $navItem.append($icon, $title);

      return $navItem;
    },

    mainArea: function() {
      return $('<div>').attr('id', 'main-area');
    }
  };

  // Navigation bar-related functions
  var navigation = {
    addItem: function(args) {
      var $navigation = args.$navigation;
      var $navItem;
      var sectionID = args.sectionID;
      var title = args.title;

      $navItem = elems.navItem({
        sectionID: sectionID,
        title: title
      });
      $navItem.appendTo($navigation.find('ul'));

      return $navItem;
    },

    populate: function(args) {
      var $navigation = args.$navigation;
      var sections = args.sections;

      $.each(sections, function(sectionID, section) {
        var $navItem = navigation.addItem({
          $navigation: $navigation,
          sectionID: sectionID,
          title: section.title
        });
      });
      $navigation.find('li:first').addClass('first');
      $navigation.find('li:last').addClass('last');

      return $navigation;
    }
  };
  
  $.widget('cloudUI.cloudContainer', {
    _init: function() {
      var args = this.options;
      var $container = this.element;
      var $header = elems.header();
      var $logo = elems.logo();
      var $navigation = elems.navigation();
      var $mainArea = elems.mainArea();
      var sections = args.sections;

      $header.append($logo);
      $container.append(
        $header,
        $navigation,
        $mainArea
      );

      if (args.sections) {
        navigation.populate({
          $navigation: $navigation,
          sections: sections
        });        
      }
    }
  });    
}(jQuery));
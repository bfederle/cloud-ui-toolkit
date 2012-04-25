(function($) {
  var elems = {
    header: function() {
      return $('<div>').attr('id', 'header');
    },

    logo: function() {
      return $('<div>').addClass('logo');
    },

    navigation: function() {
      return $('<div>').attr('id', 'navigation');
    },

    mainArea: function() {
      return $('<div>').attr('id', 'main-area');
    }
  };
  
  $.widget('cloudStackUI.cloudStackUI', {
    _init: function() {
      var $container = this.element;
      var $header = elems.header();
      var $logo = elems.logo();
      var $navigation = elems.navigation();
      var $mainArea = elems.mainArea();

      $header.append($logo);
      $container.attr('cloudstack-container', true);
      $container.append(
        $header,
        $navigation,
        $mainArea
      );
    }
  });    
}(jQuery));
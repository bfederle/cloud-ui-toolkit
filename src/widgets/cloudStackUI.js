(function($) {
  var elems = {
    header: function() {
      return $('<div>').attr('id', 'header');
    },

    logo: function() {
      return $('<div>').addClass('logo');
    }
  };
  
  $.widget('cloudStackUI.cloudStackUI', {
    _init: function() {
      var $container = this.element;
      var $header = elems.header();
      var $logo = elems.logo();

      $header.append($logo);
      $container.attr('cloudstack-container', true);
      $container.append($header);
    }
  });    
}(jQuery));
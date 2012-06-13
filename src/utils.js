(function($, cloudUI) {
  // Add even/odd pattern as CSS class for specified elems
  cloudUI.evenOdd = function($elems) {
    var isEven = true;

    // Cleanup
    $elems.removeClass('even odd');

    $elems.each(function() {
      var $elem = $(this);
      var type;

      if (isEven) {
        type = 'even';
        isEven = false;
      } else {
        type = 'odd';
        isEven = true;
      }

      $elem.addClass(type);
    });

    return $elems;
  };
}(jQuery, cloudUI))

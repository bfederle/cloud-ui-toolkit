(function($, _, cloudUI) {
  // Add even/odd pattern as CSS class for specified elems
  cloudUI.evenOdd = function($elems) {
    var isEven = true;

    // Cleanup
    $elems.removeClass('even odd');

    _.map($elems, function(elem) {
      var $elem = $(elem);
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
}(jQuery, _, cloudUI));

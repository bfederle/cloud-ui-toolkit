(function($, _, cloudUI) {
  cloudUI.event.handler({
    'list-table-header-row': {
      init: function(args) {
        var $tr = args.$tr;
        var $actionsHeader = $('<th>').addClass('actions').html('Actions');

        $tr.append($actionsHeader);
      }
    },
    
    'list-table-row': {
      init: function(args) {
        var $tr = args.$tr;
        var $actions = $('<td>').addClass('actions');

        $tr.append($actions);
      }
    }
  });
}(jQuery, _, cloudUI));

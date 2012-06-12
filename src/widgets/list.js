(function($, cloudUI) {
  var elems = {
    table: function() {
      var $wrapper = $('<div>').addClass('data-table');
      var $fixedHeader = elems.fixedHeader();
      var $bodyTable = elems.bodyTable();

      return $wrapper.append($fixedHeader, $bodyTable);
    },

    bodyTable: function() {
      var $table = $('<table>').addClass('body');
      var $tbody = $('<tbody>');
      var $emptyRow = $('<tr>').addClass('nocontents');
      var $emptyCell = $('<td>').html('<span>No contents</span>');

      return $table.append(
        $tbody.append(
          $emptyRow.append($emptyCell)
        )
      );
    },

    fixedHeader: function() {
      var $fixedHeader = $('<div>').addClass('fixed-header');
      var $table = $('<table>').attr('nowrap', 'nowrap');
      var $thead = $('<thead>');
      var $tr = $('<tr>');
      var $th = $('<th>').html('&nbsp;');

      return $fixedHeader.append(
        $table.append(
          $thead.append($tr.append($th))
        )
      );
    }
  };

  cloudUI.widgets.list = function(args) {
    var $list = args.$list;
    var id = args.id;
    var list = {};

    $list.addClass('view list-view');
    $list.addClass(id);
    $list.append(elems.table());

    return list;
  };
}(jQuery, cloudUI));
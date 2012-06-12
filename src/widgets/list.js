(function($, cloudUI) {
  var elems = {
    table: function(args) {
      var fields = args.fields;
      var $wrapper = $('<div>').addClass('data-table');
      var $fixedHeader = elems.fixedHeader({
        fields: fields
      });
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

    fixedHeader: function(args) {
      var fields = args.fields;
      var $fixedHeader = $('<div>').addClass('fixed-header');
      var $table = $('<table>').attr('nowrap', 'nowrap');
      var $thead = $('<thead>');
      var $tr = $('<tr>');
      var fieldOrder;

      // Add fields
      if (fields) {
        fieldOrder = $.map(fields, function(field, fieldID) {
          return fieldID;
        });
        $(fieldOrder).map(function(index, fieldID) {
          var field = fields[fieldID];
          var $th = $('<th>');

          $th.addClass(fieldID);
          $th.html(field.label);
          $th.appendTo($tr);
        });
      } else {
        $tr.append('<th>&nbsp;</th>');
      }

      return $fixedHeader.append(
        $table.append(
          $thead.append($tr)
        )
      );
    }
  };

  cloudUI.widgets.list = function(args) {
    var $list = args.$list;
    var id = args.id;
    var fields = args.fields;
    var list = {};

    $list.addClass('view list-view');
    $list.addClass(id);
    $list.append(elems.table({
      fields: fields
    }));

    return list;
  };
}(jQuery, cloudUI));
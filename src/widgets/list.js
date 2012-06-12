(function($, cloudUI) {
  var elems = {
    // Main table wrapper
    table: function(args) {
      var fields = args.fields;
      var fieldOrder = args.fieldOrder;
      var $wrapper = $('<div>').addClass('data-table');
      var $fixedHeader = elems.fixedHeader({
        fields: fields,
        fieldOrder: fieldOrder
      });
      var $bodyTable = elems.bodyTable();

      return $wrapper.append($fixedHeader, $bodyTable);
    },

    // Single table row
    tableRow: function(args) {
      var fields = args.fields;
      var dataItem = args.dataItem;
      var $tr = $('<tr>');
      var fieldOrder = args.fieldOrder;

      $(fieldOrder).map(function(index, fieldID) {
        var field = fields[fieldID];
        var $td = $('<td>');
        var $span = $('<span>');

        $td.addClass(fieldID);
        $span.html(dataItem[fieldID]).appendTo($td);
        $td.appendTo($tr);
      });

      return $tr;
    },

    // Table body
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

    // Header area
    fixedHeader: function(args) {
      var fields = args.fields;
      var $fixedHeader = $('<div>').addClass('fixed-header');
      var $table = $('<table>').attr('nowrap', 'nowrap');
      var $thead = $('<thead>');
      var $tr = $('<tr>');
      var fieldOrder = args.fieldOrder;

      // Add fields
      if (fields) {
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

  // Table list-related actions
  var table = {
    // Append multiple rows to list
    appendRows: function(args) {
      var fields = args.fields;
      var data = args.data;
      var fieldOrder = args.fieldOrder;
      var $tbody = args.$tbody;

      // Cleanup
      $tbody.find('tr.nocontents').remove();

      // Make rows
      $(data).map(function(index, dataItem) {
        var $tr = elems.tableRow({
          fields: fields,
          dataItem: dataItem,
          fieldOrder: fieldOrder
        });

        $tr.appendTo($tbody);
      });
    }
  };

  cloudUI.widgets.list = function(args) {
    var $list = args.$list;
    var id = args.id;
    var fields = args.fields;
    var fieldOrder = args.fields ?
          $.map(fields, function(field, fieldID) {
            return fieldID;
          }) : [];
    var dataProvider = args.dataProvider;
    var list = {};

    // Draw basic list layout
    $list.addClass('view list-view');
    $list.addClass(id);
    $list.append(elems.table({
      fields: fields,
      fieldOrder: fieldOrder
    }));

    // Load data
    if (dataProvider) {
      cloudUI.dataProvider({
        dataProvider: dataProvider,
        success: function(args) {
          var data = args.data;

          table.appendRows({
            fields: fields,
            data: data,
            fieldOrder: fieldOrder,
            $tbody: $list.find('tbody')
          });
        },

        error: function(args) {}
      });
    }

    return list;
  };
}(jQuery, cloudUI));
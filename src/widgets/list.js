(function($, _, cloudUI) {
  var elems = {
    // Main table wrapper
    table: function(args) {
      var fields = args.fields;
      var fieldDisplay = args.fieldDisplay;
      var $wrapper = $('<div>').addClass('data-table');
      var $fixedHeader = elems.fixedHeader({
        fields: fields,
        fieldDisplay: fieldDisplay
      });
      var $bodyTable = elems.bodyTable();

      return $wrapper.append($fixedHeader, $bodyTable);
    },

    // Single data row
    tableRow: function(args) {
      var fields = args.fields;
      var dataItem = args.dataItem;
      var $tr = $('<tr>');
      var fieldDisplay = args.fieldDisplay;

      _.map(fieldDisplay, function(fieldID) {
        var field = fields[fieldID];
        var $td = $('<td>');
        var $span = $('<span>');

        cloudUI.event.register({
          id: 'list-table-item',
          $elem: $td,
          data: {
            $td: $td,
            fieldID: fieldID,
            field: field
          }
        });

        $td.addClass(fieldID);
        $span.html(dataItem[fieldID]).appendTo($td);
        $td.appendTo($tr);
      });

      cloudUI.event.register({
        id: 'list-table-row',
        $elem: $tr,
        data: {
          $td: $tr,
          fields: fields
        }
      });

      $tr.find('td:first').addClass('first');
      $tr.find('td:last').addClass('last');

      return $tr;
    },

    // 'No contents' row
    emptyRow: function() {
      var $emptyRow = $('<tr>').addClass('nocontents');
      var $emptyCell = $('<td>').html('<span>No contents</span>');

      return $emptyRow.append($emptyCell);
    },

    // Table body
    bodyTable: function() {
      var $table = $('<table>').addClass('body');
      var $tbody = $('<tbody>');
      
      return $table.append($tbody);
    },

    // Header area
    fixedHeader: function(args) {
      var fields = args.fields;
      var $fixedHeader = $('<div>').addClass('fixed-header');
      var $table = $('<table>').attr('nowrap', 'nowrap');
      var $thead = $('<thead>');
      var $tr = $('<tr>');
      var fieldDisplay = args.fieldDisplay;

      // Add fields
      if (fields) {
        _.map(fieldDisplay, function(fieldID) {
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
    // Add multiple rows to list
    // -- defaults to append, unless prepend: true is set
    addRows: function(args) {
      var fields = args.fields;
      var data = args.data;
      var fieldDisplay = args.fieldDisplay;
      var $tbody = args.$tbody;
      var prepend = args.prepend;

      // Cleanup
      $tbody.find('tr.nocontents').remove();

      // Make rows
      _.map(data, function(dataItem) {
        var $tr = elems.tableRow({
          fields: fields,
          dataItem: dataItem,
          fieldDisplay: fieldDisplay
        });

        if (prepend) {
          $tr.prependTo($tbody);
        } else {
          $tr.appendTo($tbody);
        }
      });

      cloudUI.evenOdd($tbody.find('tr'));
    }
  };

  // Get field order from args
  var fieldDisplay = function(listArgs) {
    var fields = listArgs.fields;
    var fieldDisplay = listArgs.fieldDisplay;

    return fieldDisplay ? fieldDisplay :
      (fields ? _.keys(fields) : []); // if no order specified
  };

  cloudUI.widgets.list = cloudUI.widget({
    methods: {
      _init: function(list, listArgs) {
        var $list = listArgs.$list;
        var id = listArgs.id;
        var fields = listArgs.fields;
        var dataProvider = listArgs.dataProvider;

        // Draw basic list layout
        $list.addClass('view list-view');
        $list.addClass(id);
        $list.append(elems.table({
          fields: fields,
          fieldDisplay: fieldDisplay(listArgs)
        }));

        // Load data
        if (dataProvider) {
          cloudUI.dataProvider({
            dataProvider: dataProvider,
            success: function(args) {
              var data = args.data;

              if (data.length) {
                table.addRows({
                  fields: fields,
                  data: data,
                  fieldDisplay: fieldDisplay(listArgs),
                  $tbody: $list.find('tbody')
                });
              } else {
                $list.find('tbody').append(elems.emptyRow());
              }
            },

            error: function(args) {}
          });
        } else {
          $list.find('tbody').append(elems.emptyRow());
        }
      },
      appendRows: function(list, listArgs, args) {
        var data = args.data;
        var fields = listArgs.fields;
        var $list = listArgs.$list;

        table.addRows({
          fields: fields,
          data: data,
          fieldDisplay: fieldDisplay(listArgs),
          $tbody: $list.find('tbody')
        });
        
        return list;
      },
      prependRows: function(list, listArgs, args) {
        var data = args.data;
        var fields = listArgs.fields;
        var $list = listArgs.$list;

        table.addRows({
          prepend: true,
          fields: fields,
          data: data,
          fieldDisplay: fieldDisplay(listArgs),
          $tbody: $list.find('tbody')
        });
        
        return list;
      }
    }
  });
}(jQuery, _, cloudUI));

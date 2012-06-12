(function($, cloudUI) {
  module('List');

  test('Basic', function() {
    var $list = $('<div>');
    var list;

    list = cloudUI.widgets.list({
      $list: $list,
      id: 'testList'
    });

    ok($.isPlainObject(list), 'List object returned');
    ok($list.hasClass('view list-view testList'), 'List view container has correct classes');
    equal($list.find('.data-table').size(), 1, 'List view has table wrapper');

    // Fixed header
    equal($list.find('.data-table .fixed-header').size(), 1, 'List view has fixed header');
    equal($list.find('.data-table .fixed-header table[nowrap=nowrap]').size(), 1, 'Fixed header has table');
    equal($list.find('.data-table .fixed-header table thead tr th').size(), 1, 'Fixed header has table row');
    equal($list.find('.data-table .fixed-header table thead tr th').html(), '&nbsp;', 'Fixed header has empty table contents');

    // Table body
    equal($list.find('.data-table table.body').size(), 1, 'List view has body table');
    equal($list.find('.data-table table.body tbody').size(), 1, 'Body table has tbody');
    equal($list.find('.data-table table.body tbody tr.nocontents td').size(), 1, 'Body table has empty table row');
    equal($list.find('.data-table table.body tbody tr.nocontents td').html(), '<span>No contents</span>', 'Empty contents notice displayed');
  });

  test('Fields', function() {
    var $list = $('<div>');
    var list;

    list = cloudUI.widgets.list({
      $list: $list,
      id: 'testList',
      fields: {
        fieldA: { label: 'fieldALabel' },
        fieldB: { label: 'fieldBLabel' }
      }
    });

    equal($list.find('.data-table .fixed-header table thead tr th').size(), 2, 'Header has correct field count');
    equal($list.find('.data-table .fixed-header table thead tr th.fieldA').size(), 1, 'Header has field A');
    equal($list.find('.data-table .fixed-header table thead tr th.fieldB').size(), 1, 'Header has field B');
  });

  test('Data provider', function() {
    var $list = $('<div>');
    var list;

    list = cloudUI.widgets.list({
      $list: $list,
      id: 'testList',
      fields: {
        fieldA: { label: 'fieldALabel' },
        fieldB: { label: 'fieldBLabel' }
      },
      dataProvider: function(args) {
        args.response.success({
          data: [
            { fieldA: 'fieldAData1', fieldB: 'fieldBData1' },
            { fieldA: 'fieldAData2', fieldB: 'fieldBData2' }
          ]
        });
      }
    });

    equal($list.find('.data-table table.body tr').size(), 2, 'Correct number of rows present');
    equal($list.find('.data-table table.body tr:first td').size(), 2, '<td> count matches header count');

    // Row 1
    equal($list.find('.data-table table.body tr:first td.fieldA').size(), 1, 'fieldA present on row 1');
    equal($list.find('.data-table table.body tr:first td.fieldA span').html(), 'fieldAData1', 'fieldA data present on row 1');
    equal($list.find('.data-table table.body tr:first td.fieldB').size(), 1, 'fieldA present on row 1');
    equal($list.find('.data-table table.body tr:first td.fieldB span').html(), 'fieldBData1', 'fieldA data present on row 1');

    // Row 2
    equal($list.find('.data-table table.body tr:last td.fieldA').size(), 1, 'fieldA present on row 2');
    equal($list.find('.data-table table.body tr:last td.fieldA span').html(), 'fieldAData2', 'fieldA data present on row 2');
    equal($list.find('.data-table table.body tr:last td.fieldB').size(), 1, 'fieldA present on row 2');
    equal($list.find('.data-table table.body tr:last td.fieldB span').html(), 'fieldBData2', 'fieldA data present on row 2');
  });

  test('Data provider: no contents', function() {
    var $list = $('<div>');
    var list;

    list = cloudUI.widgets.list({
      $list: $list,
      id: 'testList',
      fields: {
        fieldA: { label: 'fieldALabel' },
        fieldB: { label: 'fieldBLabel' }
      },
      dataProvider: function(args) {
        args.response.success({
          data: []
        });
      }
    });

    equal($list.find('.data-table table.body tbody tr.nocontents td').size(), 1, 'Body table has empty table row');
    equal($list.find('.data-table table.body tbody tr.nocontents td').html(), '<span>No contents</span>', 'Empty contents notice displayed');
  });
}(jQuery, cloudUI));
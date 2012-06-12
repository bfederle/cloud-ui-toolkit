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
    equal($list.find('.data-table .fixed-header table thead tr').size(), 1, 'Fixed header has table row');

    // Table body
    equal($list.find('.data-table table.body').size(), 1, 'List view has body table');
    equal($list.find('.data-table table.body tbody').size(), 1, 'Body table has tbody');
    equal($list.find('.data-table table.body tbody tr.nocontents td').size(), 1, 'Body table has empty table row');
  });
}(jQuery, cloudUI));
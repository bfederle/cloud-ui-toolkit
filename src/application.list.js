(function($, _, cloudUI) {
  cloudUI.event.handler({
    'application-container': {
      showSection: function(args) {
        var section = args.section;
        var listArgs = args.section.list;
        var $list, list;
        
        if (!listArgs) return;

        // Initialize list view
        $list = $('<div>');
        list = cloudUI.widgets.list(
          _.extend(_.clone(listArgs), {
            $list: $list
          })
        );

        // Setup event handling
        cloudUI.event.register({
          id: 'application-list',
          $elem: $list,
          data: {
            $list: $list,            
            section: section,
            listArgs: listArgs
          }
        });
        cloudUI.event.call('init', $list);

        $list.appendTo(args.$panel);
      }
    }
  });
}(jQuery, _, cloudUI));
(function($, _, cloudUI) {
  // Application list view integration
  cloudUI.event.handler({
    'application-container': {
      showSection: function(args) {
        var section = args.section;
        var application = args.application;
        var listArgs = cloudUI.which(args.section, [
          'list', 'listView'
        ]);
        var $list, list;

        if (!listArgs) return;

        // Initialize list view
        $list = $('<div>');
        list = cloudUI.widgets.list(
          _.extend(_.clone(listArgs), {
            $list: $list,
            application: application,
            section: section
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

        $list.appendTo(args.$panel);
      }
    }
  });
}(jQuery, _, cloudUI));
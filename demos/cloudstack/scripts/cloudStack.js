(function($, cloudUI) {
  $(function() {
    var cloudStack = window.cloudStack = {
      home: 'dashboard',
      sectionDisplay: [
        'dashboard',
        'instances',
        'storage',
        'network',
        'templates',
        'events',
        'accounts',
        'domains',
        'system',
        'projects',
        'global-settings',
        'configuration'
      ],
      sections: {
        dashboard: {
          title: 'Dashboard', content: function() { return $('<div>').html('Dashboard'); }
        },
        instances: {
          title: 'Instances', content: function() {
            var $list = $('<div>');
            var list = window._list = cloudUI.widgets.list({
              $list: $list,
              id: 'instances',
              fields: {
                name: { label: 'Name' },
                account: { label: 'Account' },
                zone: { label: 'Zone' },
                status: { label: 'Status' }
              },
              dataProvider: function(args) {
                var data = [];

                for (var i = 1; i <= 100; i++) {
                  data.push({
                    name: 'i-' + i + '-VM',
                    account: 'brian',
                    zone: 'Zone 1',
                    status: 'Enabled'
                  });
                }

                setTimeout(function() {
                  args.response.success({ data: data });
                }, 500);
              }
            });

            return $list;
          }
        },
        storage: {
          title: 'Storage', content: function() { return $('<div>').html('Storage'); }
        },
        network: {
          title: 'Network', content: function() { return $('<div>').html('Network'); }
        },
        templates: {
          title: 'Templates', content: function() { return $('<div>').html('Templates'); }
        },
        events: {
          title: 'Events', content: function() { return $('<div>').html('Events'); }
        },
        accounts: {
          title: 'Accounts', content: function() { return $('<div>').html('Accounts'); }
        },
        domains: {
          title: 'Domains', content: function() { return $('<div>').html('Domains'); }
        },
        system: {
          title: 'Infrastructure', content: function() { return $('<div>').html('Infrastructure'); }
        },
        projects: {
          title: 'Projects', content: function() { return $('<div>').html('Projects'); }
        },
        'configuration': {
          title: 'Service Offerings', content: function() { return $('<div>').html('Service Offerings'); }
        },
        'global-settings': {
          title: 'Global Settings', content: function() { return $('<div>').html('Global Settings'); }
        }
      }
    };

    cloudStack._container = cloudUI.application($.extend(cloudStack, {
      $container: $('#container')
    }));
  });
}(jQuery, cloudUI));

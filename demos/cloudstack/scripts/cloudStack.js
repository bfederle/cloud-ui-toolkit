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
        dashboard: { title: 'Dashboard' },

        // Sample list view
        instances: {
          title: 'Instances',
          list: {
            id: 'instances',
            fieldDisplay: ['name', 'zone', 'account', 'status'],
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
          }
        },
        storage: { title: 'Storage' },
        network: { title: 'Network' },
        templates: { title: 'Templates' },
        events: { title: 'Events' },
        accounts: { title: 'Accounts' },
        domains: { title: 'Domains' },
        system: { title: 'Infrastructure' },
        projects: { title: 'Projects' },
        'configuration': { title: 'Service Offerings' },
        'global-settings': { title: 'Global Settings '}
      }
    };

    cloudStack._application = cloudUI.application($.extend(cloudStack, {
      $container: $('#container')
    }));
  });
}(jQuery, cloudUI));

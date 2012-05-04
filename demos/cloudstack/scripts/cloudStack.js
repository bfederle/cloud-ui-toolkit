(function($) {
  $(function() {
    var cloudStack = window.cloudStack = {
      sectionDisplay: [
        'dashboard',
        'instances',
        'storage',
        'network',
        'templates',
        'events',
        'accounts',
        'domains',
        'infrastructure',
        'projects',
        'globalSettings',
        'serviceOfferings'
      ],
      sections: {
        dashboard: {
          title: 'Dashboard'
        },
        instances: {
          title: 'Instances'
        },
        storage: {
          title: 'Storage'
        },
        network: {
          title: 'Network'
        },
        templates: {
          title: 'Templates'
        },
        events: {
          title: 'Events'
        },
        accounts: {
          title: 'Accounts'
        },
        domains: {
          title: 'Domains'
        },
        infrastructure: {
          title: 'Infrastructure'
        },
        projects: {
          title: 'Projects'
        },
        serviceOfferings: {
          title: 'Service Offerings'
        },
        globalSettings: {
          title: 'Global Settings'
        }
      }
    };
    
    cloudStack._container = cloudUI.widgets.container($.extend(cloudStack, {
      $elem: $('#container')
    }));
  });
}(jQuery));

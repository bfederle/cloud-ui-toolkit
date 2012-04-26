(function($) {
  $(function() {
    var cloudStack = {
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
        globalSettings: {
          title: 'Global Settings'
        },
        serviceOfferings: {
          title: 'Service Offerings'
        }
      }
    };
    
    $('#container').cloudContainer(cloudStack);
  });
}(jQuery));
(function($) {
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
        'infrastructure',
        'projects',
        'globalSettings',
        'serviceOfferings'
      ],
      sections: {
        dashboard: {
          title: 'Dashboard', content: function() { return $('<div>').html('Dashboard'); }
        },
        instances: {
          title: 'Instances', content: function() { return $('<div>').html('Instances'); }
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
        infrastructure: {
          title: 'Infrastructure', content: function() { return $('<div>').html('Infrastructure'); }
        },
        projects: {
          title: 'Projects', content: function() { return $('<div>').html('Projects'); }
        },
        serviceOfferings: {
          title: 'Service Offerings', content: function() { return $('<div>').html('Service Offerings'); }
        },
        globalSettings: {
          title: 'Global Settings', content: function() { return $('<div>').html('Global Settings'); }
        }
      }
    };
    
    cloudStack._container = cloudUI.widgets.container($.extend(cloudStack, {
      $container: $('#container')
    }));
  });
}(jQuery));

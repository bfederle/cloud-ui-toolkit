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

        instances: {
          title: 'Instances',

          // Actions
          actions: {
            start: {
              label: 'Start VM',
              action: function(args) {
                args.response.success();
              }
            },

            stop: {
              label: 'Stop VM',
              action: function(args) {
                args.response.success();
              }
            },

            restart: {
              label: 'Restart VM',
              action: function(args) {
                args.response.success();
              }
            },

            destroy: {
              label: 'Destroy VM',
              action: function(args) {
                args.response.success();
              }
            }
          },

          // List view
          list: {
            id: 'instances',
            fieldDisplay: ['name', 'zone', 'account', 'status'],
            actionDisplay: ['start', 'stop', 'restart'],
            fields: {
              name: { label: 'Name' },
              account: { label: 'Account' },
              zone: { label: 'Zone' },
              status: {
                label: 'Status',
                indicator: {
                  'Running': 'on',
                  'Stopped': 'off',
                  'Destroyed': 'off',
                  'Error': 'off'
                }
              }
            },
            dataProvider: function(args) {
              var data = [];

              for (var i = 1; i <= 100; i++) {
                data.push({
                  name: 'i-' + i + '-VM',
                  account: 'brian',
                  zone: 'Zone 1',
                  status: 'Running'
                });
              }

              setTimeout(function() {
                args.response.success({ data: data });
              }, 100);
            }
          },

          // Detail view
          details: {
            tabs: {
              details: {
                title: 'Details',
                fields: [
                  {
                    name: { label: 'Name' }
                  },
                  {
                    state: { label: 'State' },
                    zoneName: { label: 'Zone name' },
                    account: { label: 'Account' },
                    domain: { label: 'Domain' },
                    hypervisor: { label: 'Hypervisor' },
                    template: { label: 'Template' },
                    osType: { label: 'OS Type' },
                    computeOffering: { label: 'Compute offering' },
                    haEnabled: { label: 'HA Enabled', isBoolean: true },
                    group: { label: 'Group' }
                  }
                ],
                dataProvider: function(args) {
                  var instance = args.context.instances[0];
                  
                  var data = {
                    name: instance.name,
                    state: instance.status,
                    zoneName: instance.zone,
                    account: instance.account,
                    domain: 'users',
                    hypervisor: 'XenServer',
                    template: 'CentOS',
                    osType: 'Linux',
                    computeOffering: 'Small Instance',
                    haEnabled: false
                    
                    // group: null
                  };

                  args.response.success({
                    data: data
                  });
                }
              },
              statistics: {
                title: 'Statistics',
                fields: [
                  {
                    totalCPU: { label: 'Total CPU' },
                    cpuused: { label: 'CPU utilized' },
                    networkkbsread: { label: 'Network read' },
                    networkkbswrite: { label: 'Network write' }
                  }
                ],
                dataProvider: function(args) {
                  var data = {
                    totalCPU: '500 mhz',
                    cpuused: '50%',
                    networkkbsread: '1000 kb/s',
                    networkkbswrite: '1250 kb/s'
                  };

                  args.response.success({
                    data: data
                  });
                }
              }
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

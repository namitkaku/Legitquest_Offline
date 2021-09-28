const {  init} = require('@sentry/electron'); 
init({
  dsn: 'https://86f00960ba714e308c4620f1e4b848b7@o359540.ingest.sentry.io/5802035', 
  debug: true, 
  appName: 'legitquest',
  integrations: function(integrations) { 
    return integrations.filter(function(integration) { 
      return  true //integration.name !== "Breadcrumbs";
    });
  },
});

/* addBreadcrumb({ message: 'test' });

configureScope(scope => {
  scope.setUser({ id: 'abc' });
});
 */
var express = require('express');
var config = require('./config/config');

var app = module.exports = express();

// Check node_env, if not set default to development
process.env.NODE_ENV = (process.env.NODE_ENV || "development");

// Configuration, defaults to jade as the view engine
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

/*
 * This section is for environment specific configuration
 */
app.configure('development', function(){
    config.setDevelopmentConfig();
    console.log(config.DatabaseConfig);
    console.log(config.EnvConfig);

    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    config.setProductionConfig();
    console.log(config.DatabaseConfig);
    console.log(config.EnvConfig);
    
    app.use(express.errorHandler());
});


app.listen(config.EnvConfig.port, function(){
  console.log(app);
  
  //console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});


/*
 * Exports the express app for other modules to use
 * all route matches go the routes.js file
 */
module.exports.app = app;
routes = require('./routes');



# Novaball UI Functional Specification

## Document Version

| Author        | Changes       | Version  | Date |
| ------------- |-------------| :--------| -----: |
| Stephen McElhinney | Initial revision| 0.1 | 07/05/2014|

## Overview
Novaball is a single-page application (_SPA_), using a HTML/CSS frontend, and using a Javascript framework as the processing layer, connecting to a REST API datasource. 


## Architectural Pattern
Novaball uses a Model-View-Controller paradigm, utilizing a framework known as AngularJS (<https://angularjs.org/>). The application is separated into distinct parts using the following MVC mapping: 

* __Model__ - The data source, in this case the REST API which delivers JSON
* __View__ - HTML layouts, HTML partials (for fragments) and custom directives
* __Controller__ - The JS processing layer responsible for variable and scope management, and delivery, to views. The controller also consists of various factories and services used by the application for repeatable functionality. 

Where possible, core logic and data processing has been moved from controller to directives (in cases where DOM manipulation is required) and services (where functionality is common to multiple controllers). The [DRY principle](http://en.wikipedia.org/wiki/Don't_repeat_yourself) of software development has been applied and adhered to.

In addition to the standard benefits of MVC (such as logic/presentation separation), AngularJS also provides extra functionality out of the box, useful in developing SPA's. 

### Declarative two-way data-binding
Two-way data-binding is built in to AngularJS and provides an easy mechanism for [synchronization of data between the model and view components](https://docs.angularjs.org/guide/databinding). The AngularJS application manages the scope of the application, such that any changes to scope variables are reflected in both the model and view as necessary. More information on how scope is managed in AngularJS apps is available [here](https://docs.angularjs.org/guide/scope).


### Dependency injection
From the AngularJS docs: 

> Dependency Injection (DI) is a software design pattern that deals with how components get hold of their dependencies.

DI in AngularJS is done through the use of an ``$injector`` which is responsible for the management (creation, location, use) of dependent packages

#### A note on DI and minification
For performance reasons, it is intended that client-side Javascript for Novaball will be minified (compressed) for delivery to the browser. AngularJS controller definitions require certain constructor patterns to make them minification-safe, due to the way most minification tools rename variables. 

There are two minification-safe ways to initialize controllers, examples are below

_Example 1: Creating an $inject property_
	
	function MyController($scope, $http) {...}
    MyController.$inject = ['$scope', '$http'];
    myApp.controller('MyController', MyController);
    
_Example 2: Inline constructor - where the function is last property "injected"_
	
	myApp.controller('MyController', ['$scope', '$http', function($scope, $http) {...}]);
	
For the Novaball application, the second method has been used, due to it having significantly less code to remember. 

In terms of actual minification will be carried out by the _Grunt_ task-runner, details of which are found further in this document.

## Continuous Integration
The Novaball project uses a continuous integration practice, utilising Github repositories to manage the codebase. Developers work on feature, or fix-based branches individually, and merge with the master repo daily. 

The Github repos are 

* [Novaball Customer UI](https://github.com/Kelfast/novaball-customer)
* [Novaball Support UI](https://github.com/Kelfast/novaball-support)

_For Github repo access, please contact Oscar Campos <oscar.campos@betbright.com>_

Post-launch, it is envisaged that merges to the master repo are only done once all features of a release have been created and tested. The master repo should act as last-known stable build. For best-practice, a branch management strategy should be implemented. For example, at the very least, each major release should have at lease 1 staging, 1 development branch. 

### Build automation using Buildbot
Hand in hand with CI, Novaball utilises [Buildbot, an open-source build automation framework](http://buildbot.net/), to automate builds to the staging environment. Buildbot is configured to "pull" the latest changes from the master branch of the Github repo, and automatically install all required packages, before deploying to a location on the same server. The latest build of the Novaball Customer UI is available at http://54.72.103.19:8020/ 

#### Node.js testing server on Buildbot
For ease of testing, the Novaball repo has a built in Node.js HTTP server, containing a dummy REST API using the restify Node.js library. For details on how to setup and start the Node.js service, see the [README.md](https://github.com/Kelfast/novaball-customer/blob/master/README.md) in the Github repo.

In the buildbot environment, there is a front-facing nginx server, which "proxies" requests to the Node.js HTTP server. The automated build script carries out the following steps

* ``git update`` - Gets the latest version of the Github master branch
* ``npm install`` - installs all Node.js dependencies for the HTTP server/REST API
* ``bower install`` - installs some UI dependencies (Bootstrap, jQuery, AngularJS etc)
* ``grunt`` - task runner for post install operations such as CSS compilation, minification, automated unit testing
* ``./restart.sh`` - restarts the Node.js service

After the automated build completes, the new version of the Novaball UI can be seen on <http://54.72.103.19:8021> - (this is configured in the nginx.conf file).

To force builds of the Novaball Customer UI application, you need to login in the top right corner - the current username/login is ``stephen/stephen``. 

_Changes to the Buildbot configuration require logging in to the AWS instance using ssh username and password. For AWS access, please contact Robert Oliveira at <rober.oliveira@betbright.com>_


### Package Managers
As mentioned in the Buildbot post install build configuration details above, Novaball uses package managers to keep track of packages used by the application. There are two package managers used in the application, ``npm`` for Node.js packages (server-side packages) and ``bower`` for user interface libraries and frameworks. 

#### Adding packages 
Adding packages to the application, is a straightforward command-line process. There are also some steps required to add the packages to the minification suite in ``grunt``, although this could be automated at a later stage. 

##### NPM
To install a new library for use in Node.js, change directory to the application root in a command line interface (such as Terminal or cygwin, DOS is fine too).

* ``npm install <package_name> --save``   
the ``--save`` option adds the package * dependency to the ``package.json`` file, including the version number, so that it will automatically be installed using the Buildbot build step. 
* The package is now available to the application using the ``var x = require('<package_name>');`` directive.


##### Bower
Installing new UI libraries has a similar process. Once again, browse to the application root directory as before in a CLI. 


* ``bower install --save <package_name>`` - saves the package dependency to ``bower.json`` and downloads the package to a pre-configured directory (see below)
* Update the ``Gruntfile.js`` file with the new dependency; Find the ``concat`` task, and add the package there
* Add the new 

The location of the packages is configured in the file ``.bowerrc``, but changing this value will result in application-wide dependencies breaking, so make sure you know what you're doing. 

#### Updating certain packages
If a package has a major update (for example jQuery), the best thing to do is to remove the line in ``bower.json`` relating to that dependency, and re-install it using ``bower install --save jquery``, which retrieves the latest version. For more information on Bower, including how to download and save _specific_ versions of packages, [check out the bower.io documentation.](https://github.com/bower/bower)


### Buildbot    

Automated package management (bower, npm)
Automated testing - Grunt, Karma

### Configuring 

## Component design
Angular JS Components
Resources
Controllers
Services
Factories
Directives

### Modular design
Scalability

### Dependency management
Package manager
Dependency injection
Notes on minification


## Web Services

### Novaball BE API

### PCI Service Integration

### Dummy Node.js service

### Apiary.io documentation
The API documentation for the frontend is located at <http://docs.novaballcustomerapi.apiary.io/>

## UI Development
Responsive, grid-based, mobile-first methodology

### Grid-based framework
Bootstrap 12-col
Guttering
Columns & stacking

### Breakpoints for responsive design
3 breakpoints

### Mobile accessibility
Touch capability
Considerations for WAI-ARIA

### Syntactically Awesome Stylesheets (SASS)
Grunt
White label


## Affiliate branding
Runtime configuration (SASS)
Language packs

## Considerations for Angular 2.0
Extending directives

## Appendices

## Contact

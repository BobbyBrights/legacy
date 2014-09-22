var fs = require('fs'), system = require('system');

/**
 * Wait until the test condition is true or a timeout occurs. Useful for waiting
 * on a server response or for a ui change (fadeIn, etc.) to occur.
 *
 * @param testFx javascript condition that evaluates to a boolean,
 * it can be passed in as a string (e.g.: "1 == 1" or "$('#bar').is(':visible')" or
 * as a callback function.
 * @param onReady what to do when testFx condition is fulfilled,
 * it can be passed in as a string (e.g.: "1 == 1" or "$('#bar').is(':visible')" or
 * as a callback function.
 * @param timeOutMillis the max amount of time to wait. If not specified, 3 sec is used.
 */
function waitFor(testFx, onReady, timeOutMillis) {
    var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 3001, //< Default Max Timeout is 3s
        start = new Date().getTime(),
        condition = false,
        interval = setInterval(function() {
            if ( (new Date().getTime() - start < maxtimeOutMillis) && !condition ) {
                // If not time-out yet and condition not yet fulfilled
                condition = (typeof(testFx) === "string" ? eval(testFx) : testFx()); //< defensive code
            } else {
                if(!condition) {
                    // If condition still not fulfilled (timeout but condition is 'false')
                    console.log("'waitFor()' timeout");
                    phantom.exit(1);
                } else {
                    // Condition fulfilled (timeout and/or condition is 'true')
                    console.log("'waitFor()' finished in " + (new Date().getTime() - start) + "ms.");
                    typeof(onReady) === "string" ? eval(onReady) : onReady(); //< Do what it's supposed to do once the condition is fulfilled
                    clearInterval(interval); //< Stop this interval
                }
            }
        }, 100); //< repeat check every 100ms
};


if (system.args.length !== 4) {
    console.log('Usage: runtest.js <URL> <spec.js> <output>');
    phantom.exit(1);
}

var startPage = system.args[1];
var specFile = system.args[2];
var outputDir = system.args[3];

var page = require('webpage').create();

if(specFile.indexOf('wp8')!=-1){
	page.settings.userAgent = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM;';
	page.viewportSize = { width: 480, height: 800 };
} else {
	page.settings.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3';
	page.viewportSize = { width: 320, height: 480 };
}

var currentContext = specFile.split('\\').pop().split('.')[0];

page.onCallback = function(data) {
	if(data && data.cmd && data.cmd == 'capture'){
		var description = page.evaluate(function(name,ctx){
			jasmine.getEnv().currentSpec.screenshots = jasmine.getEnv().currentSpec.screenshots || [];
			var description = jasmine.getEnv().currentSpec.description;
			var sc = { path : ctx + '\\' + description + '\\' + name  + '.png'};
			jasmine.getEnv().currentSpec.screenshots.push(sc);
			return description;
		},data.name,currentContext);
		var path = outputDir + '\\' + currentContext+ '\\' + description  + '\\' + data.name  + '.png';
//		system.stdout.writeLine("Capture command currentContext: " +  currentContext);
//		system.stdout.writeLine("Capture command : " + path);
		page.render(path);
	}
};


page.open(startPage, function () {
    
//	setTimeout(function(){
//		page.render('timeout.png');
//	},22000);
	page.evaluate(function(){
        window.JUNITResults = {};
        window.JUNITResults.names = [];
        window.JUNITResults.texts = [];
        window.fs_path_separator = "\\";
        window.__phantom_writeFile = function(filename, text) {
        	window.JUNITResults.names.push(filename);
            window.JUNITResults.texts.push(text);
        };
    });

  	system.stdout.writeLine("Start to inject files...");
	page.injectJs('../jasmine/lib/jquery.mockjax.js');
	page.injectJs('../jasmine/lib/jasmine-1.3.1/jasmine.js');
	page.injectJs('../jasmine/lib/jasmine-1.3.1/jasmine-html.js');
	page.injectJs('../jasmine/lib/jasmine-1.3.1/jasmine-console.js');
	page.injectJs('../jasmine/lib/jasmine-1.3.1/jasmine-jquery-1.3.1.js');
	page.injectJs('../jasmine/lib/jasmine-1.3.1/junit_reporter.js');
	page.injectJs('../jasmine/lib/jasmine-1.3.1/jasmine/lib/jasmine-1.3.1/junit_reporter.js');
	page.injectJs('../jasmine/lib/jquery.mockjax.js');
	page.injectJs('../jasmine/spec/SpecHelper.js');
	system.stdout.writeLine("Spec file is "+system.args[2]);
	page.injectJs(specFile);
	page.injectJs('../jasmine/myRunner.js');
	system.stdout.writeLine("....injection done");
	
	
     waitFor(function(){
//    	 return "$('#HTMLReporterDone').length > 0";
            return page.evaluate(function(){
                return document.getElementById("HTMLReporterDone") != null;
            });
      },  function(){
    	  	system.stdout.writeLine("Hey this is done!");
    	  	system.stdout.writeLine("screenshot : " + outputDir + '/'+ specFile.split('\\').pop()  + '.png');
    	  	
    	  	//TODO manage when there are several suites!!
	  		var name = page.evaluate(function(){
	  			return   JUNITResults.names[0];
	  		});
	  		system.stdout.writeLine("Name " + name);
	  		var xml = page.evaluate(function(){
	  			return   JUNITResults.texts[0];
	  		});
	  		page.render(outputDir + '\\'+ name.replace('.xml','.png'));
	  		fs.write(outputDir + '/'+name, xml, 'w');
	  		
            phantom.exit(0);
        },500000);
});
(function() {
	// window.JUNITResults = {};
	// window.JUNITResults.names = [];
	// window.JUNITResults.texts = [];
	// window.fs_path_separator = "\\";
	// window.__phantom_writeFile = function(filename, text) {
	// window.JUNITResults.names.push(filename);
	// window.JUNITResults.texts.push(text);
	// };
	//      
	var showHTMLReport = false;

	var jasmineEnv = jasmine.getEnv();
	jasmineEnv.updateInterval = 1000;

	var junitReporter = new jasmine.JUnitXmlReporter();
	jasmineEnv.addReporter(junitReporter);
	jasmineEnv.addReporter(new jasmine.ConsoleReporter());

	if (showHTMLReport) {
		var htmlReporter = new jasmine.HtmlReporter();
		jasmineEnv.addReporter(htmlReporter);
	}

	// jasmineEnv.specFilter = function(spec) {
	// return htmlReporter.specFilter(spec);
	// };

	$(document).ready(function() {
		window.setTimeout(execJasmine, 3000);
	});

	function execJasmine() {
		var oldCallback = jasmineEnv.currentRunner().finishCallback;
		jasmineEnv.currentRunner().finishCallback = function() {
			oldCallback.apply(this, arguments);
			if (showHTMLReport) {
				$('.page').hide();
				$('#HTMLReporter').show();
				$('#footer').hide();
			}
			$('body').append('<div id="HTMLReporterDone" ></div>');
		};
		jasmineEnv.execute();
	}

})();
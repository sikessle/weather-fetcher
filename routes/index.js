var request = require("request");
var cheerio = require("cheerio");

var url = 'http://www.wetterwarte-sued.com/v_1_0/aktuelles/vorhersage.php';

var parseWeatherSiteData = function(htmlString) {
	var weather = {
			short: '',
			time: '',
			forecast: '',
			furtherForecast: ''
	};
	
	var $ = cheerio.load(htmlString);
	
	weather.short = $("#vorhersage h2").text();
	weather.time = $("#vorhersage h2").next("h3").text();
	weather.forecast = $("#vorhersage h2").next("h3").nextUntil("h3").text();
	weather.furtherForecast = $("#vorhersage .copyright").prevUntil("h3").text();
	
	return weather;
};

var sendWeatherData = function(res, jsonWeather) {
	res.setHeader('Content-Type', 'application/json; charset=utf8');
	res.end(JSON.stringify(jsonWeather));
};

exports.weather = function(req, res) {
	
	request({
		url : url,
        encoding : "binary"
	}, function(err, resp, body) {
        if (err || resp.statusCode != 200) {
            res.end("");
            return;
        }
		var jsonWeather = parseWeatherSiteData(body);
		sendWeatherData(res, jsonWeather);
	});
};

exports.index = function(req, res) {
	res.render("index");
};
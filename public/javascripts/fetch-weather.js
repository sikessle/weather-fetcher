$(document).ready(function() {
	$.get("/weather", function(data) {
	    var $target = $("#weather");
        $target.find(".time").html(data.time);
        $target.find(".short").html(data.short);
        $target.find(".forecast").html(data.forecast);
        $target.find(".further").html(data.furtherForecast);
        $target.addClass("ready");
	});
});
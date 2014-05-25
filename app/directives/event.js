app.directive('event', function() {
	return {
		restrict: 'E',
		template: '<div class="panel panel-info">' +
			'<div class="panel-heading">' +
			'    <span class="glyphicon glyphicon-time"/>' +
			'    {{ event.timeFormatted }}' +
			'</div>' +
			'<div class="panel-body">' +
			'    The next {{ event.type }} will occur in {{ event.minsUntil | number : 0 }} minutes.' +
			'</div>' +
			'</div>'
	};
});
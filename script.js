// Code goes here

var app = angular.module('OrbitalSunriseTracker', function() {});
app.controller('mainCtrl', function($scope, $interval) {
	$scope.isEmbed = false;
	$scope.events = [];

	var updateRemainingTimes = function() {
		var remainingTime = "ERR";

		var currTime = Math.round(new Date().getTime() / 1000);
		var currOrbitData = orbit.orbitData[1];
		var prevOrbitData = orbit.orbitData[0];

		var nextSunriseTime;
		var nextSunsetTime;

		for (var i = 1; i < _.size(orbit.orbitData); i++) {
			currOrbitData = orbit.orbitData[i];

			if (currOrbitData.t < currTime) {
				$scope.currentlyLit = currOrbitData.s;
			}

			if (prevOrbitData.s === false && currOrbitData.s === true) {
				nextSunriseTime = prevOrbitData.t;
			}

			if (prevOrbitData.s === true && currOrbitData.s === false) {
				nextSunsetTime = prevOrbitData.t;
			}
			prevOrbitData = currOrbitData;
		}

		$scope.events = [];

		$scope.events.push({
			type: 'sunrise',
			timeFormatted: moment().add('minutes', (nextSunriseTime - currTime) / 60).format('hh:MM a'),
			minsUntil: (nextSunriseTime - currTime) / 60
		});

		$scope.events.push({
			type: 'sunset',
			timeFormatted: moment().add('minutes', (nextSunsetTime - currTime) / 60).format('hh:MM a'),
			minsUntil: (nextSunsetTime - currTime) / 60
		});
	};

	$interval(updateRemainingTimes, 30000);
	updateRemainingTimes();
});
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
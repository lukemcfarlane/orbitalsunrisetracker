app.controller('mainCtrl', function($scope, $interval, $q) {
	$scope.isEmbed = true;
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
			timeFormatted: moment.unix(nextSunriseTime).format('hh:mm a'),
			minsUntil: (nextSunriseTime - currTime) / 60
		});

		$scope.events.push({
			type: 'sunset',
			timeFormatted: moment.unix(nextSunsetTime).format('hh:MM a'),
			minsUntil: (nextSunsetTime - currTime) / 60
		});
	};

	$interval(updateRemainingTimes, 30000);
	updateRemainingTimes();
});
// Code goes here

function issTrackerCtrl($scope, $interval) {
	$scope.isEmbed = false;

	var updateRemainingTimes = function() {
		var remainingTime = "ERR";

		var currTime = Math.round(new Date().getTime() / 1000);
		var currOrbitData = orbit.orbitData[1];
		var prevOrbitData = orbit.orbitData[0];

		var nextSunriseTime;
		var nextSunsetTime;

		for (var i = 1; i < _.size(orbit.orbitData); i++) {
			currOrbitData = orbit.orbitData[i];

			if (prevOrbitData.s === false && currOrbitData.s === true) {
				nextSunriseTime = prevOrbitData.t;
			}

			if (prevOrbitData.s === true && currOrbitData.s === false) {
				nextSunsetTime = prevOrbitData.t;
			}
			prevOrbitData = currOrbitData;
		}

		$scope.minsUntilSunrise = (nextSunriseTime - currTime) / 60;
		$scope.minsUntilSunset = (nextSunsetTime - currTime) / 60;
	};

	$interval(updateRemainingTimes, 1000);
}
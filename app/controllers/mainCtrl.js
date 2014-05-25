/**
 * This is the main controller for the app, used in index.html.
 *
 * @author  https://github.com/lukemcfarlane
 * @date    May 2014
 */
app.controller('mainCtrl', function($scope, $interval, $q, OrbitDataService) {
	$scope.isEmbed = true;
	$scope.events = [];

	var updateRemainingTimes = function() {
		var remainingTime = "ERR";

		var currTime = Math.round(new Date().getTime() / 1000);

		OrbitDataService.init(orbit);
		var nextSunriseTime = OrbitDataService.getNextSunriseTime(currTime);
		var nextSunsetTime = OrbitDataService.getNextSunsetTime(currTime);
		$scope.currentlyLit = OrbitDataService.isCurrentlyDaylit(currTime);

		$scope.events = [];

		$scope.events.push({
			type: 'sunrise',
			timeFormatted: moment.unix(nextSunriseTime).format('hh:mm a'),
			minsUntil: (nextSunriseTime - currTime) / 60
		});

		$scope.events.push({
			type: 'sunset',
			timeFormatted: moment.unix(nextSunsetTime).format('hh:mm a'),
			minsUntil: (nextSunsetTime - currTime) / 60
		});
	};

	$interval(updateRemainingTimes, 30000);
	updateRemainingTimes();
});
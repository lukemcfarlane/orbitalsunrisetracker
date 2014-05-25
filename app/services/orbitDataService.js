/**
 * Get sunrise/sunset times from orbit data.
 *
 * OrbitDataService must first be initialised with an orbit object:
 *
 * {
 *  sat: 25544,
 *  tRef: 1400627050,
 *  orbitData: [{
 *      t: 1400627040,
 *      ln: 29.015,
 *      lt: 22.332,
 *      h: 414,
 *      v: 7.667,
 *      s: false
 *  },
 *  ....
 *  ]
 * }
 *
 * @author  https://github.com/lukemcfarlane
 * @date    May 2014
 */
app.factory('OrbitDataService', function() {
	var OrbitDataService = {
		init: function(orbitData) {
			OrbitDataService.orbitData = orbitData;
			for (var i = 0; i < _.size(orbitData.orbitData) - 1; i++) {
				var data = orbitData.orbitData[i];
				var nextData = orbitData.orbitData[i + 1];
				data.next = nextData;
			}
		},
		getNextSunriseTime: function(time) {
			var sunriseData = _.find(
				OrbitDataService.orbitData.orbitData,
				function(data) {
					return data.t >= time &&
						data.s === false &&
						data.next.s === true;
				}
			);
			return sunriseData.next.t;
		},
		getNextSunsetTime: function(time) {
			var sunsetData = _.find(
				OrbitDataService.orbitData.orbitData,
				function(data) {
					return data.t >= time &&
						data.s === true &&
						data.next.s === false;
				}
			);
			return sunsetData.next.t;
		},
		isCurrentlyDaylit: function(time) {
			var currData = OrbitDataService.getDataForTime(time);
			return !angular.isUndefined(currData) ? currData.s : false;
		},
		getDataForTime: function(time) {
			var currData = _.find(
				OrbitDataService.orbitData.orbitData,
				function(data) {
					return data.next.t > time;
				}
			);
			return currData;
		}
	};
	return OrbitDataService;
});
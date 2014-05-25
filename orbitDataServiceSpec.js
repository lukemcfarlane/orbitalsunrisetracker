/**
 * Jasmine test specs for orbitDatService.js.
 * Uses mock data in mockOrbitData.js.
 *
 * @author  https://github.com/lukemcfarlane
 * @date    May 2014
 */
describe('the orbit data service', function() {
	beforeEach(module('OrbitalSunriseTracker'));

	beforeEach(inject(function(_OrbitDataService_) {
		OrbitDataService = _OrbitDataService_;
	}));

	it('should initialise with orbit data object', function() {
		OrbitDataService.init(orbit);
		expect(OrbitDataService.orbitData).toEqual(jasmine.any(Object));
	});

	it('should get the correct orbit data given a time that matches exactly', function() {
		OrbitDataService.init(orbit);
		var data = OrbitDataService.getDataForTime(1400628480);
		expect(data.t).toEqual(1400628480);
	});

	it('should get the correct orbit data given a time that doesn\'t match exactly', function() {
		OrbitDataService.init(orbit);
		var data = OrbitDataService.getDataForTime(1400628440);
		expect(data).toEqual(jasmine.any(Object));
		expect(data.t).toEqual(1400628420);
	});
	it('should correctly determine if a given time is daylit', function() {
		OrbitDataService.init(orbit);
		expect(OrbitDataService.isCurrentlyDaylit(1400627442)).toEqual(false);
		expect(OrbitDataService.isCurrentlyDaylit(1400627443)).toEqual(true);
	});

	it('should correctly get the next sunrise given a time', function() {
		OrbitDataService.init(orbit);
		var t = OrbitDataService.getNextSunriseTime(1400627100);
		expect(t).toEqual(1400627443);
	});

	it('should correctly get the next sunset given a time', function() {
		OrbitDataService.init(orbit);
		var t = OrbitDataService.getNextSunsetTime(1400627460);
		expect(t).toEqual(1400630874);
	});

	it('should correctly get the next sunset given a time when not currently daylit', function() {
		OrbitDataService.init(orbit);
		var t = OrbitDataService.getNextSunsetTime(1400627160);
		expect(t).toEqual(1400630874);
	});
});
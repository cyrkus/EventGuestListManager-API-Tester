var request = require('request');
var config  = require('./conf/config');
var customMatchers = require('./conf/customMatchers');

describe("/verify", function() {
	var json;

	beforeEach(function() {
		jasmine.addMatchers( customMatchers );
	});

	beforeAll(function(done) {

		console.log('GET ' + config.endpoint + '/verify');
		request.get({
			url: config.endpoint + '/verify',
			headers: {
				'x-version': config.version,
				'User-Agent': config.ua
			},
			auth: {
				username: config.user,
				password: config.pass,
				sendImmediately: true
			},
		}, function(err, res, body) {
			json = JSON.parse( body );
			// console.log( json );
			done();
		});

	});

	it("contains a user object", function(done) {
		expect( json.user ).toBeDefined();
		done();
	});

	it("contains a user object with valid attributes", function(done) {
		expect( json.user.id ).toBeDefined();
		expect( json.user.id ).toBeType( String );

		expect( json.user.username ).toBeDefined();
		expect( json.user.email ).toBeDefined();
		expect( json.user.group ).toBeDefined();
		done();
	});

});

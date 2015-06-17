var frisby = require( 'frisby' );
var config = require( './conf/config' );
var helper = require( './conf/helpers' );
var object = require( './conf/objects' );

frisby.globalSetup({
  request: {
    headers: {
      'Authorization': 'Basic ' + config.auth,
      'User-Agent': config.ua,
      'x-version': config.version,
    },
  },
});

frisby.create( 'clients :: Invalid Login' )
  .get( config.endpoint + '/clients' )
  .removeHeader( 'Authorization' )
  .expectStatus( 401 )
.toss();

frisby.create( 'clients' )
  .get( config.endpoint + '/clients' )
  .expectStatus( 200 )
  .expectJSONTypes( 'clients.?', object.client )
  .expectJSONTypes( 'clients.0.settings', object.clientSettings )
  .expectJSONTypes( 'clients.0.events.?', object.event )
  .expectJSONTypes( 'clients.0.events.0.settings', object.eventSettings )
  .expectJSONTypes( 'clients.0.events.0.attendees.?', object.attendee )
  .expectJSONTypes( 'clients.0.events.0.languages.?', object.language )
  .expectJSONTypes( 'clients.0.events.0.features.?', object.feature )
  .expectJSONTypes( 'clients.0.events.0.modes.?', object.mode )
  .expectJSONTypes( 'clients.0.events.0.modes.0.settings', object.modeSettings )
  .expectJSONTypes( 'clients.0.events.0.shares.?', object.share )
  .expectJSONTypes( 'clients.0.events.0.signups.?', object.signup )
.toss();

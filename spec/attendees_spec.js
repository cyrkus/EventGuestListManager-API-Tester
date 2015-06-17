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

frisby.create( 'attendees :: Invalid Login' )
  .get( config.endpoint + '/attendees' )
  .removeHeader( 'Authorization' )
  .expectStatus( 401 )
.toss();

frisby.create( 'attendees :: Missing Event ID' )
  .get( config.endpoint + '/attendees' )
  .expectStatus( 400 )
  .expectJSON({
    error: {
      type: 'invalid_request_error',
      message: 'The event id field is required.',
      param: 'event_id',
    },
  })
.toss();

frisby.create( 'attendees' )
  .get( config.endpoint + '/attendees?event_id=2' )
  .expectStatus( 200 )
  .expectJSONTypes( 'attendees.?', object.attendee )
  .expectJSONTypes( 'people.?', object.person )
  .expectJSONTypes( 'event', object.event )
  .expectJSONTypes( 'event.settings', object.eventSettings )
  .expectJSONTypes( 'event.languages.?', object.language )
  .expectJSONTypes( 'event.features.?', object.feature )
  .expectJSONTypes( 'event.modes.?', object.mode )
  .expectJSONTypes( 'event.modes.0.settings', object.modeSettings )
  .expectJSONTypes( 'client', object.client )
  .expectJSONTypes( 'client.settings', object.clientSettings )
.toss();

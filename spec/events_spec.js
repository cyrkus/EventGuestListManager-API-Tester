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

frisby.create( '/events :: Invalid Login' )
  .get( config.endpoint + '/events' )
  .removeHeader( 'Authorization' )
  .expectStatus( 401 )
.toss();

frisby.create( '/events' )
  .get( config.endpoint + '/events' )
  .expectStatus( 200 )
  .expectJSONTypes( 'events.?', object.event )
  .expectJSONTypes( 'events.0.settings', object.eventSettings )
  .expectJSONTypes( 'events.0.attendees.?', object.attendee )
  .expectJSONTypes( 'events.0.languages.?', object.language )
  .expectJSONTypes( 'events.0.features.?', object.feature )
  .expectJSONTypes( 'events.0.modes.?', object.mode )
  .expectJSONTypes( 'events.0.modes.0.settings', object.modeSettings )
  .expectJSONTypes( 'client', object.client )
  .expectJSONTypes( 'client.settings', object.clientSettings )
  .after( function( err, res, body ) {

    var json    = JSON.parse( body );
    var eventId = json.events[0].id;

    frisby.create( '/events/:id' )
      .get( config.endpoint + '/events/' + eventId )
      .expectStatus( 200 )
      .expectJSONTypes( 'event', object.event )
      .expectJSONTypes( 'event.settings', object.eventSettings )
      .expectJSONTypes( 'event.attendees.?', object.attendee )
      .expectJSONTypes( 'event.languages.?', object.language )
      .expectJSONTypes( 'event.features.?', object.feature )
      .expectJSONTypes( 'event.modes.?', object.mode )
      .expectJSONTypes( 'event.modes.0.settings', object.modeSettings )
      .expectJSONTypes( 'event.signups.?', object.signup )
      .expectJSONTypes( 'event.shares.?', object.share )
      .expectJSONTypes( 'client', object.client )
      .expectJSONTypes( 'client.settings', object.clientSettings )
      .expectJSONTypes( 'people.?', object.person )
      .expectJSONTypes( 'users.?', object.user )
    .toss();

  })
.toss();

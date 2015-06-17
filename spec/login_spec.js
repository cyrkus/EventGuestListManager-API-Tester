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

frisby.create( 'verify :: Invalid Login' )
  .get( config.endpoint + '/verify' )
  .removeHeader( 'Authorization' )
  .expectStatus( 401 )
.toss();

frisby.create( 'verify' )
  .get( config.endpoint + '/verify' )
  .expectStatus( 200 )
  .expectJSONTypes( 'user', object.user )
.toss();

frisby.create( 'login :: Invalid Login' )
  .get( config.endpoint + '/login' )
  .removeHeader( 'Authorization' )
  .expectStatus( 401 )
.toss();

frisby.create( 'login' )
  .get( config.endpoint + '/login' )
  .expectStatus( 200 )
  .expectJSONTypes( 'user', object.user )
  .expectJSONTypes( 'user.client', object.client )
  .expectJSONTypes( 'user.client.settings', object.clientSettings )
  .expectJSONTypes( 'user.client.events.?', object.event )
  .expectJSONTypes( 'user.client.events.0.settings', object.eventSettings )
  .expectJSONTypes( 'user.client.events.0.attendees.?', object.attendee )
  .expectJSONTypes( 'user.client.events.0.languages.?', object.language )
  .expectJSONTypes( 'user.client.events.0.features.?', object.feature )
  .expectJSONTypes( 'user.client.events.0.modes.?', object.mode )
  .expectJSONTypes( 'user.client.events.0.modes.0.settings', object.modeSettings )
  .expectJSONTypes( 'people.?', object.person )
  .expectJSONTypes( 'buttons.?', object.button )
  .expectJSONTypes( 'buttons.0.background', object.buttonBg )
  .expectJSONTypes( 'buttons.0.background_2x', object.buttonBg )
.toss();

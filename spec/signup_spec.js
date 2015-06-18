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

frisby.create( '/signup :: Invalid Login' )
  .post( config.endpoint + '/signup' )
  .removeHeader( 'Authorization' )
  .expectStatus( 401 )
.toss();

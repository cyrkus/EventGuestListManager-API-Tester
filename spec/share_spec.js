var frisby   = require( 'frisby' );
var config   = require( './conf/config' );
var helper   = require( './conf/helpers' );
var object   = require( './conf/objects' );
var _        = require( 'underscore' );
var fs       = require( 'fs' );
var path     = require( 'path' );
var FormData = require( 'form-data' );

var imagePath = path.resolve( __dirname, '../img/ryan-3.jpg' );

frisby.globalSetup({
  request: {
    headers: {
      'Authorization': 'Basic ' + config.auth,
      'User-Agent': config.ua,
      'x-version': config.version,
    },
  },
});

frisby.create( '/share :: Invalid Login' )
  .post( config.endpoint + '/share' )
  .removeHeader( 'Authorization' )
  .expectStatus( 401 )
.toss();

frisby.create( 'pre /share :: get feat + lang ids' )
  .get( config.endpoint + '/events' )
  .after( function( err, res, body ) {

    var json       = JSON.parse( body );
    var featureId  = 0;
    var languageId = 0;
    _.each( json.events[0].features, function( feature, i ) {
      if ( feature.type == 'photo_sharing' && featureId === 0 ) {
        featureId = feature.id;
      }
    });
    _.each( json.events[0].languages, function( lang, i ) {
      if ( lang.default == '1' ) {
        languageId = lang.id;
      }
    });

    var form = new FormData();
    form.append( 'feature_id', featureId );
    form.append( 'language_id', languageId );
    form.append( 'email', 'joe.sample@gmail.com' );
    form.append( 'type', 'email' );
    form.append( 'photo', fs.createReadStream( imagePath ), {
      knownLength: fs.statSync( imagePath ).size,
    });

    frisby.create( '/share' )
      .post( config.endpoint + '/share', form, {
        json: false,
        headers: {
          'content-type': 'multipart/form-data; boundary=' + form.getBoundary(),
          'content-length': form.getLengthSync(),
          'Authorization': 'Basic ' + config.auth,
          'User-Agent': config.ua,
          'x-version': config.version,
        },
      })
      .expectStatus( 200 )
      .expectJSONTypes( 'person', object.person )
      .expectJSONTypes( 'share', object.share )
    .toss();

  })
.toss();

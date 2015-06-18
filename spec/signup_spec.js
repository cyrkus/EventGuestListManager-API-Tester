var frisby   = require( 'frisby' );
var config   = require( './conf/config' );
var helper   = require( './conf/helpers' );
var object   = require( './conf/objects' );
var _        = require( 'underscore' );
var fs       = require( 'fs' );
var path     = require( 'path' );
var FormData = require( 'form-data' );

var imagePath = path.resolve( __dirname, '../img/ryan-3.jpg' );
var person = {
  'first_name': 'Ryan',
  'last_name': 'Anderson',
  'email': 'ryan@7apps.com',
  'phone': '5035551234',
  'street': '1234 SE Test St',
  'city': 'Portland',
  'state': 'OR',
  'zip': '97202',
};

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

frisby.create( 'pre /signup :: get feat + lang ids' )
  .get( config.endpoint + '/events' )
  .after( function( err, res, body ) {

    var json       = JSON.parse( body );
    var featureId  = 0;
    var signupForm = null;
    var languageId = 0;
    _.each( json.events[0].features, function( feature, i ) {
      if ( feature.type == 'form' && featureId === 0 ) {
        featureId  = feature.id;
        signupForm = feature.form;
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
    _.each( signupForm.inputs, function( input, i ) {
      var value = 'input ' + input.id + ' value';
      if ( input.mapping ) {
        value = person[ input.mapping ];
      }

      if ( input.type != 'button' ) {
        form.append( 'inputs[' + input.id + ']', value );
      } else if ( input.type == 'button' && input.settings.action == 'photo_id' ) {
        form.append( 'photo_id', fs.createReadStream( imagePath ), {
          knownLength: fs.statSync( imagePath ).size,
        });
      } else if ( input.type == 'button' && input.settings.action == 'sign' ) {
        form.append( 'signature', fs.createReadStream( imagePath ), {
          knownLength: fs.statSync( imagePath ).size,
        });
      }
    });

    frisby.create( '/signup' )
      .post( config.endpoint + '/signup', form, {
        json: false,
        headers: {
          'Authorization': 'Basic ' + config.auth,
          'User-Agent': config.ua,
          'x-version': config.version,
          'content-type': 'multipart/form-data; boundary=' + form.getBoundary(),
          'content-length': form.getLengthSync(),
        },
      })
      .expectStatus( 200 )
      .expectJSONTypes( 'person', object.person )
      .expectJSONTypes( 'signup', object.signup )
      // TODO: Add DELETE method to API for this to work
      // .after( function( err, res, body ) {
      //
      //   var json = JSON.parse( body );
      //   var signupId = json.signup.id;
      //
      //   frisby.create( '/signup' )
      //     .delete( config.endpoint + '/signup/' + signupId )
      //     .expectStatus( 200 )
      //   .toss();
      //
      // })
    .toss();

  })
.toss();

var _ = require( 'underscore' );

exports.matchDate = function( val ) {
  expect( val ).toMatch( /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} -\d{4}$/ );
};

exports.matchDateOrNull = function( val ) {
  expect( val ).toMatchOrBeNull( /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} -\d{4}$/ );
};

exports.matchHexColor = function( val ) {
  return ( /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test( val ) || val === '' );
};

exports.inRoleTypes = function( val ) {
  expect( [undefined, 'No Access', 'user', 'admin', 'master'] ).toContain( val );
};

exports.inShareTypes = function( val ) {
  expect( ['email', 'facebook', 'youtube'] ).toContain( val );
};

exports.inAlignmentTypes = function( val ) {
  expect( ['left', 'center', 'right'] ).toContain( val );
};

exports.inFeatureTypes = function( val ) {
  expect( ['guest_list', 'form', 'photo_sharing'] ).toContain( val );
};

exports.inCountyCodes = function( val ) {
  var codes = [
    'ab', 'aa', 'af', 'sq', 'am', 'ar', 'an', 'hy', 'as', 'ay', 'az', 'ba', 'eu', 'bn', 'dz', 'bh', 'bi', 'br', 'bg',
    'my', 'be', 'km', 'ca', 'zh', 'co', 'hr', 'cs', 'da', 'nl', 'en', 'eo', 'et', 'fo', 'fa', 'fj', 'fi', 'fr', 'fy',
    'gl', 'gd', 'gv', 'ka', 'de', 'el', 'kl', 'gn', 'gu', 'ht', 'ha', 'he', 'hi', 'hu', 'is', 'io', 'id', 'ia', 'ie',
    'iu', 'ik', 'ga', 'it', 'ja', 'jv', 'kn', 'ks', 'kk', 'rw', 'ky', 'rn', 'ko', 'ku', 'lo', 'la', 'lv', 'li', 'ln',
    'lt', 'mk', 'mg', 'ms', 'ml', 'mt', 'mi', 'mr', 'mo', 'mn', 'na', 'ne', 'no', 'oc', 'or', 'om', 'ps', 'pl', 'pt',
    'pa', 'qu', 'rm', 'ro', 'ru', 'sm', 'sg', 'sa', 'sr', 'sh', 'st', 'tn', 'sn', 'ii', 'sd', 'si', 'ss', 'sk', 'sl',
    'so', 'es', 'su', 'sw', 'sv', 'tl', 'tg', 'ta', 'tt', 'te', 'th', 'bo', 'ti', 'to', 'ts', 'tr', 'tk', 'tw', 'ug',
    'uk', 'ur', 'uz', 'vi', 'vo', 'wa', 'cy', 'wo', 'xh', 'yi', 'yo', 'zu',
  ];
  expect( codes ).toContain( val );
};

exports.localizedImageObject = function( val ) {
  _.each( val, function( item, key, list ) {
    expect( item.path ).toBeType( String );
    expect( item.size ).toBeType( Number );
  });
};

exports.stringOrNull = function( val ) {
  expect( val ).toBeTypeOrNull( String );
};

exports.numberOrNull = function( val ) {
  expect( val ).toBeTypeOrNull( Number );
};

exports.objOrNull = function( val ) {
  expect( val ).toBeTypeOrNull( Object );
};

exports.objOrUndefined = function( val ) {
  expect( val ).toBeTypeOrUndefined( Object );
};

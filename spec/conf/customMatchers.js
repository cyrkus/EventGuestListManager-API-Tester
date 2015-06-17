var _toType = function( obj ) {
  return ({}).toString.call( obj ).match( /\s([a-z|A-Z]+)/ )[1].toLowerCase();
};

exports.toBeType = function( util, customEqualityTesters ) {

  return {
    compare: function( actual, expected ) {
      var aType = _toType( actual );
      var eType = _toType( expected );
      // Function is not a valid JSON type
      if ( 'function' === eType ) {
        eType = _toType( expected.prototype );
      }

      var result = {};
      result.pass = ( aType === eType );

      if ( !result.pass ) {
        result.message = "Expected '" + aType + "' to be type '" + eType + "'";
      }

      return result;
    },
  };

};

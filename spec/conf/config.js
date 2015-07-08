require( 'dotenv' ).load();
var btoa = require( 'btoa' );

var userAgent = 'Node.JS/' + process.versions.node + ' (' +
  process.env._system_name + ' ' + process.env._system_version +
  ') Jasmine-Node/1.14.5 Frisby.JS/0.8.5';

var config = {
  endpoint: 'https://' + ( process.env.API_ENDPOINT || 'dev.events.7apps.io' ) + '/v1.2',
  version: '1.2',
  ua: userAgent,
  user: process.env.API_USER || '',
  pass: process.env.API_PASS || '',
  clientId: process.env.API_CLIENT_ID || 1,
  eventId: process.env.API_EVENT_ID || 2,
};
config.auth = btoa( config.user + ':' + config.pass );

module.exports = config;

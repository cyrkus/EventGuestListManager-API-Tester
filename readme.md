## 7/Apps.io Events API Test Suite

[![Build Status](https://travis-ci.org/sevenapps/EventGuestListManager-API-Tester.svg)](https://travis-ci.org/sevenapps/EventGuestListManager-API-Tester)

runs a suite of tests on the API using Node.js

## Setup

First, of course, download this repo. Then, from the Terminal (assuming [Node.js](http://nodejs.org/) is installed) run:

```
$ npm install
```

Then you will need to configure your environment by creating a `.env` file
in the root directory with the following variables:

```
API_ENDPOINT='dev.events.7apps.io'
API_USER={your username}
API_PASS={your password}
```

To run the tests:

```
$ npm test
```

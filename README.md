# Bench rest test

Welcome to the Bench rest test solution! Following the [test criteria](http://resttest.bench.co/front.html) an app was written to gather all transaction data from an API and displayed in a table.

## Getting started

- `npm install`
- `npm start`
- Navigate to `http://localhost:3000/`

## About the app

The app’s build processes utilize [gulp](http://gulpjs.com/), [browserify](http://browserify.org/), and [babel](https://babeljs.io/). This allows for the use of new ES6 features and syntax. The app is an example of progressive usage of ES6, it leverages some of the more basic features and has room to grow and use additional features in the future.

The app was built using react, and follows [flux](https://facebook.github.io/flux/docs/overview.html) application architecture with unidirectional data flow.

Styling conventions were borrowed from [Mobify](https://github.com/mobify/mobify-code-style/tree/master/css).

## Building the app:

1. [Bootstraping the app and constructing the build processes.](https://github.com/levindixon/bench-rest-test/pull/1)
2. [Fetching the transaction data](https://github.com/levindixon/bench-rest-test/pull/2)
3. [Transforming the transaction data](https://github.com/levindixon/bench-rest-test/pull/3)
4. [Building the sorting logic](https://github.com/levindixon/bench-rest-test/pull/4)
5. [Displaying the data and hooking up sorting logic](https://github.com/levindixon/bench-rest-test/pull/5)
6. [Styling the app](https://github.com/levindixon/bench-rest-test/pull/6)

## Things to improve on:

- Unit test, implement chai/mocha
- Leverage react-router, currently it’s being used at a pretty basic level
- Organize styles and build a better framework to expand on in the future
- Noticed a couple of errors in the data set including duplicate data, that should be verified and corrected if need be

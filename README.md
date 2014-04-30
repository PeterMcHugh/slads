# SLADS
[![Dependency Status](https://gemnasium.com/v3rm0n/slads.svg)](https://gemnasium.com/v3rm0n/slads)
[![Build Status](https://travis-ci.org/v3rm0n/slads.svg?branch=master)](https://travis-ci.org/v3rm0n/slads)
[![Stories in Ready](https://badge.waffle.io/v3rm0n/slads.png?label=ready&title=Ready)](https://waffle.io/v3rm0n/slads)

## Information

Custom data services using [Parse.com](http://parse.com) built with [Yeoman](http://yeoman.io/) using [angular generator](https://github.com/yeoman/generator-angular).

## Getting started

To build and run the project you first need [Node.js](http://nodejs.org/) and [Compass](http://compass-style.org/) and install [Grunt](http://gruntjs.com/) and [Bower](http://bower.io/) `npm install -g bower grunt-cli`

### Development

To start serving files while watcing for changes you need to run `grunt init` and then `grunt serve`

### Building

To build the project for publishing you need to run `grunt build`

### Publishing

To publish the content as Github Project Pages commit the *dist* dir after building and then run `grunt deploy`

## More information

In addition to stuff that comes with the Yeoman angular generator the project also uses:

- [Bootstrap](http://getbootstrap.com/) as a front-end framework.
- [Bootflat](http://bootflat.github.io/) nice looking flat theme for Bootstrap.
- [AngularStrap](http://mgcrea.github.io/angular-strap/) for nice native Bootstrap directives for Angular.
- [parse-js-sdk](https://github.com/albemuth/parse-js-sdk) Parse.com JS API as a Bower module.
- [parse-angular-patch](https://github.com/brandid/parse-angular-patch) for seamless Parse.com Angular integration.

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)

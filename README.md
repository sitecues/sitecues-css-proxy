# sitecues-css-proxy [![Build status for sitecues-css-proxy on Circle CI.](https://img.shields.io/circleci/project/sitecues/sitecues-css-proxy/master.svg "Circle Build Status")](https://circleci.com/gh/sitecues/sitecues-css-proxy "Sitecues CSS Proxy Builds")

> Serve cross-origin stylesheets.

## Why?

 - Can serve any stylesheet from any website.
 - Responds with [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) enabled so JS can read the CSS rules.
 - Re-writes CSS (e.g. `@import` URLs) for continuity.

## Install

```sh
npm install sitecues/sitecues-css-proxy --global
```

## Usage

### Command line

```sh
$ css-proxy --help

  Usage
    $ css-proxy

  Option
    --port           Listen on a specific HTTPS port for requests.
    --insecure-port  Listen on a specific HTTP port for requests.
    --target         Open a specific build in your browser.
    --open           Open the server root in your browser.

  Example
    $ css-proxy
    Build available at https://localhost/
    $ css-proxy --port=7000
    Build available at https://localhost:7000/
```

### Programmatic

Get it into your program.

```js
const CssProxy = require('sitecues-css-proxy');
```

Start the server.

```js
const server = new CssProxy();
server.start().then(() => {
  console.log('Listening.');
});
```

## API

### CssProxy(option)

Returns a new server instance.

#### option

Type: `object`

Server configuration.

##### port

Type: `number`<br>
Default: `443` if run as root, otherwise `3000`

The HTTPS port that the server will listen on when `.start()` is called.

##### insecurePort

Type: `number`<br>
Default: `80` if run as root, otherwise `3000`

The HTTP port that the server will listen on when `.start()` is called.

##### tls

Type: `object`<br>
Default: `key`/`cert` combo for `localhost`

The [encryption settings](https://nodejs.org/api/tls.html#tls_tls_createserver_options_secureconnectionlistener) used for HTTPS connections.

## Contributing

See our [contributing guidelines](https://github.com/sitecues/sitecues-css-proxy/blob/master/CONTRIBUTING.md "The guidelines for participating in this project.") for more details.

1. [Fork it](https://github.com/sitecues/sitecues-css-proxy/fork).
2. Make a feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. [Submit a pull request](https://github.com/sitecues/sitecues-css-proxy/compare "Submit code to this project for review.").

## License

Copyright © [Sitecues](https://sitecues.com "Owner of sitecues-css-proxy."). All rights reserved.

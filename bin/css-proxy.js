#!/usr/bin/env node

// The CLI for the CSS proxy.

// TODO: Use port-drop when it becomes viable.
// https://github.com/hapijs/hapi/issues/3204

'use strict';

// Crash and burn, die fast if a rejected promise is not caught.
require('throw-rejects/register');

const chalk = require('chalk');
const open = require('opn');
const assumeHttp = require('prepend-http');
const rootCheck = require('root-check');
const handleQuit = require('handle-quit');
const cli = require('meow')(`
    Usage
      $ css-proxy

    Option
      --port           Listen on a specific HTTPS port for requests.
      --insecure-port  Listen on a specific HTTP port for requests.
      --target         Open a specific build in your browser.
      --open           Open the server root in your browser.

    Example
      $ css-proxy --port=7000
      ${chalk.bold.cyan('Proxying CSS')} ${chalk.bold.grey('at')} ${chalk.bold.yellow('https://localhost:7000/')}
      $ css-proxy --target 'http://foo.com/some.css'
      ${chalk.bold.cyan('Proxying CSS')} ${chalk.bold.grey('at')} ${chalk.bold.yellow('https://localhost:3000/http://foo.com/some.css')}
`);

const { CssProxy } = require('../');
const { SecurityError } = require('../lib/error');

const serverOptions = Object.assign({}, cli.flags);
delete serverOptions.target;
delete serverOptions.open;

const server = new CssProxy(serverOptions);

handleQuit(() => {
    server.stop();
});

server.start().then(() => {
    // Attempt to set UID to a normal user now that we definitely
    // do not need elevated privileges.
    rootCheck(
        chalk.red.bold('I died trying to save you from yourself.\n') +
        (new SecurityError('Unable to let go of root privileges.')).stack
    );

    const { target } = cli.flags;
    const visitUrl = server.connections[0].info.uri + '/' + (target ? assumeHttp(target) : '');

    console.log(
        chalk.bold.cyan('Proxying CSS'),
        chalk.bold.grey('at'),
        chalk.bold.yellow(visitUrl)
    );

    if (target || cli.flags.open) {
        open(visitUrl);
    }
});

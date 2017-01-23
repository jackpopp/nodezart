const express = require('express');
const fs = require('fs');
const argv = require('yargs').argv;
const Promise = require('bluebird');
const mustache = require('mustache');
const chalk = require('chalk');

const request = require('./request');
const builder = require('./builder');
const payloads = require('./payloads');
const endpointsParser = require('./endpoints-parser');

const PORT = 3000;
const app = express();

const cert = fs.readFileSync(argv.cert, 'utf-8');

const addRoute = (route, payload) => {
    app.get(route, (req, res) => {
        const hash = payload(req);

        const template = fs.readFileSync( `./templates/${hash.request.product}/${hash.request.page }.mustache`, 'UTF-8');
        const config = fs.readFileSync( `./configs/${hash.request.product}/${hash.request.page }.json`, 'UTF-8');
        const endpoints = endpointsParser(config, hash);
        const requests = endpoints.map((endpoint) => request(endpoint, cert));

        Promise.all(requests).then((responses) => {
            const page = builder(responses);
            console.log(chalk.blue('-------------------'));
            console.log(chalk.blue('Rendering page, great success!'));
            res.send(mustache.render(template, page));
        });
    });
};

const routes = require('./routes.js')(addRoute, payloads);

app.listen(PORT, () => {
    const msg = `${chalk.magenta('Started')} ${chalk.yellow('on')} ${chalk.red('port')} ${chalk.cyan(PORT)}\n`;
    console.log(msg);
});
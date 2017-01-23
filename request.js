const chalk = require('chalk');
const requestPromise = require('request-promise');

module.exports = (uri, cert) => {
    const options = {
        cert: cert,
        key: cert,
        rejectUnauthorized: false,
        uri: uri
    };

    console.log(chalk.green(`Requesting envelope - ${uri}`));
    return requestPromise(options);
}
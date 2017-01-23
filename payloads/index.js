const fs = require('fs');
const path = require('path');

const payloads = fs.readdirSync(path.join(__dirname, '/'))
                    .filter((val) => val != 'index.js')
                    .map((val) => ({ name: val.slice(0, -3), payload: require(path.join(__dirname, val)) }));

module.exports = payloads.reduce((prev, curr) => {
    return Object.assign(prev, { [curr.name]: curr.payload });
}, {});
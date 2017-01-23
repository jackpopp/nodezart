module.exports = (endpointsConfig, hash) => {
    return endpoints = JSON.parse(endpointsConfig).contents.map((endpointObject) => {
        let {endpoint} = endpointObject;

        const hashMeta = hash.meta || {};
        const hasRequest = hash.request || {};
        const combinedHashValues = Object.assign(hashMeta, hasRequest);

        Object.keys(combinedHashValues).forEach((key) => {
            endpoint = endpoint.replace(`{{${key}}}`, combinedHashValues[key]);
        });
        return endpoint;
    });
}
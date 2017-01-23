module.exports = (addRoute, payloads) => {
    // add your shiney routes here
    addRoute('/news/local/:geoname/:radius', payloads.local_news_page);
};
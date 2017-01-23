module.exports = (res) => {
    return {
        request: {
            page: 'local_news_page',
            product: 'news',
            geoname: res.params.geoname,
            radius: res.params.radius
        }
    }
};
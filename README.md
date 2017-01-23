#Nodezart - Mozart composition with node.

## Running locally

Add a passwordless pem to the root of the project with the name *certificate.pem*.
Run `yarn install` or `npm install` to install dependencies

### Using Docker

```
docker build -t nodezart .
docker run -it -p 3000:3000 --rm nodezart
```

Need to change this to read from a volume

### Using native node

Install node 7, this can be done using NVM or N.
Switch to node 7 and then run the index file.

```
nvm use 7
node index --cert=certificate.pem
```

## Creating routes

### Add a payload

A payload is a function that returns an object that follows a specific Mozart convention.
At run time the payload has access to the current express request object, which we can use to get dynamic route params and so forth.
The payload must return an nested object with a request object and optionally a meta object.
The request object *must* specify page and product, these will be used to load your config and template.

```
module.exports = (res) => {
    return {
        request: {
            page: 'local_news_page',
            product: 'news',
            geoname: res.params.geoname,
            radius: res.params.radiusa
        }
    }
};
```

Above is an example payload saved as `payloads/local_news_page.js`.

### Add a route

In the routes folder adding a route is a simple as calling the `addRoute` function with a path and a payload.
The payloads are auto-loaded and available from the payload object, the key will match the filename of the payload.

```
addRoute('/news/local/:geoname/:radius', payloads.local_news_page);
```

### Add config and template

The config and template will be read from the *configs* and *templates* directory.
Alternatively you could symlink from *euler-site-descriptions* or another directory with canonical site configuration.
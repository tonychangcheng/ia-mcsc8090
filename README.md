# God of Avalon Frontend

## Project setup

```
npm install
```

### Project config

Copy `/projectRoot/src/store/index-sample.js` to `/projectRoot/src/store/index.js`. Edit `/projectRoot/src/store/index.js`

```js
export default new Vuex.Store({
  state: {
    // change 'server' to your backend without '/' at the end.
    server: 'http://127.0.0.1:8000',
    //for example
    //    server: 'http://backend.com',
  },
})
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```
<!--

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

-->

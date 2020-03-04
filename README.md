# WeTube
- 2020, following tutorials by nomadcoders.co
- Cloning Youtube with Vanilla and NodeJS

## Tutorials
- https://academy.nomadcoders.co/p/javascript-fullstack-from-zero-to-hero
- ~ #2.5 (2020/2/26)

## Basic 
- NodeJS: javascript outside of browser
- Front: JS, Back: Node, Django, Laravel, ...
- NodeJS: real-time, data processing, CRUD works
- Django: hardware stuff, video processing, youtube/netflix videos, access memory/RAM powers

## Setup
```bash
$ npm init
$ npm install express
$ node index.js

$ npm install @babel/node
$ npm install @babel/preset-env
$ npm install @babel/core
$ npm start # after babel, npm start is shortcut of command node index.js

$ npm install nodemon -D
# install packages that don't need to be included in dependencies
# only for dev process, devDependencies
# change in pacakge.json: "start": "nodemon --exec babel-node index.js",
# autostart the server when code changes
# ~~ tutorial 2.5
```

### 2.6
- change in pacakge.json: "start": "nodemon --exec babel-node index.js --delay 2"
    - give delay time between babel start & index.js function to avoid bugs
- express
    - **middleware**
    ```bash
    $ npm install morgan
    $ npm install helmet
    ```
# WeTube
- 2020, following tutorials by nomadcoders.co
- Cloning Youtube with Vanilla and NodeJS

## Pages:
- [ ] Home
- [x] Join
- [x] Login
- [x] Search
- [ ] User Detail
- [x] Edit Profile
- [ ] Upload
- [ ] Edit Video
- [ ] Change Password

## Tutorials
- https://academy.nomadcoders.co/p/javascript-fullstack-from-zero-to-hero
- ~ #2.5 (2020/2/26)
- ~ #3.1 (2020/3/7)

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

$ npm install @babel/node @babel/preset-env @babel/core
$ npm install cookie-parser body-parser

$ npm install nodemon -D
$ npm install dotenv
$ npm install webpack webpack-cli
# install packages that don't need to be included in dependencies
# only for dev process, devDependencies
# change in pacakge.json: "start": "nodemon --exec babel-node index.js",
# autostart the server when code changes

$ npm start # after babel, npm start is shortcut of command node index.js
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

### 3.0 Mongodb install
- https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

```bash
$ brew services start mongodb-community@4.2
$ mongo  # check if mongo is running
```

### expected schedule
- https://www.notion.so/sunny1103/33b5bedfddd9420b8600d842297e3b3c?v=168c896bb89f483fba454d279e68b147


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
- challenges: 2/20 https://codesandbox.io/s/day-four-solution-5zdh2, mine: https://codesandbox.io/s/express-blueprint-fx7mz
  

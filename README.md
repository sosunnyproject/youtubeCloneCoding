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

$ npm install webpack webpack-cli
# create webpack.config.js file in root dir
$ npm install --save-dev extract-text-webpack-plugin@next
# @ 쓰면 exact version install, @next beta version or sth
$ npm install css-loader postcss-loader sass-loader
$ npm install autoprefixer
$ npm install node-sass
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

- windows 10 설치: 윈도우 10에서 다운로드 > 설치 후 mongod가 실행되지 않는다면 다음을 따라서 환경변수 추가를 해보세요.
    1. [내컴퓨터] 우클릭 > [고급시스템설정] > [환경변수(N)]
    2. 시스템변수 리스트 중 'Path'를 선택하고 편집을 선택한 후 'Mongodb의 설치경로￦bin'을 추가
    3. vscode 재실행 후 터미널에 'mongod'입력
- https://medium.com/stackfame/run-mongodb-as-a-service-in-windows-b0acd3a4b712

```bash
// open command prompt as administrator
$ net start mongodb
$ net stop mongodb
```

- mongodb is perfect for json file

## 3.12 Regex
- regex101.com
- for mongodb data 

### expected schedule
- https://www.notion.so/sunny1103/33b5bedfddd9420b8600d842297e3b3c?v=168c896bb89f483fba454d279e68b147

## 4.0 webpack
- module bundler
- modules with dependencies --> webpack --> static assets (old, normal scripts)
- we want to change scss to css, extract the text and save it into css file
    - [extract text plugin: webpack](https://github.com/webpack-contrib/extract-text-webpack-plugin)
- [postcss](www.postcss.org), [autoprefixer](https://github.com/postcss/autoprefixer)
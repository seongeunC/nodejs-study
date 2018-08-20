/* 환경변수(environment variable)을 사용 */

//osx,Linux에서 사용 시
export SESSION_SECRET = "keyboard cat"

//window
set SESSION_SECRET = "keyboard cat"

//실행할 때 마다 환경변수 설정
SESSION_SECRET = "keyboard cat" node secret-env.js

//코드 내에서 환경변수에 접근할 때는 node.js의 process.env모듈 사용
var express = require('express')
var session = require('express-session')

var app = express()

app.use(session({secret:process.env.SESSION_SECRET}))

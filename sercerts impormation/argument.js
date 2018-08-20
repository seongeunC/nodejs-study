/* command-line에서 설정 정보를 argument로 요구하여 get
하드코딩과 설정파일을 가지고 있는 것보다 안전하지만
앱을 실행할 때마다 입력해야하므로 번거롭다
script로 만들어 해결한다면 script내에 존재한다는 문제가 생긴다 */

var nopt = require("nopt")

var longOpts = {
  "sessionSecret" : String,
}

var shortOpts = {
  "s" = ["--sessionSecret"],
}

var pased = nopt(longOpts, shortOpts, process.argv, 2)

console.log("session secret is : " , parsed.sessionSecret)

/* ------------------------------------*/

//command창

node argument.js --sessionSecret "keyboard cat"
node argument.js -s "keyboard cat"

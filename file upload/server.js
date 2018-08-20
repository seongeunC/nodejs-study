//(1)
//Node.js에 기본 내장된 http모듈을 로드
var http = require("http");

//http모듈의 createServer 메소드를 호출하여 HTTP 서버 생성
var server = htpp.createServer();
server.listen(8888);
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
/*(2)
요청이 발생 했을 때, 서버가 특정 동작을 수행하게 하려면 콜백함수를 지정해야함
requestListener는 request event가 발생했을 때 자동 호출될 콜백 함수*/

var http = require("http")

http.createServer(function(request,response)) {
  /*요청(request)이 올 때마다
  response.writeHead()함수를 사용해서 HTTP status 200과 content-type을 응답 헤더로 보냄*/
  response.writeHead(200, {"Content-Type" : "text/plain"});
  //response.write()로 HTTP응답 바디에 "Hello World" 텍스트를 담아 보낸다.
  response.write("Hello World");
  //response.end()로 응답을 마무리한다.
  response.end();
}).listen(8888);

■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
/*(3)
CallBack()함수로 만듬*/

var http = require("http");

/*callback function
HTTP 요청(비동기적 이벤트)이 발생하면 callback(onRequest)이 호출된다.
이 때 두 개의 파라미터 request와 response가 callback함수 onRequest에 전달된다.
요청에 대한 처리를 callback에서 처리한다.*/
function onRequest(request, response) {
  console.log("Request recevied");
  response.writeHead(200,{"Content-Type" : "text/plain"});
  response.write("Hello World");
  response.end();
}

http.createServer(onRequest).listen(8888);

console.log("Server has started");

■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
/*(4) 모듈화
지금까지 작성한 HTTP서버 생성 로직을 모듈화한다.
모듈화는 모듈을 필요로 하는 스크립트에 제공할 기능의 일부를 export 하는 것이다*/

var http = require("http");

function start() {
  function onRequest(request,response) {
    console.log("Request received.");
    response.writeHead(200,{"Content-Type" : "text/plain"});
    response.write("Hello World");
    response.end();
  }
  http.createServer(onRequest).listen(8888);
  console.log("Server has started");
}

export.start = start;

/*HTTP 서버 생성 모듈을 로드한다.
모듈을 로드하면 HTTP 서버 생성 함수를 담고 있는 객체를 반환 */

//▶▶▶ index.js
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
/*(6)
요청 URL과 GET/POST파라미터를 router로 전달하기 위해 url 모듈과 querystring 모듈을 추가
요청 URL과 GET/POST파라미터가 router-> server로 전송되어 서버의 할 일이 정해지고 서버의 할 일을 수행하는 함수를 request handler라 함*/

var http = require("http");
//url변수에 url모듈을 객체화한다.
var url = require("url");

http.createServer(function(request,response){
  //pathname 변수에 url모듈을 통해 pathname을 저장
  var pathname = url.parse(request.url).pathname;
  console.log("Path name is " + pathname);
  //query 변수에 url모듈을 통해 query를 저장
  var query = url.parse(request.url, true).query;
  console.log("Request parameter is ", query);

  response.writeHead(200, {"Content-Type": "text/html"});
  response.wirte(
    "<h1>Path name is " + pathname + "</h1>" +
    "<h1>Request parameter is " + JSON.stringify(query) + "</h1>");
  response.end();
}).listen(8888);

console.log("Server has started");

/*url 모듈을 사용하여 URL path를 기준으로 요청을 구분할 수 있게 됨.
이것을 이용하면 URL path를 기반으로 요청을 request handler로 매핑하는 router를 만들수 있음
router의 역활은 클라이언트의 요청과 request handler를 매핑
ex) ~/start 요청과 ~/upload 라는 클라이언트 요청에 따라 각각 달리 반응하는 request handler를 매핑
우선 URL path를 전달받는 router를 구현 */

//▶▶▶ router.js
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

/*(8)
server.js에서 router로 pathname을 보낼 수 있도록 작성
server => router => client */

var http = require("http");
var url = requrie("url");

//route를 매개변수로 받음(?)
function start(route) {
  function onRequest(request,response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for" + pathname + "received.");

    //route를 통해 pathname을 router로 전송
    route(pathname);

    response.writeHead(200,{"Content-Type" : "text/plain"});
    response.write("Hello World");
    response.end();
  }
  http.createServer(onRequest).listen(8888);
  console.log("Server has started");
}

exports.start = start;

// index.js에 router함수를 server로 주입(inject);
//▶▶▶ index.js
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

//(12)

var http = require("http");
var url = require("url");

function start(route,handle) {
  function onRequest(request,response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for" + pathname + "received.");

    //handle은 pathname와 request handler의 관계를 담고 있는 객체
    route(handle, pathname);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started");
}

exports.start = start;

//▶▶▶ router.js
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

//(16)

var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + "received");

    response.writeHead(200, {"Content-Type": "text/plain"});
    var content = route(handle,pathname)
    response.write(content);
    response.end();
  }
  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;

/*
requestHandlers.js 에서
function start() {
  console.log("Request handler 'start' was called");
  return "Hello Start";
}
function upload() {
  console.log("Request handler 'upload' was called.");
  return "Hello Upload";
}
라 지정해 주었기 때문에 각 각 출력
★http://localhost:8888/start      -> "Hello World"
★http://localhost:8888/upload     -> "Hello Upload"
*/

/*router.js에서
function route(handle, pathname) {
  console.log("About to route a request for " + pathname);
  if(typeof handle[pathname] === 'function') {
    return handle[pathname]();
  }else {
    console.log("No request handler found for" + pathname);
    return "404 Not found";
  }
}
else 부분에 pathname이 없기 때문에 "404 Not found" 가 출력
★http://localhost:8888/foo        -> "404 Not found"
*/
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

/*(17)

비동기적 방식 접근 */

var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request,response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " receiced.");

    route(handle, pathname, response);
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started");
}
exports.start = start;

//▶▶▶ router.js
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// (21)

/* request.addListenr 대신 request.on 도 가능
request 객체를 router을 통해 request handler에게 주입하는 것보다
server가 POST data를 받고 최종 data를 router를 통해 request handler로 보내 도록한다.*/

var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    var postData = "";
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    request.setEncoding("utf8");

    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
      console.log("Received POST data chunk '" + postDataChunk + "'.");
    });

    request.addListener("end", function() {
      route(handler, pathname, response, postData);
    });
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;

//▶▶▶ router.js
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// (27)

/* 업로드 된 파일을 /tmp/test.png에 저장하기위해 formidable을 upload request handler에 추가
이 때 request 객체가 필요하므로 server에서 router를 통해 requesthander에게 request객체를 전달
postData 처리와 request.setEncoding부분을 삭제하고 대신 request를 router로 전달 */

var http = require("http");
var url = require("url");

function start(route,handle) {
  function onRequest(request,response) {
    var pathname = url.parse(resquest.url).pathname;
    console.log("Request for" + pathname + " received.");
    route(handle,pathname,response,request);
  }
  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;

//▶▶▶ router.js
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

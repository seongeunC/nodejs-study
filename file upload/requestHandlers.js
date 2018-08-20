/*(10)
router를 통해 pathname을 전달받은 server가 전달받은 pathname에 따라 Request handler를 호출*/

function start() {
  console.log("Request handler 'start' was called");
}
function upload() {
  console.log("Request handler 'upload' was called");
}

exports.start = start;
exports.upload = upload;

/* router에 Request handler를 하드코딩할 수 있으나
handler의 수가 늘어날 때마다 router에서 request와 handler를 매핑하는 일을 해야함
(ex, if request == x then call handler y)

server와 router 외에 request와 handler의 관계를 알고 있는 무언가를 만들어 router에 주입!*/

//▶▶▶ index.js
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

/*(14)
현재 브라우저에 보여지는 텍스트("Hello World")는 server.js의 onRequest()함수에서 처리하고 있었음
하지만 이 처리는 router를 통해 server가 pathname을 전송받고 server가 request handlers를 통해 처리*/

function start() {
  console.log("Request handler 'start' was called");
  return "Hello Start";
}

function upload() {
  console.log("Request handler 'upload' was called.");
  return "Hello Upload";
}

exports.start = start;
exports.upload = upload;

//▶▶▶ router.js
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// (19) - 잘 모르겟음...

// 쉘을 생성하고 그 쉘 내에서 명령을 실행하고 stdout & stderr을 완료하면 콜백 함수(?)
var exec = require("child_process").exec;

function start(response) {
  console.log("Request handler 'start' was called.");

  exec("ls -lah", function (err, stdout, stderr) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(stdout);
    response.end();
  });
}

function upload(response) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type" : "text/plain"});
  response.write("Hello Upload");
  response.end();
}

exports.start = start;
exports.upload = upload;


■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// (20)

/* Handling Post requests

Post 요청 처리를 구현하기 위해 http://localhost:8888 에 접속하면 textarea와 sumit 버튼을 가진 html을 클라이언트에 전송
submit 버튼을 클릭하여 textarea에 입력한 내용을 Post 요청으로 서버에 전송하면 서버는 이 요청을 받아 내용을 출력하는 처리를 진행

*/
function start(response) {
  console.log("Request handler 'start' was called");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type" : "text/html"});
    response.write(body);
    response.end();
}

function upload(response) {
  console.log("Resquest handler 'upload' was called.");
  response.writeHead(200, {"Content-Type" : "text/plain"});
  response.write("Hello Upload");
  response.end();
}

exports.start = start;
exports.upload = upload;

/* 현재 view 와 controller의 로직이 한 곳에 구현되어있다 -> 바람직하지않음! 그저 test 용도
textarea의 내용은 상당히 클 수도 있다. 전체 데이터 블록을 하나로 처리하는 것은 blocking 방식

non-blocking으로 만들려면, PORST 데이터를 작은 청크로 나누고 특정 이벤트 때마다 callback을 호출하는 방식으로 만들어야함
이 이벤트가 data(POST 데이터의 새 청크가 도착)와 end(모든 청크를 받았다.)이다.
이 이벤트가 발생했을 때 어떤 callback이 호출되어야 할지 Node.js에게 알려줘야하는데,
HTTP 요청이 올때 onRequest() callback함수가 넘겨받은 request객체에 listener함수들을 추가하는 방식으로 구현

request.addListener("data", function(chunk){

});

request.addListener("end", function() {

});
*/

//▶▶▶ server.js
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// (23)

/* requestHandlers.js에서 /upload request handler에서 응답에 이 데이터를 추가*/

function start(response, postData) {
  console.log("Request handler 'start' was called");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type" : "text/html"});
    response.write(body);
    response.end();
}

function upload(response,postData) {
  condole.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type" : "text/plain"});
  response.write("You've sent : " + postData);
  response.end();
}

exports.start = start;
exports.upload = upload;

/* 우리의 계획은 사용자가 이미지 파일을 업로드 하면 업로드된 이미지를 브라우저에 출력하는 것
파일 데이터를 받아서 처리하는 것은 단지 POST 데이터를 처리하는 것, 그 처리가 단순하지않고 복잡하기에
'formidable' 모듈을 사용한다.

cmd 창에  >npm install formidable@latest --save

formidable은 HTTP POST로 submit 된 "form"을 Node.js에서 파싱할 수 있게 ("parseable") 한다.
1.새 IncomingForm 을 생성한다. 이것은 submit된 form의 추상화 객체이다.
2. request 객체를 파싱하여 submit된 파일과 필드들을 얻는다.

-> formidable_test.js에서 테스트함  */
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// (24)

/* formidable 모듈을 사용하자- 사용하기 위해서 해야할 2가지
1. 업로드된 파일을 저장(/tmp 폴더)
2. 업로드된 파일을 읽어 들여 화면에 출력*/

var querystring = requrie("querystring"),
    fs = require("fs");

function start(response, postData) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type" : "text/html"});
    response.write(body);
    response.end();
}

function upload(response,postData) {
  console.log("Request handler 'upload' was called");
  response.writeHead(200, {"Content-Type" : "text/plain"});
  response.write("You've sent the text: " + querystring.parse(postData).text);
  response.end();
}

function show(response,postData) {
  console.log("Request handler 'show' was called");
  fs.radFile("tmp/test.png", "binary", function(error,file) {
    if(error) {
      response.writeHead(500, {"Content-Type" : "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type" : "image/png"});
      response.write(file,"binary");
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;

//▶▶▶ index.js
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// (26)

/*
/start의 form에 파일 업로드 element를 추가한다.*/

var querystring = require("querystring"),
    fs = require("fs");


function start(response,postData) {
  console.log("Request handler 'start' was called.");

  var body = '<html>' +
   '<head>'+
   '<meta http-equiv="Content-Type" '+
   'content="text/html; charset=UTF-8" />'+
   '</head>'+
   '<body>'+
   '<form action="/upload" enctype="multipart/form-data" '+
   'method="post">'+
   '<input type="file" name="upload">'+
   '<input type="submit" value="Upload file" />'+
   '</form>'+
   '</body>'_
   '</html>';

   response.writeHead(200,{"Content-Type": "text/htm;"});
   response.write(body);
   response.end();
}

function upload(response,postData) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type" : "text/plain"});
  response.write("You've sent the text: " + querystring.parse(postData).text);
  response.end();
}

functin show(response,postData) {
  console.log("Request handler 'show' was called.");
  fs.readFile("/tmp/test.png", "binary", function(error,file) {
    if(error) {
      response.writeHead(500, {"Content-Type":"text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type" : "image/png"});
      response.write(file,"binary");
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;


//▶▶▶ server.js
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// (29)

var fs = require("fs"),
formidable = require("formidable");

function start(response) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
   '<head>'+
   '<meta http-equiv="Content-Type" content="text/html; '+
   'charset=UTF-8" />'+
   '</head>'+
   '<body>'+
   '<form action="/upload" enctype="multipart/form-data" '+
   'method="post">'+
   '<input type="file" name="upload" multiple="multiple">'+
   '<input type="submit" value="Upload file" />'+
   '</form>'+
   '</body>'+
   '</html>';

   response.writeHead(200, {"Content-Type" : "text/html"});
   response.write(body);
   response.end();
}

function upload(response,request) {
  console.log("Request handler 'upload' was called.");

  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log("parsing done");
    fs.renameSync(files.upload.path, "tmp/test.png");
    response.writeHead(200, {"Content-Type" : "text/html"});
    response.write("received image : <br/>");
    response.write("<img src='/show' />");
    response.end();
  });
}

function show(response) {
  console.log("Request handler 'show' was called.");
  fs.readFile("tmp/test.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type" : "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type" : "image/png"});
      response.write(file,"binary");
      response.end()
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;

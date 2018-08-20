/*정적 html을 제공하기 위해 매번 html 파일을 읽어들이는 처리를 해야하고
만약, html에 extern css, js 파일이 사용된다면 클라이언트는 css, js파일을 요청할 것이고
그 요청에 대응하는 처리를 구현하여야한다.

아래는 extern css,js 파일 요청에 응답하는 예제이다. */

var http = require("http"),
fs = require("fs");

http.createServer(function (req,res) {
  if(req.url.indexOf('.html') != -1) {
    fs.readFile(__dirname + '/public/index.html',function(err,data) {
      if(err) console.log(err);
      res.writeHead(200, {'Content-Type' : 'text/html'});
      res.write(data);
      res.end();
    });
  }

  if(req.url.indexOf('.js') != -1) {
    fs.readFile(__dirname + '/public/js/script.js', function (err,data) {
      if(err) console.log(err);
      res.writeHead(200, {'Content-Type' : 'text/javascript'});
      res.write(data);
      res.end();
    });
  }

  if(req.url.indexOf('.css') != -1) {
    fs.readFile(__dirname + '/public/css/style.css', function(err,data) {
      if(err) console.log(err);
      res.writeHead(200, {'Content-Type' : 'text/css'});
      res.write(data);
      res.end();
    });
  }
}).listen(8888,'127.0.0.1');
console.log("Server running at http://127.0.0.1:8888/");

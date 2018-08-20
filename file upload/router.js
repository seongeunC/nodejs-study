/*(7)
server.js에서 url 모듈을 사용하여 URL path를 기준으로 요청 구분
URL path를 전달받을 수 있는 router 구현 */

function route(pathname) {
  console.log("About to route a request for " + pathname);
}
export.route = route;

/* 위 코드를 server.js와 엮어야함
HTTP server가 router를 사용한다는 것을 알게 지정해야함
'dependenct injection'을 통해 server와 router를 결함*/

//▶▶▶ server.js
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

//(13)

function route(handle, pathname) {
  console.log("About to route a request for " + pathname);
  if(typeof handle[pathname] == "function") {
    handle[pathname]();
  }else {
    console.log("No request handler found for " + pathname);
  }
}

exports.route = route;

/* 브라우저에 표시되는 "Hello World"는 현재 server.js의 onRequest()함수에 의해 처리되고있다.
사실 이 처리는 router을 통해 server로 pathname이 전송되고 server가 request handler를 통해 처리해야한다.
--> request handler가 화면에 표시할 콘텐츠를 반환해 주면 콘텐츠를 server가 response.write로 처리하는 것*/

//▶▶▶ requestHnadlers.js
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

//(15)

function route(handle, pathname) {
  console.log("About to route a request for " + pathname);
  if(typeof handle[pathname] === 'function') {
    return handle[pathname]();
  } else {
    console.log("No request handler found for" + pathname);
    return "404 Not found";
  }
}

exports.route = route;

//▶▶▶ server.js
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// (18)

function route(handle, pathname, response) {
  console.log("About to route a request for " + pathname);
  if(typeof handle[pathname] === 'function') {
    handle[pathname](response);
  } else {
    console.log("No request handler found for " + pathname);
    response.writeHead(404, {"Content-Type" : "text/plain"});
    response.write("404 Not found");
    response.end();
  }
}

exports.route = route;

//▶▶▶ requestHandlers.js
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// (22)

/*
/upload request handler가 POST data를 화면에 표시하기 위해
*/

function route(handle,pathname,response,postData) {
  console.log("About to route a request for " + pathname);
  if(typeof handle[pathname] === 'function') {
    handle[pathname](response, postData);
  } else {
    console.log("No request handler found for " + pathname);
    response.writeHead(404, {"Content-Type" : "text/plain"});
    response.write("404 Not found");
    response.end();
  }
}

exports.route = route;

//▶▶▶ requestHandlers.js
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// (28)

// 전달된 request를 bypass 한다.

function route(handle, pathname, response, request) {
  console.log("About to route a request for " + pathname);
  if(typeof handle[pathname] === 'function') {
    handle[pathname](response, request);
  } else {
    console.log("No request handler found for " + pathname);
    response.writeHead(404, {"Content-Type" : "text/html"});
    response.write("404 Not found");
    response.end();
  }
}

exports.route = route;


//▶▶▶ requestHandlers.js
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

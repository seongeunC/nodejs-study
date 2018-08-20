//(5)

var server = require("./server");

server.start()

//cmd 창   >node index.js   (HTTP 서버 생성 모듈을 로드)

/* Routind
요청 URL과 GET/POST파라미터를 router로 전달하면 router는 어떤 코드를 실행할지 결정할 수 있어야한다.
즉, 전달된 요청 URL과 파라미터에 따라 서버의 할 일이 정해지는데 서버의 할 일을 수행하는 함수를 request handler라 한다.
우선 요청 URL과 파라미터를 얻을 수 있어야한다.

URL 과 querystring modules
                             url.parse(string).query
                                       |
         url.parse(string).pathname    |
                       |               |
                       |               |
                     ----- -------------------
http://localhost:8888/start?foo=bar&hello=world
                               ---       -----
                                |          |
                                |          |
       querystring.parse(string)["foo"]    |
                                           |
               querystring.parse(string)["hello"]

우리에게 필요한 모든 정보는 request 객체(callback함수 onRequest의 첫 번째 인자)를 통해 접근할 수 있다.
request 객체에 접근하기 위해서는 'url'과 'querystring' 모듈이 추가로 필요하다.
url 모듈은 URL의 각 부분(ex. URL path & querystring)을 추출할 수 있는 메소드를 제공
querystring 모듈은 querystring을 request파라미터로 파싱하는데 사용, 또한 POST 요청의 BODY를 파싱하는데도 사용
*/
//▶▶▶ server.js
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
/*(9)
router함수를 server로 주입하는 코드 작성 */

var server = require("./server");
var router = requrie("./router");

server.start(router.route);

/* server는 이제 router.route를 주입받아 사용할 수 있다.
router.route는 server로 부터 pathname을 전달 받고
pathname에 따라 각 각의 Request handler를 호출하고 행동하는 서버를 만들어야함
Request handler를 만들자 */

//▶▶▶ requestHandlers.js
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
//(11)

var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

//handle변수를 통해 키,값 쌍으로 묶어 server와 router간의 관계를 ...(?) 쉽게 해결(?)
var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHnadlers.start;
handler["/upload"] = requestHandlers.upload;

server.start(router.route, handler);

//▶▶▶ server.js
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// (25)

/* request handler를 /show와 맵핑 */

var server = require("./server");
var route = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}

handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHanders.upload;
handle["/show"] = requestHandlers.show;

server.start(router.route, handle);

//▶▶▶ requestHandlers.js
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

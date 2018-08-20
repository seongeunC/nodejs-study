//express에서 권장하는 main 어플리케이

//exprss 모듈 불러드림
var express = require('express');

//exprss를 객체화
var app = express();

//post 방식을 위한 bodt-parser 모듈
var bodyParser = require('body-parser');

//body Parser 사용
app.use(bodyParser.urlencoded({extended:false}));

//정적 파일을 사용하기위한 디렉토리
app.use(express.static('public'));

//template engin 'pug' & 사용할 template engin을 express에게 알려줌
app.set('view engine', 'pug');

//template enign 'pug' 파일을 넣을 폴더 views -> 후에 router 로 연결
app.set('views','./views');

//template engin이 적용된 page router
app.get('/template', function(req,res){
  //res의 render메소드(template enign souce코드를 render해준다)
  //temp라는 파일과 time,_title이라는 변수를 지정한것
  res.render('temp',{time:Date(),_title:'Hello Pug'});
});

//query string을 통한 url & page 변화
app.get('/topic',function(req,res){
  var topics = [
    'Javascript is ...',
    'NodeJs is ...',
    'Express is ...'
  ];
  var output = `
  <a href = "/topic?id=0">JavaScript</a><br>
  <a href = "/topic?id=1">NodeJs</a><br>
  <a href = "/topic?id=2">Express</a><br><br>
  ${topics[req.query.id]}
  `
  res.send(output+','+req.query.id);
});

//sementic url
app.get('/title/:id',function(req,res){
  var titles = [
    'React.js is ...',
    'Vue.js is ...',
    'Aguler.js is ...'
  ];
  var output = `
  <a href = "/title/0">React.js</a><br>
  <a href = "/title/1">Vue.js</a><br>
  <a href = "/title/2">Aguler.js</a><br>
  ${titles[req.params.id]}
  `
  res.send(output+','+req.params.id);
});

//Post 방식을 통한 정보 전달 form
app.get('/form', function(req,res){
  res.render('form');
});
app.post('/form_receiver',function(req,res){
  var title = req.body.title;
  var description = req.body.description;
  res.send(title+','+description);
});


//user가 app.get의 첫번째 인자 경로로 들어올 경우 req,res 할 값들!(경로를 찾는 get은 router역활)
//user가 /route경로로 들어갓을 때 (img파일은 정적인 public 폴더에)
app.get('/route',function(req,res){
  res.send('this is router,<img src="/route.png">');
});

//user기 root경로로 들어갔을 때
app.get('/',function(req,res){
  //res의 send메소드로 값을 response한다.!
  res.send('<h1>Hello home page</h1>');
});

//user가 /login 경로로 들어갔을 때
app.get('/login',function(req,res){
  res.send('Login please');
});

//user가 /test_html 경로에 진입했을 때 html 코드를 출력
app.get('/test_html', function(req,res){
  // ~ 밑 특수기호 ``
  var output = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
  </head>
  <body>
     <h1>Hello, Dynamic!</h1>
  </body>
  </html>`
  res.send(output);
});

//user가 /dynamic경로에 진입했을 때 동적인 html 표시
app.get('/dynamic', function(req,res){
  var lis = '';
  var time = Date();

  for(var i = 0; i<5; i++){
    lis = lis + '<li>coding</li>';
  }
  var output = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
  </head>
  <body>
     <h1>Hello, Dynaic!</h1>
     <ul>
     ${lis}
     </ul>
     ${time}
  </body>
  </html>`
  res.send(output);
});




//app aplication이 3000번 포트로 진입, 콜백함수를 통해 리턴받음
app.listen(3000,function(){
  console.log('Connected 3000 port!')
});

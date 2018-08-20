/* 절대 하면 안되는 Hard Coding 으로 설정 정보 저장
1. 설정 정보가 변경되면 코드를 수정해야한다. 물론, 배포도 다시
2. gihub과 같은 SCM(source code management)를 사용하는 경우, 비밀번호 노출
*/

var mysql = require('mysql');
var connection = mysql.createConnetion({
  host     : 'localhost',
  user     : 'me',
  password : 'secret',
  database : 'my_db'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err,rows,fields) {
  if (err) throw err;

  console.log('The solution is : ' , rows[0].solution);
});

connection.end();

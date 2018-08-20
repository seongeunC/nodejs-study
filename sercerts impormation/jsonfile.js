/* JSON 파일에 저장해두고 require() 사용하여 정보를 get하는 방법
설정 정보가 코드에서 분리되었지만 SCM 배포시 주의해야함
*/

var mysql = require('mysql');
var db_config = require('./config/db-config.json');

var connection = mysql.createConnection({
  host      : db_config.host,
  user      : db_config.user,
  password  : db_config.password,
  database  : db_config.database
});


/*------------------------------------------------*/

//db-config.json 파일
{
  "host" : "localhost",
  "user" : "me",
  "password" : "secret",
  "database" : "my_db"
}

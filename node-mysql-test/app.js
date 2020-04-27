const mysql = require('mysql')

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123456',
  port: '3306',
  database: 'blog'
})

const sql = 'select * from users'

con.connect()

con.query(sql, (err, result) => {
  if(err) {
    console.log(err)
    return
  }
  console.log(result)
})


con.end();
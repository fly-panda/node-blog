const env = process.env.NODE_ENV //  环境变量

let MYSQL_CONF

if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'root123456',
    port: '3306',
    database: 'blog'
  }
}

if (env === 'production') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'root123456',
    port: '3306',
    database: 'blog'
  }
}

module.exports = {
  MYSQL_CONF
}
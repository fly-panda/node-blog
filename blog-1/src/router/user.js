const {
  login
} = require('../controller/user')
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')

const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  return d.toGMTString();
}

const handleUserRouter = (req, res) => {
  const method = req.method // GET POST

  // 登录博客
  if (method === 'POST' && req.path === '/api/user/login') {
    const {
      username,
      password
    } = req.body

    const result = login(username, password)
    return result.then(data => {
      if (data.username) {
        
        // 操作cookie
        // res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)
        req.session.username = data.username
        req.session.realname = data.realname

        return Promise.resolve(new SuccessModel())
      } else {
        return Promise.resolve(new ErrorModel('登录失败'))
      }
    })
  }

  // 登录验证测试
  if(method === 'GET' && req.path === '/api/user/login-test') {
    if(req.session.username) {
      return Promise.resolve(new SuccessModel({session: req.session}))
    } 
    return Promise.resolve(new ErrorModel('登录失败'))
  }

}

module.exports = handleUserRouter
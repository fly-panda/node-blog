var express = require('express');
var router = express.Router();
const { getList, 
  getDetail, 
  newBlog, 
  updateBlog,
  delBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck.js')


router.get('/list', function (req, res, next) {
  let author = req.query.author || ''
  const keyword = req.query.keyword || ''

  if (req.query.isadmin) {
    if(req.session.username == null) {
      res.json(new ErrorModel('未登录'))
      return
    }
    author = req.session.username
  }
  const result = getList(author, keyword)
  return result.then(listData => {
    res.json(new SuccessModel(listData))
  })
});

router.get('/detail', function (req, res, next) {
  const result = getDetail(req.query.id)
  return result.then(data => {
    res.json(new SuccessModel(data))
  })
});

router.post('/new', loginCheck, (req, res, next) => {
  req.body.author = req.session.username
  const result = newBlog(req.body)
  return result.then(data => {
      res.json(
          new SuccessModel(data)
      )
  })
})


router.post('/update', loginCheck, (req, res, next) => {
  const result = updateBlog(req.query.id, req.body)
  return result.then(val => {
    if(val) {
      res.json(new SuccessModel(val))
    } else {
      res.json(new ErrorModel('更新博客失败'))
    }
  })
})

router.post('/del', loginCheck, (req, res, next) => {
  const author = req.session.username // 假数据
  const result = delBlog(req.query.id, author)
  return result.then(val => {
    if(val) {
      res.json(new SuccessModel(val))      
    } else {
      res.json(new ErrorModel('删除博客失败'))
    }
  })
})

module.exports = router;
const router = require('koa-router')()

router.prefix('/api/blog')

router.get('/list', function (ctx, next) {
  const query = ctx.query
  ctx.body = {
    errno: 0,
    query,
    data: [1,2,3]
  }
})

module.exports = router

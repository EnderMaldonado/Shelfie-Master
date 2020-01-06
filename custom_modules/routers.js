const shopifyApi = require('./shopify-api');

module.exports = router => {

  router.get('/getShopName', async (ctx) => {
    try {
      let shopName = await shopifyApi.getShop().then(shop => {console.log(shop);return shop.name})
      ctx.body = {
          status: 'success',
          data: shopName
      }
    } catch (e) {
      console.log(e)
    }
  })
}

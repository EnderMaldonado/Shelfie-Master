const shopifyApi = require('./shopify-api');
const firebaseApi = require('./firebase-api');
const shelfieMasterApi = require("./shelfieMaster-api")

module.exports = router => {

  router.get('/getShopName', async (ctx) => {
    try {
      let shopName = await shopifyApi.getShop().then(shop => shop.name)
      ctx.body = {
          status: 'success',
          data: shopName
      }
    } catch (err) {
      console.log(err)
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit('error', err, ctx);
    }
  })

  router.get('/createLabelItem/:sku', async (ctx) => {    
    try {
      let itemSku = ctx.params.sku

      let newId = await shelfieMasterApi.updateInventoryItemsLastId()
      
      shelfieMasterApi.addInventoryItem(itemSku, newId)
        .then(()=>{
          ctx.body = {
            status: 'success',
            data: newId
          }
        })

    } catch (err) {
      console.log(err)
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit('error', err, ctx);
    }
  }),

  router.get('/setItemLocation/:sku/:id/:place', async (ctx) => {    
    try {
      let itemSku = ctx.params.sku
      let itemId = ctx.params.id
      let place = ctx.params.place

      shelfieMasterApi.setItemLocation(itemSku, itemId, place)
        .then(()=>{
          ctx.body = {
            status: 'success'
          }
        })

    } catch (err) {
      console.log(err)
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit('error', err, ctx);
    }
  })
}

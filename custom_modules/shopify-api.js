const Shopify = require('shopify-api-node');
const firebaseApi = require('./firebase-api');

const { API_VERSION, SHOP } = process.env;

const getShopifyApi = () => new Promise(async (resolve, reject) => {
  try {
    let accessToken = await firebaseApi.accessToken()
    resolve(new Shopify({
      shopName: SHOP,
      accessToken: firebaseApi.accessToken(),
      apiVersion: API_VERSION
    }))
  } catch (e) {
    reject(e)
  }
})

module.exports = {
  getShop: () => new Promise( async (resolve, reject) => {
    try {
      let shopify = await getShopifyApi()
      shopify.shop.get()
        .then(shop => resolve(shop))
    } catch (e) {
      reject(e)
    }
  })
}

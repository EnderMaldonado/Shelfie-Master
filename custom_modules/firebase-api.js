const firebase = require('./firebase')

const { API_VERSION, SHOP } = process.env;
const shopifyShopName = SHOP.replace("myshopify.com","").replace(".","")

const dbRef = firebase.database().ref(`/${shopifyShopName}`)

module.exports = {

  initializeDBCreateAccessToken: accessToken => new Promise( async (resolve, reject) => {
    try {
      firebase.database().ref('/').child(shopifyShopName).child("accessToken").set()
      dbRef.child("accessToken").once("value", dataReaded => {resolve(dataReaded.val())})
    } catch (e) {
      reject(e)
    }
  }),

  accessToken: () => new Promise( async (resolve, reject) => {
    try {
      dbRef.child("accessToken").once("value", dataReaded => resolve(dataReaded.val()))
    } catch (e) {
      reject(e)
    }
  })

}

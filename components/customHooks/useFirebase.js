const firebase = require('../../custom_modules/firebase')

const shopifyShopName = SHOP_ORIGIN.replace("myshopify.com","").replace(".","")

const dbRef = firebase.database().ref(`/${shopifyShopName}`)

const querybase = require("querybase")

module.exports = {

  dbRef,

  querybase,

  addData: (child, data) => new Promise( async (resolve, reject) => {
    try {
      dbRef.child(child).set(data)
      resolve(true)
    } catch (e) {
      reject(e)
    }
  }),

  pushData: (child, data) => new Promise( async (resolve, reject) => {
    try {
      dbRef.child(child).push(data)
      resolve(true)
    } catch (e) {
      reject(e)
    }
  }),

  retriveData: (child) => new Promise( async (resolve, reject) => {
    try {
      dbRef.child(child).once("value", dataReaded => resolve(dataReaded.val()))
    } catch (e) {
      reject(e)
    }
  }),

  retriveMethod: {
    orderByChildStartAt: (child, orderChild, startAt) => new Promise( async (resolve, reject) => {
      try {
        const querybaseRef = querybase.ref(dbRef.child(child), []);
        querybaseRef.where(orderChild).startsWith(startAt).once("value", dataReaded => resolve(dataReaded.val()))
      } catch (e) {
        reject(e)
      }
    }),
    orderByChildEqualTo: (child, orderChild, equalTo) => new Promise( async (resolve, reject) => {
      try {
        const querybaseRef = querybase.ref(dbRef.child(child), []);
        querybaseRef.where({[orderChild]:equalTo}).once("value", dataReaded => resolve(dataReaded.val()))
      } catch (e) {
        reject(e)
      }
    })
  },

  existDataByValueEqualTo: (child, equalTo) => new Promise( async (resolve, reject) => {
    try {
      dbRef.child(child).orderByValue().equalTo(equalTo).once("value", dataReaded => resolve(dataReaded.exists()))
    } catch (e) {
      reject(e)
    }
  }),

  existData: (child) => new Promise( async (resolve, reject) => {
    try {
      dbRef.child(child).once("value", dataReaded => resolve(dataReaded.exists()))
    } catch (e) {
      reject(e)
    }
  }),

  removeData: (targetChild) => new Promise((resolve, reject) =>{
    try {
      dbRef.child(targetChild).remove()
      resolve(true)
    } catch (error) {
      console.log(error)
      reject(error)
    }
  }),



}

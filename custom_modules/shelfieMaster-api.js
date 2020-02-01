const firebaseApi = require("./firebase-api")

const HexatriacondecimalToDecimal = ht => parseInt(ht, 36)
const DecimalToHexatriacondecimal = (dc, format) => {
  let hex = dc.toString(36)
  return format.slice(hex.length)+hex
}

const increaseHexadecimal = (hx, format) => DecimalToHexatriacondecimal(HexatriacondecimalToDecimal(hx) + 1, format)


module.exports = {

  updateInventoryItemsLastId: () => new Promise( async (resolve, reject) => {
    try {
      
      let format = "000000"

      let lastId = await firebaseApi.retriveData("inventoryLastId")
      if(!lastId)
        newId = format
      else 
        newId = increaseHexadecimal(lastId, format)
      
      firebaseApi.addData("inventoryLastId", newId)
        .then(()=> resolve(newId))

    } catch (error) {
      reject(error)      
    }
  }),

  addInventoryItem: (sku, id) => new Promise( (resolve, reject) => {
    firebaseApi.addData(`inventory/${sku}/${id}/location`, "undefined")
      .then(()=> resolve(true))
      .catch(error=>reject(error))
  }),

  setItemLocation: (sku, id, place) => new Promise( (resolve, reject) => {
    firebaseApi.addData(`inventory/${sku}/${id}/location`, place)
      .then(()=> resolve(true))
      .catch(error=>reject(error))
  }),

}
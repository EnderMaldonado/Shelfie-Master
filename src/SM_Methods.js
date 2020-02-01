const textSurplusId = "gid://shopify/Product/"

export const extractIdToGrapHqlData = id => id.replace(textSurplusId,"")

export const addTextToIdForGraphql = id => textSurplusId + id

export const graphqlProductDataToSimpleObject = data => {
  let {id, title, tags, variants, totalInventory, images, productType} = data
  return {
    id:         extractIdToGrapHqlData(id),
    sku:        variants.edges[0].node.sku,
    title:      title,
    tags:       tags,
    type:       productType,
    imageSrc:   images.edges[0].node.transformedSrc,
    quantity:   totalInventory
  }
}

export const getCategory = (tags, type) => {
  const categoriesDefined = {
    "Game":{
      name:"Game",
      subcategories:{
        "PS4":{name:"Playstation 4"},
        "PS3":{name:"Playstation 3"},
        "PS2":{name:"Playstation 2"},
        "Xbox One":{name:"Xbox One"},
        "Xbox 360":{name:"Xbox 360"},
        "Xbox":{name:"Xbox"},
        "Wii U":{name:"Wii U"},
        "Wii":{name:"Wii"},
        "3DS":{name:"3DS"},
        "DS":{name:"DS"},
        "PS Vita":{name:"Playstation Vita"},
        "PSP":{name:"Playstation Portatil"},
        "Nintendo Switch":{name:"Nintendo Switch"},
        "PC":{name:"PC"},
      }
    },
    "Funko":{name:"Funko", subcategories:null},
    "Amiibo":{name:"Amiibo", subcategories:null},
    "Cool Stuff":{name:"Cool Stuff", subcategories:null},
    "Accessory":{name:"Accessory", subcategories:null},
    "Toys":{name:"Toys", subcategories:null},
    "Board Game":{name:"Board Game", subcategories:null},
  }

  let typeCategory = categoriesDefined[type]?categoriesDefined[type]:null
  return typeCategory?
            typeCategory.subcategories?
              typeCategory.subcategories[Object.keys(typeCategory.subcategories).filter(key => tags.includes(key))[0]]?
                typeCategory.subcategories[Object.keys(typeCategory.subcategories).filter(key => tags.includes(key))[0]].name
              :
                typeCategory.name
            :
              typeCategory.name
          :
            "unspecified"
}

export const separateSkuItem = barcode => [
  barcode.substring(0, barcode.indexOf("::")),
  barcode.substring(barcode.indexOf("::") + 2, barcode.lenght)
]


export const HexatriacondecimalToDecimal = ht => parseInt(ht, 36)
export const DecimalToHexatriacondecimal = (dc, format) => {
  let hex = dc.toString(36)
  return format.slice(hex.length)+hex
}

export const increaseHexadecimal = (hx, format="000000", qty=1) => DecimalToHexatriacondecimal(HexatriacondecimalToDecimal(hx) + Number.parseInt(qty), format)

export const NumberToCharacterLowerAZ = n => {
  let result = ""
  while (n > 25) {
    n = n - 25
    result = result + "a"
  }
  return result + String.fromCharCode(n+97)
}

const getShelf = location => location.substring(0, location.indexOf("-"))
const getFloor = location => location.substring(location.indexOf("-")+1, location.length)
const getShelfAndFloor = location => [getShelf(location), getFloor(location)]
export const convertInventoryInShelfFloorItem = inventory => {
  let shelfArray = {}
  if(inventory)
  Object.keys(inventory).forEach((id,i) => {
    let [shelf, floor] = getShelfAndFloor(inventory[id].location)
    console.log(shelf, floor)

    let shelfOfArray = shelfArray[shelf] || {}
    let florOfShelfOfArray = shelfOfArray[floor] || {}

    shelfArray = {
      ...shelfArray,
      [shelf]:{
        ...shelfOfArray,
        [floor]:{
          ...florOfShelfOfArray,
          [id]:inventory[id]
        },
      },
    }
  })
  return shelfArray
}

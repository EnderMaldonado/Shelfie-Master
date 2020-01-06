import {useContext} from 'react'

import {SET_SHOP_NAME} from '../Context/actions.js'
import ShopContext from '../Context/Shop/ShopContext'


const useShelfiMasterMethods = () => {

  const [{shopName}, dispatchShop] = useContext(ShopContext)

  //Methots . . .
  const setShop = sn => dispatchShop({type:SET_SHOP_NAME, shopName:sn})

  //API . . .
  const Api = {

    setShopName: () => new Promise( async (resolve, reject) => {
      try {
        let sn = await shopifyApi.getShop()
        console.log(sn)
        setShop(sn)
      } catch (e) {
        setShop("SHOP ERROR")
        console.log(e)
      } finally {
        resolve(true)
      }
    }),

  }

  return Api
}

export default useShelfiMasterMethods

import {useContext} from 'react'
import axios from 'axios'
import useFirebase from './useFirebase'
import serverTime from '../../custom_modules/server-time'

import {SET_SHOP_NAME,  SET_PAGE, SET_HANDLE, DELETE_HANDLE, SET_LOADING, CLEAM_LIST_HISTORY_ACTIONS,
  ADD_ITEM_HISTORY_ACTIONS, SET_ITEM_HISTORY_ACTIONS, REMOVE_ITEM_HISTORY_ACTIONS} from '../Context/actions.js'
import ShopContext from '../Context/Shop/ShopContext'
import ListContext from '../Context/List/ListContext'
import NavigationContext from '../Context/Navigation/NavigationContext'
import HandlesContext from '../Context/Handles/HandlesContext'
import LoadingContext from '../Context/Loading/LoadingContext'

import {increaseHexadecimal, NumberToCharacterLowerAZ, getCategory} from '../../src/SM_Methods'
import { useSnackbar } from 'notistack'

const useShelfiMasterMethods = () => {

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const [{shopName}, dispatchShop] = useContext(ShopContext)
  const [{historyActions}, dispatchList] = useContext(ListContext)
  const [{page}, dispatchNavigation] = useContext(NavigationContext)
  const [stateHandles, dispatchHandles] = useContext(HandlesContext)
  const [{loading}, dispatchLoading]  = useContext(LoadingContext)


  //Methots . . .
  const setShop = sn => dispatchShop({type:SET_SHOP_NAME, shopName:sn})
  const setPage = p => dispatchNavigation({type:SET_PAGE, page:p})
  const setHandleMethod = (handleName, handle) => dispatchHandles({type:SET_HANDLE, handleName, handle})
  const deleteHandle = (handleName, handle) => dispatchHandles({type:DELETE_HANDLE, handleName})
  const setLoading = isLoading => dispatchLoading({type:SET_LOADING, loading:isLoading})

  const addItemHistoryActions = (item) => {
    dispatchList({type:ADD_ITEM_HISTORY_ACTIONS, item})
  }

  const setItemHistoryActions = (index, update) => {
    let itemAux = {...historyActions[index]}
    itemAux = {...itemAux, ...update}

    dispatchList({type:SET_ITEM_HISTORY_ACTIONS, item:itemAux, index})
  }

  const dispatchRemoveItemHistoryActions = (index) => dispatchList({type:REMOVE_ITEM_HISTORY_ACTIONS, index})

  const dispatchCleanListHistoryActions = () => dispatchList({type:CLEAM_LIST_HISTORY_ACTIONS})

  //PROMISES...
  const deleteLabel = id => new Promise( async (resolve, reject) => {
    try {
      if(id) {
        let removes = await useFirebase.removeData(`inventory/${id}`)
        resolve(true)
      } else
        reject("no ids")
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })

  //API . . .
  const Api = () => {
    return {

      setShopName: () => new Promise( async (resolve, reject) => {
        try {
          let sn = await axios('getShopName').then(res => res.data.data)
          console.log(sn)
          setShop(sn)
        } catch (e) {
          setShop("SHOP ERROR")
          console.log(e)
        } finally {
          resolve(true)
        }
      }),

      getProductShopifyById: id => new Promise( async (resolve, reject) => {
        try {
          console.log(id);

          let sn = await axios('getProductById/' + id).then(res => res)
          console.log(sn)
          if(sn.errors)
            reject(sn.errors)
          else
            resolve(sn)
        } catch (e) {
          reject(e)
        }
      }),

      getLabelItem: id => new Promise( async (resolve, reject) => {
        try {
          let labelItem = await useFirebase.retriveData(`inventory/${id}`)
          resolve(labelItem)
        } catch (error) {
          reject(error)
        }
      }),

      getLabelsByKey: (key, value) => new Promise( async (resolve, reject) => {
        try {
          let labelItem = await useFirebase.retriveMethod.orderByChildEqualTo('inventory', key, value)
          resolve(labelItem)
        } catch (error) {
          reject(error)
        }
      }),

      createLabelItem: (product, id, qtyBox) => new Promise( async (resolve, reject) => {
        try {

          let quantityBox = qtyBox && qtyBox > 0 ? qtyBox : null
          let addLabelId = await useFirebase.addData(`inventory/${id}`,
              {
                shopify_id:product.id,
                shopify_sku:product.sku.toLowerCase(),
                shopify_category:getCategory(product.tags, product.type).toLowerCase(),
                shopify_title:product.title.toLowerCase(),
                id,
                createAt:serverTime.getDate(),
                packed_quantity:quantityBox,
                location:"undefined"
              })

          resolve(true)

        } catch (error) {
          console.log(error)
          reject(error)
        }
      }),

      getItemLastId: () => new Promise( async (resolve, reject) => {
        try {

          let lastId = await useFirebase.retriveData("inventoryLastId")

          lastId = lastId ? increaseHexadecimal(lastId) : "000000"

          let increase = await useFirebase.addData("inventoryLastId", lastId)

          resolve(lastId)

        } catch (error) {
          console.log(error)
          reject(error)
        }
      }),

      removeLabelItem: id => new Promise( async (resolve, reject) => {
        deleteLabel(id)
          .then(res => resolve(res))
          .catch(error => {
            console.log(error)
            reject(error)
          })
      }),

      setItemLocation: (id, place) => new Promise( async (resolve, reject) => {
        try {
          let exist = await useFirebase.existData(`inventory/${id}`)
          if(exist) {
            let updateLocation = await useFirebase.addData(`inventory/${id}/location`, place)
            let updateDate = await useFirebase.addData(`inventory/${id}/updatedAt`, serverTime.getDate())
            let data = await useFirebase.retriveData(`inventory/${id}`)
            resolve(data)
          }
          else
            reject(404)
        } catch (error) {
          reject(error)
        }
      }),

      addShelfPlaces: (shelf, qty) => new Promise(async (resolve, reject) => {
        try {
          let shelfs = []

          for (let i = 0; i < qty; i++)
          shelfs.push(useFirebase.addData(`shelfs/${shelf}-${NumberToCharacterLowerAZ(i)}`,
                                          `${shelf}-${NumberToCharacterLowerAZ(i)}`).then(res => res))

          let addAllShelf = await Promise.all(shelfs)

          resolve(true)
        } catch (error) {
          console.log(error)
          reject(error)
        }
      }),

      findPlaceShelf: place => new Promise(async (resolve, reject) => {
        try {
          let shelf = await useFirebase.existDataByValueEqualTo("shelfs", place)
          resolve(shelf)
        } catch (error) {
          console.log(error)
          reject(error)
        }
      }),

      getShelfItems: (shelf, filterText) => new Promise(async (resolve, reject) => {
        try {

          shelf = shelf.toLowerCase()
          filterText = filterText.toLowerCase()

          let firebaseDbQuery = null

          if(shelf && !filterText) {
            firebaseDbQuery = await useFirebase.retriveMethod.orderByChildStartAt("inventory", "location", shelf)
          } else if(filterText) {
            let filters = [
              "shopify_id",
              "shopify_sku",
              "shopify_category",
              "shopify_title",
              "id",
            ]

            let invQueryes = filters.map(filter => useFirebase.retriveMethod.orderByChildStartAt("inventory", filter, filterText).then(res => res))

            let firebaseDbQueryArray = await Promise.all(invQueryes)

            firebaseDbQueryArray.forEach(arr => firebaseDbQuery = {...firebaseDbQuery, ...arr})

            if(shelf) {
              let firebaseDbQueryAux = {...firebaseDbQuery}
              Object.keys(firebaseDbQueryAux).forEach(key=> {
                if(!firebaseDbQueryAux[key].location.includes(shelf))
                  delete firebaseDbQueryAux[key]
              })
              firebaseDbQuery = firebaseDbQueryAux
            }
          } else {
            firebaseDbQuery = await useFirebase.retriveMethod.orderByChildEqualTo("inventory", "location", "undefined")
          }

          resolve(firebaseDbQuery)

        } catch (error) {
          console.log(error)
          reject(error)
        }
      }),

      getShelfs: () => new Promise(async (resolve, reject) => {
        try {
          let shelfs = useFirebase.retriveData("shelfs")
          resolve(shelfs)
        } catch (error) {
          console.log(error)
          reject(error)

        }
      }),

      handleSnackbar: (message, options) => enqueueSnackbar(message, { ...options }),

      setHandle: (handleName, handle) => setHandleMethod(handleName, handle),
      removeHandleMethod: (handleName) => setHandleMethod(handleName, ()=>null),
      deleteHandle: (handleName) => deleteHandle(handleName),

      setLoading: isLoading => setLoading(isLoading),

      addItemtoHistoryActions: item => addItemHistoryActions(item),

      updateItemHistoryActions: (index, update) => setItemHistoryActions(index, update),

      removeItemHistoryActions: (index, id) => new Promise( async (resolve, reject) => {
        try {
          let deleted = await deleteLabel(id)

          dispatchRemoveItemHistoryActions(index)

          resolve(true)
        } catch (error) {
          console.log(error)
          reject(error)
        }
      }),

      cleanListHistoryActions: ()=>dispatchCleanListHistoryActions(),

      changePage: pageValue => setPage(pageValue)

    }
  }

  return Api
}

export default useShelfiMasterMethods

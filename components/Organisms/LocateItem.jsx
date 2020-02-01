import { forwardRef, useImperativeHandle, useState, useEffect } from "react"

import { Typography, Tooltip, Grid } from "@material-ui/core"
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'

import useShelfiMasterMethods from "../customHooks/useShelfiMasterMethods"

const LocateItem = forwardRef(({action, setAction, loading, setLoading}, ref) => {

  const snackbarOptionsDefault = {
    variant:"default",
    autoHideDuration: 3000
  }
  const snackbarOptionsSucess = {
    ...snackbarOptionsDefault,
    variant:"success"
  }
  const snackbarOptionsWarning = {
    ...snackbarOptionsDefault,
    variant:"warning"
  }
  const snackbarOptionsError = {
    ...snackbarOptionsDefault,
    variant:"error"
  }
  const snackbarOptionsinfo = {
    variant:"info"
  }
  
  const handleSnackbar = (text, options) => {
    setLoading(false)
    smM().handleSnackbar(text, options)  
  }

	const smM = useShelfiMasterMethods()

  const addItemHAL = (sku, id, qtyBox, location) => {
    smM().addItemtoHistoryActions({
      sku,
      id,
      location,
      qtyBox
    })
  }

  useImperativeHandle(ref, () => ({
    handleScannBarcode
  }))

  const [place, setPlace] = useState("")

  const handleScannBarcode = async barcode => {
    if(barcode.length) {
      setLoading(true)
      if(action === "SET_ITEM_LOCATION") 
        handleSetItemLocation(barcode)
      else 
        handleSelectPlace(barcode)
    } else 
      handleSnackbar(`Enter a barcode`, snackbarOptionsWarning)
  }

  const handleSelectPlace = async barcode => {
    try {
      let existPlace = await smM().findPlaceShelf(barcode)
      if(existPlace) {
        handleSnackbar(`Place "${barcode}" selected for locate items`, snackbarOptionsinfo)
        setPlace(barcode)
        setAction("SET_ITEM_LOCATION")
      } else
        handleSnackbar(`Place "${barcode}" not exist`, snackbarOptionsError)
    } catch (error) {
      handleSnackbar(`Error to find shelf "${barcode}"`, snackbarOptionsWarning)
    }
  }

  const handleSetItemLocation = async barcode => {
    try {
      let item = await smM().setItemLocation(barcode, place)
      handleSnackbar(`Item "${barcode}" located in "${place}"`, snackbarOptionsSucess)
      addItemHAL(item.sku, barcode, item.packed_quantity, item.location)
      setAction("SELECT_SHELF")
    } catch (error) {
      if(error === 404)
        handleSnackbar(`Item "${barcode}" not exist`, snackbarOptionsError)
      else 
        handleSnackbar(`Error to locate item "${barcode}"`, snackbarOptionsWarning)
    }
  }

  useEffect(()=>{
    smM().setLoading(false)
    return () => {
      setPlace(null)
    }
  },[])

  return action === "SELECT_SHELF" ?
  <Typography variant="h6">Scan Shelf location</Typography>
    :
  <div style={{display:"grid", gridTemplateColumns:"max-content max-content", gridGap:"1rem"}}>
    <Typography variant="h6">Scan Item to put in location:</Typography>
    <Typography align="left" color="primary" variant="h5">{place.toUpperCase()}</Typography>
  </div>

})
export default LocateItem
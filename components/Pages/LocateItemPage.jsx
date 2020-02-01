import React, { useState, useRef, useEffect } from 'react'

import useShelfiMasterMethods from '../customHooks/useShelfiMasterMethods'

import LocateItemTemplate from '../Templates/LocateItemTemplate'

const LocateItemPage = () => {

  const smM = useShelfiMasterMethods()

  const scannBarcodeActionRef = useRef()

  // SELECT_SHELF SET_ITEM_LOCATION
  const [action, setAction] = useState("SELECT_SHELF")
  const [loading, setLoading] = useState(false)

  // S C A N N I N G . . .
  const handleCheckBarcode = inpText => {
    if(scannBarcodeActionRef.current)
      scannBarcodeActionRef.current.handleScannBarcode(inpText)
  }
  
  useEffect(()=>{
    smM().setLoading(false)
  },[])

  return <LocateItemTemplate {...{loading, setLoading, handleCheckBarcode, action, setAction, scannBarcodeActionRef }}/>
}

export default LocateItemPage

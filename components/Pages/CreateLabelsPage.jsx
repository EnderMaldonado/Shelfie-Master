import React, { useState, useRef, useEffect, useContext } from 'react'

import { graphqlProductDataToSimpleObject, getBarcodeProductItem } from '../../src/SM_Methods'

import useShelfiMasterMethods from '../customHooks/useShelfiMasterMethods'

import CreateLabelTemplate from '../Templates/CreateLabelTemplate'

const CreateLabelPage = () => {

  const smM = useShelfiMasterMethods()

  const scannBarcodeActionRef = useRef()

  // SCAN_PRODUCT SCAN_LABEL
  const [action, setAction] = useState("SCANN_PRODUCT")
  
  // S C A N N I N G . . .
  const handleCheckBarcode = inpText => {
    if(scannBarcodeActionRef.current)
    scannBarcodeActionRef.current.handleScannBarcode(inpText)
  }
  
  const [loading, setLoading] = useState(false)
  const [cancelTime, setCancelTime] = useState(0)
  const handleCancelAction = () => {
    setCancelTime(cancelTime + 1 )
  }

  useEffect(()=>{
    smM().setLoading(false)
  },[])

  return <CreateLabelTemplate key={cancelTime} {...{loading, setLoading, handleCheckBarcode, 
    action, setAction, scannBarcodeActionRef, onCancelAction:handleCancelAction }}/>
}

export default CreateLabelPage

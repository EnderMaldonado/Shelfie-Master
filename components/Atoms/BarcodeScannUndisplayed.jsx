import {useState, useRef, useEffect} from 'react'
import useShelfiMasterMethods from "../customHooks/useShelfiMasterMethods"

import TextFieldValidation from './TextFieldValidation'

const BarcodeScannUndisplayed = ({disabled, onCheckBarcode, dataUpdate={place:null}}) => {

  const {place} = dataUpdate

  const smM = useShelfiMasterMethods()

  const inputRef = useRef(null)

  const [inputBCValue, setInputBCValue] = useState("")

  const handleKeyDown = keyName => {
    if(inputRef.current){
      
      let inputElements = window.document.getElementsByTagName("input")

      let isIgnoreFocus = false
      for(let i = 0 ; i < inputElements.length ; i++)
        if(window.document.activeElement === inputElements[i] && window.document.activeElement !== inputRef.current)
          isIgnoreFocus = true
          
      if(!isIgnoreFocus){
        if(keyName === "Enter") {
          onCheckBarcode(inputRef.current.value)
          inputRef.current.select()
        } else inputRef.current.focus()
      }
    }
  }


	useEffect(()=>{
    //Set handle key down...    
    if(disabled)
      smM().removeHandleMethod("handleKeyDown")
    else {
      smM().setHandle("handleKeyDown", handleKeyDown)
      inputRef.current.select()
    }
    
    return () => smM().deleteHandle("handleKeyDown")
    
  },[place, disabled])

  return <TextFieldValidation inputRef={inputRef}
  id="input-barcode-scann"
  label="Barcode"
  onChange={e=>setInputBCValue(e.target.value)}
  value={inputBCValue}
  disabled={disabled}
  />
}

export default BarcodeScannUndisplayed

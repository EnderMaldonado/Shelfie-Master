import Iframe from "../Molecules/Iframe"
import { useEffect, useState, forwardRef, useImperativeHandle } from "react"

const IframePrint = forwardRef(({id, style, children, valuesInPrint}, ref) => {

  useImperativeHandle(ref, () => ({
    handlePrint
  })) 

  const [print, setPrint] = useState(false)

  const handlePrint = () => setPrint(true)

  useEffect(()=>{
    let ready = Object.keys(valuesInPrint).some(key => valuesInPrint[key] === null)
    if(!ready && print) {
      setPrint(false)
      let iframe = window.document.getElementById(id)
      if(iframe)
        iframe.contentWindow.print()
    }
  },[valuesInPrint, print])

  return <Iframe  id={id} style={style}>
    {children}
  </Iframe>
})

export default IframePrint
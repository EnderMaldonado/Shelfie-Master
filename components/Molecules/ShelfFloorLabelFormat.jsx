import { useEffect, useRef } from "react"

import JsBarcode from 'jsbarcode'

const ShelfFloorLabelFormat = ({shelf, floor}) => {

  const barcodeRef = useRef()

  useEffect(()=>{
    if(shelf && floor)
      JsBarcode(barcodeRef.current, `${shelf}-${floor}`, {
        format: "CODE128",
        width: "3",
        height: "50",
        fontSize: "20",
        margin: 0,
        text: `${shelf} - ${floor.toUpperCase()}`,
        textMargin: 5,
        textPosition: "top"
      })
  },[shelf, floor])

  return <div><svg ref={barcodeRef}></svg></div>
}
export default ShelfFloorLabelFormat
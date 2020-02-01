import { getBarcodeProductItem, getCategory } from "../../src/SM_Methods"
import { useEffect, useRef } from "react"

import JsBarcode from 'jsbarcode'

const ProductitemLabelFormat = ({id, product, qtyBox}) => {

  const {title="", tags=[], sku="", type=""} = product?product:{}

  const barcodeRef = useRef()

  useEffect(()=>{
    if(id)
      JsBarcode(barcodeRef.current, id, {
        format: "CODE128",
        width: "2",
        height: "25",
        fontSize: "10",
        margin: 0,
        text: `${sku} - ${id}`,
        textMargin: 0
      })
  },[id, sku])

  return <>
		<div style={{
      border: "1px solid black",
      boxSizing: "border-box",
			display: "grid",
      gridTemplateColumns: "1fr",
      justifyItems: "center",
			fontFamily: "monospace",
      fontSize: "10px",
      padding: "5px 5px"
    }}>
      {qtyBox ? <span style={{textAlign:"center", gridColumn:"2 span"}}>*Package quantity: {qtyBox}*</span> : null}
      <span style={{textAlign:"center", gridColumn:"2 span"}}>{title.replace(type, "").slice(0, 30) + "."}</span>
      <svg ref={barcodeRef}></svg>
      <span style={{textAlign:"center", gridColumn:"2 span"}}>{getCategory(tags, type)}</span>
		</div>
	</>
}
export default ProductitemLabelFormat

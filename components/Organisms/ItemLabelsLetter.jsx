import { increaseHexadecimal } from "../../src/SM_Methods"
import { useEffect } from "react"
import ProductitemLabelFormat from "../Molecules/ProductitemLabelFormat"


const ItemLabelsLetter = ({newCurrentItemId, currentProduct, labelsQty}) => {

  useEffect(()=>{
  },[newCurrentItemId, currentProduct, labelsQty])

  const getLabels = () => {
    let labels = []
    if(newCurrentItemId && currentProduct && labelsQty) {
    let id = newCurrentItemId
      for (let i = 0; i < labelsQty; i++) {
        labels.push(
          <ProductitemLabelFormat
            id={id}
            key={i}
            product={currentProduct}
          />
        )
        id = increaseHexadecimal(id, "000000")
      }
    }

    return labels
  }

  return <div style={{display:"grid", width:"544px", gridTemplateColumns: "repeat(auto-fill,200px)"}}>
    {getLabels()}
  </div>
}

export default ItemLabelsLetter
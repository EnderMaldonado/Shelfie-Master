import { useEffect, useState, forwardRef, useImperativeHandle, useContext, useRef } from "react"

import { Grid, Card, CircularProgress, TextField, Input, IconButton, CardActionArea } from "@material-ui/core"

import { graphqlProductDataToSimpleObject } from "../../src/SM_Methods"

import {GET_PRODUCT_BY_SKU} from '../../src/graphql_querys'
import useShelfiMasterMethods from "../customHooks/useShelfiMasterMethods"

import BigButton from '../Atoms/BigButton'
import Iframe from '../Molecules/Iframe'
import useCustomLazyQuery from "../customHooks/useCustomLazyQuery"
import ItemLabelsLetter from "./ItemLabelsLetter"
import ProductView from "../Molecules/ProductView"
import ProductitemLabelFormat from "../Molecules/ProductitemLabelFormat"
import IframePrint from "./IframePrint"
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import InputFieldPack from "../Molecules/InputFieldPack"

const CreateLabel = forwardRef(({action, setAction, loading, setLoading, onCancelAction, setCanCancell}, ref) => {

  const smM = useShelfiMasterMethods()

  const addItemHAL = (product, id, qtyBox) => {
    smM().addItemtoHistoryActions({
      product,
      id,
      isCancelling:false,
      qtyBox
    })
  }

  const [currentProduct, setCurrentProduct] = useState(null)
  const [queryProducts, setQueryProducts] = useState(null)
  const [newCurrentItemId, setNewCurrentItemId] = useState("")
  const [currentBarcode, setCurrentBarcode] = useState("")
  const [quantityBox, setQuantityBox] = useState("")

  useImperativeHandle(ref, () => ({
    handleScannBarcode,
    canCancell: (queryProducts || action === "SCANN_LABEL" || loading),
  }))

  const snackbarOptionsDefault = {
    variant:"default",
    autoHideDuration: 3000
  }
  const snackbarOptionsSucess = {
    ...snackbarOptionsDefault,
    variant:"success"
  }
  const snackbarOptionsError = {
    ...snackbarOptionsDefault,
    variant:"error"
  }
  const snackbarOptionsWarning = {
    ...snackbarOptionsDefault,
    variant:"warning"
  }

  const handleSnackbar = (text, options) => {
    setLoading(false)
    smM().handleSnackbar(text, options)  
  }

  //Find Shopify Product...
  const handleQueryReadProductComplete = async data  => {
    if(data.products.edges.length && data.products.edges[0].node.variants) {
      
      let items = data.products.edges.map((edge, i) => graphqlProductDataToSimpleObject(edge.node)) 
      
      if(items.length > 1) {
        setQueryProducts(items)
        handleSnackbar(`Have more that one of "${currentBarcode}"`, snackbarOptionsWarning)   
      } else {
        setCurrentProduct(items[0])
        handleGenerateBarcodeProduct(items[0].sku)
      }

    } else 
      handleSnackbar(`Not Found item "${currentBarcode}"`, snackbarOptionsError)
  }
  const handleSelecItem = item => {
    setCurrentProduct(item)
    handleGenerateBarcodeProduct(item.sku)
  }

  // B A R C O D E . . .
  const handleGenerateBarcodeProduct = async sku => {    
    try {
      
      let lastId = await smM().getItemLastId()

      setAction("SCANN_LABEL")

      setNewCurrentItemId(lastId)
      
      handlePrint()

      handleSnackbar(`Product find "${sku}"`, snackbarOptionsSucess)

    } catch (error) {
      // E R R O R ! ! ! !  < < = code . . .
      handleSnackbar(`Error to create Label for "${sku}"`, snackbarOptionsError)
      console.log(error)
    }
  }

  // P R I N T . . .
  const iframePrintRef = useRef()
  const handlePrint = () => {
    iframePrintRef.current.handlePrint()
  }

  // Q U E R Y E S . . .
  const [runSkuQuery] = useCustomLazyQuery(GET_PRODUCT_BY_SKU, {
    onCompleted: handleQueryReadProductComplete,
    onError: error => {
      console.log(error)
      handleSnackbar(`Error to find item "${currentBarcode}"`, snackbarOptionsError)
    }
  })

  const handleCheckBarcodeCurrentId = async barcode => {
    try {      
      if(barcode === newCurrentItemId) {
  
        let createLabel = await smM().createLabelItem(currentProduct, newCurrentItemId, quantityBox)
  
        handleSnackbar(`Label successful created for "${currentProduct.sku}"`, snackbarOptionsSucess)

        addItemHAL(currentProduct, newCurrentItemId, quantityBox)

        setAction("SCANN_PRODUCT")

        setCurrentProduct(null)
        setQueryProducts(null)
        setNewCurrentItemId("")
        setQuantityBox("")
      } else 
        handleSnackbar(`Is not the same barcode to "${newCurrentItemId}"`, snackbarOptionsWarning)  
    } catch (error) {
      handleSnackbar(`Error to check Label to "${currentProduct.sku}"`, snackbarOptionsError)
      console.log(error)
    } finally {
      setLoading(false)
    }

  }

  const handleScannBarcode = barcode => {    
    if(barcode.length) {
      setLoading(true)
      if(action === "SCANN_PRODUCT") {
        setCurrentBarcode(barcode)
        runSkuQuery({sku: barcode})
      }
      else 
        handleCheckBarcodeCurrentId(barcode)
    } else
      handleSnackbar(`Enter a barcode`, snackbarOptionsWarning)
  }

  useEffect(()=>{
    smM().setLoading(false)
    return () => {
      setCurrentProduct(null)
      setNewCurrentItemId(null)
      setCurrentBarcode(null)
      setQuantityBox(null)
      setQueryProducts(null)
      setLoading(false)
      setAction("SCANN_PRODUCT")
      runSkuQuery({})
    }
  },[])

  // const buttonCancell = (queryProducts || action === "SCANN_LABEL" || loading) &&
  //   <IconButton onClick={onCancelAction}>
  //     <CancelPresentationIcon/>
  //   </IconButton>

  return <>
  {
    loading ? <div style={{height:"5rem", display: "grid", justifyItems:"center", alignItems:"center"}}>
        <CircularProgress/>
      </div>
    :
    action === "SCANN_LABEL" ? <Grid container spacing={2} justify="space-evenly" alignItems="center">
      <Grid item >
        <ProductView {...{...currentProduct}}/>
      </Grid>
      <Grid item md>
        <Card>
          <ProductitemLabelFormat
            id={newCurrentItemId}
            product={currentProduct}
            qtyBox={quantityBox}
          />
        </Card> 
      </Grid>
    </Grid>
    :
    <Grid container direction="row-reverse" spacing={2} justify="space-between">
      <Grid item >
        <InputFieldPack {...{quantityBox, setQuantityBox}}/>
      </Grid>
      <Grid item sm>
        {
          queryProducts && queryProducts.map((product, i) => <Card key={i} style={{maxHeight:"10rem"}}>
              <CardActionArea onClick={()=>handleSelecItem(product)}>
                <ProductView {...{...product}}/>
              </CardActionArea>
            </Card>) 
        }
      </Grid>
    </Grid>
  }
    <IframePrint ref={iframePrintRef}
    id="iframe-label"
    style={{display:"none"}} 
    valuesInPrint={{newCurrentItemId, currentProduct}}>
      <ProductitemLabelFormat
        id={newCurrentItemId}
        product={currentProduct}
        qtyBox={quantityBox}
      />
    </IframePrint>
  </>

})

export default CreateLabel
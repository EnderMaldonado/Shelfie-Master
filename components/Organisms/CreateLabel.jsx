import React, { useEffect, useState, forwardRef, useImperativeHandle, useContext, useRef } from "react"

import { Grid, Card, CircularProgress, TextField, Input, IconButton, Typography,
  CardActionArea, makeStyles, Backdrop, Paper } from "@material-ui/core"

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
import useHistory from '../customHooks/useHistory'
import PrintIcon from '@material-ui/icons/Print'

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  paper: {
    padding: theme.spacing(3)
  }
}))

const CreateLabel = forwardRef(({action, setAction, loading, setLoading, handleCancell}, ref) => {
  const classes = useStyles()

  const smM = useShelfiMasterMethods()

  const handleHistory = useHistory()

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
        handleGenerateBarcodeProduct(items[0])
      }

    } else
      handleSnackbar(`Not Found item "${currentBarcode}"`, snackbarOptionsError)
  }
  const handleSelecItem = item => {
    setCurrentProduct(item)
    handleGenerateBarcodeProduct(item.sku)
  }

  // B A R C O D E . . .
  const handleGenerateBarcodeProduct = async item => {
    try {

      let lastId = await smM().getItemLastId()

      setAction("SCANN_LABEL")

      setNewCurrentItemId(lastId)

      let saveH = await handleHistory(`Scanned shopify product`, lastId, item.id)
      let saveH2 = await handleHistory(`Generated Label for shopify product`, lastId, item.id)

      handlePrint(lastId, item.id)

      handleSnackbar(`Product find "${item.sku}"`, snackbarOptionsSucess)

    } catch (error) {
      // E R R O R ! ! ! !  < < = code . . .
      handleSnackbar(`Error to create Label for "${item.sku}"`, snackbarOptionsError)
      console.log(error)
    }
  }

  // P R I N T . . .
  const iframePrintRef = useRef()
  const handlePrint = (iD, sID) => {
    iframePrintRef.current.handlePrint()
    let id = iD ? iD : newCurrentItemId ? newCurrentItemId : ""
    let sId = sID ? sID : currentProduct ? currentProduct.id : ""
    handleHistory(`Printed label`, id, sId).catch(e=>console.log(e))
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

        let saveH = await handleHistory(`Checked Label`, barcode, currentProduct.id)

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

  return <>
    <React.Fragment>
      <Grid container direction="row-reverse" spacing={2} justify="space-between">
        <Grid item>
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
      <Backdrop className={classes.backdrop} open={action === "SCANN_LABEL" || loading}>
        <Paper className={classes.paper}>
          <Grid container alignItems="center" spacing={1}>
            {
              !loading ? <React.Fragment>
                <Grid item xs>
                  <Typography variant="subtitle2">
                    Scan the label printed for check
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton onClick={()=>{
                    let sId = currentProduct ? currentProduct.id  : ""
                    handleHistory(`Cancell process to generate label`, newCurrentItemId, sId)
                    handlePrint()}}>
                    <PrintIcon/>
                  </IconButton>
                </Grid>
              </React.Fragment> : null
            }
            <Grid item>
              <IconButton onClick={handleCancell}>
                <CancelPresentationIcon/>
              </IconButton>
            </Grid>
          </Grid>
          {
            loading ? <div style={{height:"5rem", display: "grid", justifyItems:"center", alignItems:"center"}}>
                <CircularProgress/>
              </div> :
            <Grid container spacing={2} justify="space-evenly" alignItems="center">
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
          }
        </Paper>
      </Backdrop>
    </React.Fragment>
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

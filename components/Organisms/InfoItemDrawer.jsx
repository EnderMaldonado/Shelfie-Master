import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react"
import useShelfiMasterMethods from "../customHooks/useShelfiMasterMethods"
import useCustomLazyQuery from "../customHooks/useCustomLazyQuery"
import { GET_PRODUCT_BY_ID } from "../../src/graphql_querys"
import { addTextToIdForGraphql, graphqlProductDataToSimpleObject } from "../../src/SM_Methods"
import { CircularProgress, makeStyles, Drawer, IconButton, Typography, Divider } from "@material-ui/core"
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import InfoItemDrawerPreview from "../Molecules/InfoItemDrawerPreview"
import PrintIcon from '@material-ui/icons/Print'
import Iframe from "../Molecules/Iframe"
import ProductitemLabelFormat from "../Molecules/ProductitemLabelFormat"

const useStyles = makeStyles(theme => ({
  list: {
    width: 300,
    padding: theme.spacing(1)
  },
  drawerHeader: {
    display: 'grid',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    gridTemplateColumns:"auto 1fr auto",
    gridGap: theme.spacing(2),
    justifyItems: "right"
  },
}))

const InfoItemDrawer = forwardRef ((props, ref) => {
  const classes = useStyles()

  const smM = useShelfiMasterMethods()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [labelInfo, setLabelInfo] = useState(null)
  const [itemsSemejants, setItemsSemejants] = useState(null)
  const [product, setProduct] = useState(null)

  const [open, setOpen] = useState(false)

  useImperativeHandle(ref, () => ({
    handleLoadInfo
  }))

  const handleLoadInfo = async id => {
    try {
      setOpen(true)
      setLoading(true)

      let labelItem = await smM().getLabelItem(id)
      setLabelInfo(labelItem)

      let itemsSemejantsAux = await smM().getLabelsByKey("shopify_id", labelItem.shopify_id)
      setItemsSemejants(itemsSemejantsAux)

      runSkuQuery({id: addTextToIdForGraphql(labelItem.shopify_id)})
    } catch (error) {
      console.log(error)
    }
  }

  const handleComplete = data => {
    if(data.product)
      setProduct(graphqlProductDataToSimpleObject(data.product))
    else
      setError("404")
    setLoading(false)
  }

  // Q U E R Y E S . . .
  const [runSkuQuery] = useCustomLazyQuery(GET_PRODUCT_BY_ID, {
    onCompleted: handleComplete,
    onError: error => {
      console.log(error)
      setError(error)
      setLoading(false)
    }
  })

  const handlePrint = () => {
    let iframe = window.document.getElementById(labelInfo.id+"iframe")
    if(iframe)
      iframe.contentWindow.print()
  }


  return <Drawer anchor="right"  open={open} onClose={()=>setOpen(false)}>
    <div
    className={classes.list}
    role="presentation"
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={()=>setOpen(false)}>
          <ChevronLeftIcon />
        </IconButton>
        {!loading && !error ? <React.Fragment>
          <IconButton edge="end" onClick={handlePrint}>
            <PrintIcon />
          </IconButton>
          <Typography>
            {labelInfo && labelInfo.id}
          </Typography>
          </React.Fragment>
        : null}
      </div>
      <Divider/>
      {
        loading ? <CircularProgress/> :
        error ? <Typography variant="subtitle2" color="error">
          {error === "404" ? "Item not found 404" : "Error to load"}
        </Typography>
        :
        <InfoItemDrawerPreview {...{...product, item:labelInfo, items:itemsSemejants, handleLoadInfo}}/>
      }
    </div>
    {!loading && !error && labelInfo && product?
      <Iframe id={labelInfo.id+"iframe"} style={{display:"none"}}>
        <ProductitemLabelFormat
        id={labelInfo.id}
        product={product}
        packed_quantity={labelInfo.packed_quantity}
        />
      </Iframe> : null
    }
  </Drawer>
})

export default InfoItemDrawer

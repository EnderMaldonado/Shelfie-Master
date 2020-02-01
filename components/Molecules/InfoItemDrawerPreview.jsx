import React from 'react'
import { makeStyles, Typography, List, ListSubheader, ListItem, ListItemText, Grid, Card, CardHeader, Paper } from "@material-ui/core"
import { getCategory } from "../../src/SM_Methods"
import serverTime from '../../custom_modules/server-time'
import PackedChip from "../Atoms/PackedChip"

const useStyles = makeStyles(theme => ({
  grid: {
    display: "grid",
    minHeight: "100%",
    gridTemplateColumns:"1fr",
    overflow: "auto"
  },
  paperList: {
    maxHeight: theme.spacing(20),
    overflow: "auto"
  },
  listSubHeader: {
    backgroundColor: 'white',
    padding: 0,
    textAlign: "center",
    lineHeight: "30px",
    height: theme.spacing(3),
  },
  widh100: {
    width: "100%"
  }
}))


const InfoItemDrawerPreview = ({id, sku, title, tags, type, imageSrc, quantity, item, items, handleLoadInfo}) => {
  const classes = useStyles()

  const {createAt, packed_quantity, location, updatedAt, id:itemId} = item

  return <Grid container>
    <Grid item>
      <PackedChip paquedQuantity={packed_quantity}/>
    </Grid>
    <Grid item container direction="column" className={classes.widh100}>
      <Typography align="left" variant="subtitle2">shopify id: {id}</Typography>
      <Typography align="center" variant="h6">{title}</Typography>
    </Grid>
    <Grid item container className={classes.widh100} justify="center">
      <div style={{
        width:"10rem", height:"10rem",
        backgroundImage: `url(${imageSrc})`,
        backgroundPosition: "center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        margin: "auto"
      }}></div>
    </Grid>
    <Grid item container direction="column">
      <Typography variant="caption">sku: {sku}</Typography>
      <Typography variant="subtitle1">Location: {location.toUpperCase()}</Typography>
      <Typography variant="body1">Category: {getCategory(tags, type)}</Typography>
      <Typography variant="body1">Quantity in Shopify: {quantity}</Typography>
    </Grid>
    <Grid item container className={classes.widh100} justify="center">
      {
        items && Object.keys(items).length > 0 ? <Paper style={{width:"100%"}} elevation={3} className={classes.paperList}>
          <List subheader={<ListSubheader className={classes.listSubHeader}>labels to product ({Object.keys(items).length})</ListSubheader>}>
            {
              Object.keys(items).map((idI, i) => <ListItem key={i} button onClick={()=>handleLoadInfo(idI)}>
                <ListItemText>
                  <Typography variant="body2">{idI}</Typography>
                </ListItemText>
              </ListItem>)
            }
          </List>
        </Paper> : null
      }
    </Grid>
    <Grid item container direction="column">
      <Typography variant="body1">Label Printed At: {serverTime.getDatePretyWHours(createAt)}</Typography>
      {updatedAt?<Typography variant="body1">Last Update: {serverTime.getDatePretyWHours(updatedAt)}</Typography>:null}
    </Grid>
  </Grid>
}

export default InfoItemDrawerPreview

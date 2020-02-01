import { ListItem, Avatar, ListItemAvatar, ListItemText, Grid,
  Typography, Fade, IconButton, Paper, ListItemSecondaryAction, Collapse, List, Chip } from "@material-ui/core"

import ReceiptIcon from '@material-ui/icons/Receipt'

import DeleteIcon from '@material-ui/icons/Delete'
import PrintIcon from '@material-ui/icons/Print'

import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import FadeCancellingHAItem from '../Atoms/FadeCancellingHAItem'
import Iframe from "./Iframe"
import ProductitemLabelFormat from "./ProductitemLabelFormat"
import BoxIcon from '../SvgIcons/BoxIcon'
import useShelfiMasterMethods from "../customHooks/useShelfiMasterMethods"

const HistoryActionsItemCreateLabel = ({index, product, id, isCancelling, qtyBox, button, onClick}) => {

  const {title, sku} = product

  const smM = useShelfiMasterMethods()

  const HandleCancel = () => {
    smM().removeItemHistoryActions(index, id)
  }

  const handlePrint = () => {
    let iframe = window.document.getElementById(index+id+"iframe")
    if(iframe)
      iframe.contentWindow.print()
  }

  const handleShowFade = v => {
    smM().updateItemHistoryActions(index, {"isCancelling":v})
  }

  return <ListItem button={button} onClick={onClick}>
      <ListItemAvatar>
        <Avatar>
          <ReceiptIcon />
        </Avatar>
      </ListItemAvatar>
      <FadeCancellingHAItem {...{isCancelling, HandleCancel, handleShowFade}}/>
      <Iframe id={index+id+"iframe"} style={{display:"none"}}>
        <ProductitemLabelFormat
          id={id}
          product={product}
          qtyBox={qtyBox}
          />
        </Iframe>
      <ListItemText
        primary={
          <Typography>
          {qtyBox && qtyBox > 0 ? <Chip
          icon={<BoxIcon/>}
          label={qtyBox}
          /> : null}
          {title}
          </Typography>
        }
        secondary={<Typography
          component="span"
          variant="body2"
          color="textPrimary">
            {sku} - {id}
          </Typography>
        }
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={handlePrint}>
          <PrintIcon />
        </IconButton>
        <IconButton edge="end" onClick={handleShowFade}>
          <DeleteIcon/>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
}

export default HistoryActionsItemCreateLabel

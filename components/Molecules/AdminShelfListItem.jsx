import React, {useState} from 'react'
import { ListItem, Avatar, ListItemAvatar, ListItemText, Grid,
  Typography, Fade, IconButton, Paper, ListItemSecondaryAction, Collapse, List, Chip } from "@material-ui/core"

import ReceiptIcon from '@material-ui/icons/Receipt'

import DeleteIcon from '@material-ui/icons/Delete'

import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import FadeCancellingHAItem from '../Atoms/FadeCancellingHAItem'
import BoxIcon from '../SvgIcons/BoxIcon'
import useShelfiMasterMethods from "../customHooks/useShelfiMasterMethods"

const AdminShelfListItem = ({index, shopify_title, shopify_sku, id, packed_quantity, button, onClick, handleRefresh}) => {

  const smM = useShelfiMasterMethods()

  const snackbarOptionsSucess = {
    variant:"success",
    autoHideDuration: 3000
  }
  const snackbarOptionsError = {
    variant:"error",
    autoHideDuration: 3000
  }


  const handleSnackbar = (text, options) => {
    smM().handleSnackbar(text, options)
  }

  const [isCancelling, setIsCancelling] = useState(false)

  const handleCancel = async () => {
    try {
      smM().setLoading(true)
      let remove = await smM().removeLabelItem(id)
      handleSnackbar(`Label "${id}" removed`, snackbarOptionsSucess)
      setIsCancelling(false)
      handleRefresh()
      smM().setLoading(false)
    } catch (e) {
      console.log(e)
      handleSnackbar(`Error to remove label "${id}"`, snackbarOptionsError)
    }
  }

  const handleShowFade = v => {
    setIsCancelling(v)
  }

  return <ListItem button={button && !isCancelling} onClick={!isCancelling?onClick:()=>null}>
      <ListItemAvatar>
        <Avatar>
          <ReceiptIcon />
        </Avatar>
      </ListItemAvatar>
      <FadeCancellingHAItem {...{isCancelling, handleCancel, handleShowFade}}/>
      <ListItemText
        primary={
          <React.Fragment>
          {packed_quantity && packed_quantity > 0 ? <Chip
          icon={<BoxIcon/>}
          label={packed_quantity}
          /> : null}
          <Typography>
            {shopify_title.replace(/\b[a-z]/g,c=>c.toUpperCase())}
          </Typography>
          </React.Fragment>
        }
        secondary={<Typography
          component="span"
          variant="body2"
          color="textPrimary">
            {shopify_sku} - {id}
          </Typography>
        }
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={handleShowFade}>
          <DeleteIcon/>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
}

export default AdminShelfListItem

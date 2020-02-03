import React, {useState, useContext} from 'react'
import { ListItem, Avatar, ListItemAvatar, ListItemText, Grid,
  Typography, Fade, IconButton, Paper, ListItemSecondaryAction, Collapse, List, Chip } from "@material-ui/core"

import ReceiptIcon from '@material-ui/icons/Receipt'

import DeleteIcon from '@material-ui/icons/Delete'

import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import FadeCancellingHAItem from '../Atoms/FadeCancellingHAItem'
import BoxIcon from '../SvgIcons/BoxIcon'
import useShelfiMasterMethods from "../customHooks/useShelfiMasterMethods"
import SessionContext from '../Context/Session/SessionContext'

const AdminShelfListItem = ({index, shopify_title, shopify_sku, id, packed_quantity, button, onClick}) => {

  return <ListItem button={button && !isCancelling} onClick={!isCancelling?onClick:()=>null}>
      <ListItemAvatar>
        <Avatar>
          <ReceiptIcon />
        </Avatar>
      </ListItemAvatar>
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
    </ListItem>
}

export default AdminShelfListItem

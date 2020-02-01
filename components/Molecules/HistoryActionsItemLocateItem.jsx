import { ListItem, Avatar, ListItemAvatar, ListItemText, Typography, Chip } from "@material-ui/core"

import PinDropIcon from '@material-ui/icons/PinDrop';

import BoxIcon from '../SvgIcons/BoxIcon'
import PackedChip from "../Atoms/PackedChip";

const HistoryActionsItemLocateItem = ({shopify_sku, id, packed_quantity, location, button, onClick}) => {


  const subText = <Typography
    component="span"
    variant="body2"
    color="textPrimary">
    {`placed ${packed_quantity && packed_quantity > 0 ? "pack" : "item"} ${shopify_sku}-${id} in ${location.toUpperCase()}`}
    </Typography>


  return <ListItem button={button} onClick={onClick}>      
      <ListItemAvatar>
        <Avatar>
          <PinDropIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={<PackedChip paquedQuantity={packed_quantity}/>} secondary={subText}/>
    </ListItem>
}

export default HistoryActionsItemLocateItem
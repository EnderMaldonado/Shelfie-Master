import { makeStyles, Drawer, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import CreateLabelShelf from "../Organisms/CreateLabelShelf"
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

const useStyles = makeStyles(theme => ({
  list: {
    width: 300,
    padding: theme.spacing(1)
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}))

const NavbarDrawer = ({open, setOpen, menuItems, onClickNavItem}) => {
  const classes = useStyles();

  return <Drawer open={open} onClose={()=>setOpen(false)}>
    <div
    className={classes.list}
    role="presentation"
    > 
      <div className={classes.drawerHeader}>
        <IconButton onClick={()=>setOpen(false)}>
            <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider/>
      <List>
        {menuItems ? menuItems.map((item, i) => (
          <ListItem button key={i} onClick={()=>onClickNavItem(item.value)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        )) : null}
      </List>
      <Divider/>
      <CreateLabelShelf/>
    </div>
  </Drawer>
}

export default NavbarDrawer
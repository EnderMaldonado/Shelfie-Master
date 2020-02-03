import {useContext, useState} from 'react';
import { AppBar, Toolbar, Typography, makeStyles, IconButton, Backdrop, Tooltip } from '@material-ui/core'
import AppsIcon from '@material-ui/icons/Apps';

import ShopContext from '../Context/Shop/ShopContext'
import useShelfiMasterMethods from '../customHooks/useShelfiMasterMethods';
import NavbarDrawer from '../Molecules/NavbarDrawer';
import NavigationContext from '../Context/Navigation/NavigationContext';
import SessionContext from '../Context/Session/SessionContext'
import ReceiptIcon from '@material-ui/icons/Receipt'
import AllInboxIcon from '@material-ui/icons/AllInbox'
import EditLocationIcon from '@material-ui/icons/EditLocation'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SessionLogin from '../Molecules/SessionLogin'

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
}));

const SimpleAppBar = () => {
  const classes = useStyles();

  const [{shopName}] = useContext(ShopContext)
  const [{page}] = useContext(NavigationContext)
  const [{user}] = useContext(SessionContext)

  const [open, setOpen] = useState(false)
  const [openSession, setOpenSession] = useState(false)

  const smM = useShelfiMasterMethods()

  const navItems = [
    {text: "Create Labels", icon: <ReceiptIcon/>, value:"createLabels"},
    {text: "Locate Items", icon: <EditLocationIcon/>, value:"locateItems"},
    {text: "Admin Shelfs", icon: <AllInboxIcon/>, value:"adminShelf"},
  ]

  const handleClickNavbar = value => {
    setOpen(false)
    if(page != value) {
      smM().cleanListHistoryActions()
      smM().setLoading(true)
      smM().changePage(value)
    }
  }

  return <>
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton onClick={()=>setOpen(true)}>
          <AppsIcon/>
        </IconButton>
        <Typography variant="h6" align="left">
          {navItems.filter(i => i.value === page)[0].text}
        </Typography>
        <Typography variant="h6" align="right" className={classes.title}>
          {shopName}
        </Typography>
        <Tooltip title={user}>
          <IconButton onClick={()=>setOpenSession(true)}>
            <AccountCircleIcon/>
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
    <SessionLogin {...{setOpenSession, openSession}}/>
    <NavbarDrawer {...{open, setOpen, menuItems:navItems, onClickNavItem:handleClickNavbar}} />
    </>
}

export default SimpleAppBar

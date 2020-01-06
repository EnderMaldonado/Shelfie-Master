import {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import ShopContext from '../Context/Shop/ShopContext'

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
}));

const SimpleAppBar = () => {
  const classes = useStyles();
  const [{shopName}] = useContext(ShopContext)

  return <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" className={classes.title}>
        {shopName}
      </Typography>
    </Toolbar>
  </AppBar>
}

export default SimpleAppBar

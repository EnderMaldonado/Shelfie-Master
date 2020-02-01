import CircularProgress from '@material-ui/core/CircularProgress';
import { Backdrop, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

 const LoadingBg = ({open}) => {
  const classes = useStyles();
  
  return <Backdrop className={classes.backdrop} open={open}>
      <CircularProgress color="inherit" />
  </Backdrop>
}

export default LoadingBg
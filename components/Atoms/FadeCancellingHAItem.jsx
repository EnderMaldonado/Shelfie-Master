import { makeStyles, Paper, Typography, IconButton, Fade, Grid } from "@material-ui/core"

import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme => ({
  fade: {
    width: "100%",
    position: "absolute",
    height: "100%",
    display: "grid",
    alignContent: "center",
    top: 0,
    left: 0,
    zIndex: 1
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr auto auto",
    alignItems: "center",
    padding: ".5rem",
    margin: "auto"
  }
}))


const FadeCancellingHAItem = ({isCancelling, handleCancel, handleShowFade}) => {
  const classes = useStyles()

  const isC = isCancelling ? true : false

  return <Fade in={isC} className={classes.fade}>
    <Paper elevation={4}>
      <Grid container className={classes.grid}>
        <Grid item>
          <Typography variant="body2">Cancell this process?</Typography>
        </Grid>
        <Grid item>
          <IconButton size="small" onClick={handleCancel}>
            <CheckIcon/>
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton size="small" onClick={()=>handleShowFade(false)}>
            <CloseIcon/>
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  </Fade>
}

export default FadeCancellingHAItem

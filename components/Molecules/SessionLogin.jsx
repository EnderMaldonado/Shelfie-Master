import {useContext, useState, useEffect} from 'react'
import { Paper, Grid, Tooltip, IconButton, Typography, TextField, Button, LinearProgress, Backdrop, makeStyles } from "@material-ui/core"
import SessionContext from '../Context/Session/SessionContext'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import useShelfiMasterMethods from '../customHooks/useShelfiMasterMethods'
import useHistory from '../customHooks/useHistory'
import SessionContextç from '../Context/Session/SessionContext'
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const SessionLogin = ({setOpenSession, openSession}) => {
  const classes = useStyles();

  const [{user, typeUser}] = useContext(SessionContextç)

  const smM = useShelfiMasterMethods()

  const handleHistory = useHistory()

  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)

  const snackbarOptionsSucess = {
    autoHideDuration: 5000,
    variant:"success"
  }
  const snackbarOptionsError = {
    autoHideDuration: 5000,
    variant:"error"
  }
  const handleSnackbar = (text, options) => smM().handleSnackbar(text, options)

  const handleChangeSession = () => smM().handleExitSession()

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    smM().setLoading(true)
    let exist = await smM().handleLoginUser(userName, password)
    if(exist){
      handleSnackbar(`User "${userName}" loged`, snackbarOptionsSucess)
      handleHistory(`User "${userName}" loged`)
    }
    else
      handleSnackbar("The username or password does not match", snackbarOptionsError)
    setLoading(false)
    smM().setLoading(false)
    setOpenSession(false)
    setPassword("")
    setUserName("")
  }

  useEffect(()=>{
    setOpenSession(true)
  },[])

  return <Backdrop className={classes.backdrop} open={(openSession && user !== null)}>
    <Paper style={{padding:"1rem"}}>
    {
      user ? <Grid container justify="center" direction="column" spacing={1}>
        <Grid item container justify="space-between" alignItems="center">
          <Grid item>
            <Tooltip title="Change user">
              <IconButton onClick={handleChangeSession}>
                <ExitToAppIcon/>
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <IconButton onClick={user?()=>setOpenSession(false):()=>null}>
              <ClearIcon/>
            </IconButton>
          </Grid>
        </Grid>
        <Grid item>
          <Typography align="center" variant="h6">User: {user}</Typography>
        </Grid>
        <Grid item>
          <Typography align="center" variant="subtitle2">Permission: {typeUser.toUpperCase()}</Typography>
        </Grid>
      </Grid>
    :
      <>
        <form onSubmit={handleSubmit} style={{padding: "1rem 0", display:"grid", gridGap: "1rem"}}>
          <Typography variant="subtitle1" align="center">LOG IN</Typography>
          <TextField size="small" placeholder="User Name" variant="outlined" value={userName} onChange={e=>setUserName(e.target.value)} fullWidth/>
          <TextField type="password" size="small" placeholder="Password" variant="outlined" value={password} onChange={e=>setPassword(e.target.value)} fullWidth/>
          <Button startIcon={<VpnKeyIcon/>} disabled={loading} variant="contained" color="primary" type="submit" fullWidth>Log in</Button>
        </form>
        {loading ? <LinearProgress color="secondary" /> : null}
      </>
    }
    </Paper>
  </Backdrop>
}

export default SessionLogin

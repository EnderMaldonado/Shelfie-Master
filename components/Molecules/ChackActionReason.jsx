import {useContext, useState, useEffect, forwardRef, useImperativeHandle} from 'react'
import { Backdrop, Paper, Grid, IconButton, TextField, LinearProgress, makeStyles } from "@material-ui/core"
import ClearIcon from '@material-ui/icons/Clear';
import SessionContext from '../Context/Session/SessionContext'
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import useShelfiMasterMethods from '../customHooks/useShelfiMasterMethods'

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const ChackActionReason = forwardRef((props, ref) => {

  const [{typeUser}] = useContext(SessionContext)

  const smM = useShelfiMasterMethods()

  useImperativeHandle(ref, () => ({
    handleCheckAction,
  }))

  const snackbarOptionsDefault = {
    variant:"default",
    autoHideDuration: 4000
  }
  const snackbarOptionsSucess = {
    ...snackbarOptionsDefault,
    variant:"success"
  }
  const snackbarOptionsError = {
    ...snackbarOptionsDefault,
    variant:"error"
  }
  const snackbarOptionsWarning = {
    ...snackbarOptionsDefault,
    variant:"warning"
  }
  const handleSnackbar = (text, options) => {
    setLoading(false)
    smM().handleSnackbar(text, options)
  }

  const [reasonText, setReasonText] = useState("")
  const [password, setReasonText] = useState("")
  const [inputTextVerify, setInputTextVerify] = useState("")

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [textAction, setTextAction] = useState("")
  const [textVerify, setTextVerify] = useState("")
  const [checkMethod, setCheckMethod] = useState(()=>null)

  const handleCheckAction = (actionText, verifyText, onCheck) => {
    setTextVerify(actionText)
    setTextVerify(verifyText)
    setCheckMethod(onCheck)
    setOpen(true)
  }

  const handleSumbit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      if(typeUser && typeUser === "admin") {
        let checkPass = await msM().checkPasswordAdmin(password)
        if(!checkPass) {
          handleSnackbar("Password is not to Admin", snackbarOptionsWarning)
          return;
        }
      }
      if(!reasonText) {
        handleSnackbar("Enter reason text", snackbarOptionsWarning)
        return;
      }
      if(textVerify !== inputTextVerify) {
        handleSnackbar(`"${inputTextVerify}" is not same to "${textVerify}"`, snackbarOptionsWarning)
        return;
      }
      if(checkMethod) {
        checkMethod()
        setOpen(false)
      }
    } catch (e) {
      console.log(e)
      handleSnackbar("Error to check password", snackbarOptionsError)
    }
  }

  return <Backdrop className={classes.backdrop} open={open}>
    <Paper style={{padding:"1rem"}}>
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" spacing={1}>
          <Grid item container>
            <Grid item xs>
              {textAction}
            </Grid>
            <Grid item>
              <IconButton onClick={user?()=>setOpenSession(false):()=>null}>
                <ClearIcon/>
              </IconButton>
            </Grid>
          </Grid>
          {
            typeUser && typeUser === "admin" ?
            <Grid item>
              <TextField type="password" label="Admin Password" value={password} onChange={e=>setPassword(e.target.value)}/>
            </Grid> : null
          }
          <Grid item>
            <TextField multiline label="Reason" value={reasonText} onChange={e=>setReasonText(e.target.value)}/>
          </Grid>
          <Grid item container spacing={1}>
            <Grid item xs>
              <TextField multiline label={`Input "${textVerify}" to proceed`} value={inputTextVerify} onChange={e=>setInputTextVerify(e.target.value)}/>
            </Grid>
            <Grid item>
              <IconButton type="submit" onCLick={handleSubmit}>
                <CheckCircleOutlinedIcon/>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        {loading ? <LinearProgress color="secondary" /> : null}
      </form>
    </Paper>
  </Backdrop>

})

export default ChackActionReason

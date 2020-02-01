import { withStyles, makeStyles } from '@material-ui/core/styles'
import { TextField, InputAdornment } from '@material-ui/core'
import GpsFixedIcon from '@material-ui/icons/GpsFixed'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const ValidationTextField = withStyles({
  root: {
    '& input:valid + fieldset': {
      borderColor: 'green',
      borderWidth: 2,
    },
    '& input:invalid + fieldset': {
      borderColor: 'red',
      borderWidth: 2,
    },
    '& input:valid:focus + fieldset': {
      borderLeftWidth: 6,
      padding: '4px !important', // override inline-style
    },
  },
})(TextField);

const TextFieldValidation = ({inputRef, id, variant="outlined", label, onChange, value, disabled}) => {
  const classes = useStyles();

  return <ValidationTextField
  inputRef={inputRef}
  className={classes.margin}
  label={label}
  variant={variant}
  id={id}
  size="small"
  onChange={onChange}
  value={value}
  disabled={disabled}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <GpsFixedIcon />
      </InputAdornment>
    ),
  }}
/>
}

export default TextFieldValidation
import { Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const BigButton = ({text="Button", variant="contained", onClick, color, endIcon, startIcon, disabled}) => {
  const classes = useStyles()

  return <Button
    className={classes.button}
    variant={variant}
    color={color}
    startIcon={startIcon}
    endIcon={endIcon}
    onClick={onClick}
    size="large"
    disabled={disabled}
  >
    {text}
  </Button>
}

export default BigButton
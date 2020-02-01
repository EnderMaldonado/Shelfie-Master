import BoxIcon from "../SvgIcons/BoxIcon"
import { makeStyles, FilledInput, InputAdornment, IconButton, TextField } from "@material-ui/core"
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import LabelIcon from '@material-ui/icons/Label';
const InputFieldPack = ({quantityBox, setQuantityBox}) => {

  const isBox = quantityBox && quantityBox > 0

  return <TextField
    style={{maxWidth:"15rem"}}
    type="number"
    label={isBox ? "Pack" : "Item"}
    placeholder={"How many items in box"}
    value={quantityBox}
    onChange={e=>setQuantityBox(e.target.value)}
    variant="outlined"
    InputProps={{
      startAdornment:<InputAdornment position="start">
          {isBox ? <BoxIcon/> : <LabelIcon/>}
        </InputAdornment>,
      endAdornment: isBox ? <InputAdornment position="end">
          <IconButton onClick={()=>setQuantityBox("")}>
            <HighlightOffIcon/>
          </IconButton>
        </InputAdornment> : false
    }}
  />
}

export default InputFieldPack
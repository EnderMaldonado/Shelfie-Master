import { Grid, Typography, TextField, Fab } from "@material-ui/core"
import { getCategory } from "../../src/SM_Methods"
import PrintIcon from '@material-ui/icons/Print';

const ProductView = ({sku, title, tags, type, imageSrc, quantity, onSubmit, setLabelsQty, labelsQty}) => {

  return <Grid container alignItems="center">
    <Grid item style={{justifyItems:"center", display:"grid"}}>
      <div style={{
        width:"10rem", height:"10rem",
        backgroundImage: `url(${imageSrc})`,
        backgroundPosition: "center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat"
      }}>
      </div>
      <Typography variant="subtitle2">{getCategory(tags, type)}</Typography>
    </Grid>
    <Grid item>
      <Typography variant="subtitle1">{title}</Typography>
      <Typography variant="caption">{sku}</Typography>
      <form onSubmit={onSubmit} noValidate autoComplete="off">
        <TextField label="Quantity Labels" autoComplete="off" variant="outlined" 
        value={labelsQty} onChange={e=>setLabelsQty(e.target.value)} />
        <Fab type="submit" color="secondary" aria-label="add">
          <PrintIcon/>
        </Fab>
      </form>
    </Grid>
  </Grid>
}

export default ProductView
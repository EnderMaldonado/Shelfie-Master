import { Grid, Typography, TextField, Fab, Card } from "@material-ui/core"
import { getCategory } from "../../src/SM_Methods"

const ProductView = ({sku, title, tags, type, imageSrc}) => {

  return <Card>
    <Grid container alignItems="center" style={{flexWrap: "nowrap", maxWidth: "30rem"}}>
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
      </Grid>
    </Grid>
  </Card>
}

export default ProductView

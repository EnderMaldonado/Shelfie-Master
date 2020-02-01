import { Grid, Card, Typography, makeStyles, CardContent } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  cardImage: {
    height: "100%",
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    maxWidth: "20rem",
    minHeight:"10rem",
    minWidth: "10rem"
  },
  cardProduct: {
    margin: theme.spacing(2),
    maxWidth: "40rem"
  }
}))
const ProductDataDisplay = ({id, title, tags, imageSrc, quantity}) => {
  const classes = useStyles()
  
  return <Card className={classes.cardProduct}>
    <Grid container wrap="nowrap" spacing={3}>
      <Grid item>
        <Card className={classes.cardImage} style={{backgroundImage: `url(${imageSrc})`}}></Card>
      </Grid>
      <Grid item xs sm={12} container>
        <CardContent>
          <Typography component="h5" variant="h5">
            {title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {tags.join(", ")}
          </Typography>
          <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center">
            <Typography variant="subtitle2">Qty: {quantity}</Typography>
            <Typography variant="subtitle2">Location</Typography>
          </Grid>
        </CardContent>
      </Grid>
    </Grid>
  </Card>
}

export default ProductDataDisplay
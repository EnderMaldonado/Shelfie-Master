import { Grid, Divider, Typography } from '@material-ui/core'

import BarcodeScannUndisplayed from '../Atoms/BarcodeScannUndisplayed'
import HistoryActionsList from '../Organisms/HistoryActionsList'
import LocateItem from '../Organisms/LocateItem'
import HistoryActionsItemLocateItem from '../Molecules/HistoryActionsItemLocateItem'

const CreateLabelTemplate = ({loading, setLoading, handleCheckBarcode, action,
  setAction, scannBarcodeActionRef}) => {
  
  const actionText = action === "SET_SHELF" ? "Scann the Shelf" : "Scann the Item Label to set in Shelf"

  return <div style={{padding:"8px"}}>
    <Grid container alignItems="center">
      <Grid item sm>
        <BarcodeScannUndisplayed disabled={loading} onCheckBarcode={handleCheckBarcode}/>
      </Grid>
      <Grid item container sm justify="flex-end">
        <Typography variant="subtitle2">{actionText}</Typography>
      </Grid>
    </Grid>
    <LocateItem ref={scannBarcodeActionRef} {...{action, setAction, loading, setLoading}}/>
    <Divider style={{margin:"1rem 0 1rem"}}/>
    <HistoryActionsList component={(item, index)=><HistoryActionsItemLocateItem key={index} {...{...item}}/>}/>
  </div>
}

export default CreateLabelTemplate

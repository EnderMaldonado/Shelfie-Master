import { Grid, Divider, Typography, IconButton } from '@material-ui/core'

import BarcodeScannUndisplayed from '../Atoms/BarcodeScannUndisplayed'
import CreateLabel from '../Organisms/CreateLabel'
import HistoryActionsList from '../Organisms/HistoryActionsList'
import HistoryActionsItemCreateLabel from '../Molecules/HistoryActionsItemCreateLabel'
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';

const CreateLabelTemplate = ({loading, setLoading, handleCheckBarcode, action,
                              setAction, scannBarcodeActionRef, handleCancell}) => {

  const actionText = action === "SCANN_PRODUCT" ? "Scan the product SKU" : "Scan the Item Label printed"

  return <div style={{padding:"8px"}}>
    <Grid container alignItems="center">
      <Grid item sm>
        <BarcodeScannUndisplayed disabled={loading} onCheckBarcode={handleCheckBarcode}/>
      </Grid>
      <Grid item container sm justify="flex-end">
        <Typography align="center" variant="h6">{actionText}</Typography>
      </Grid>
    </Grid>
    <CreateLabel ref={scannBarcodeActionRef} {...{action, setAction, loading, setLoading, handleCancell}}/>
    <Divider style={{margin:"1rem 0 1rem"}}/>
    <HistoryActionsList component={(item, index)=><HistoryActionsItemCreateLabel key={index} {...{...item, index}}/>}/>
  </div>
}

export default CreateLabelTemplate

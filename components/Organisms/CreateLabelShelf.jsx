import { useState, useEffect, useRef } from "react";
import { TextField, Fab, Button, Typography } from "@material-ui/core"
import PrintIcon from '@material-ui/icons/Print';

import Iframe from '../Molecules/Iframe'
import ShelfFloorLabelFormat from "../Molecules/ShelfFloorLabelFormat";

import { NumberToCharacterLowerAZ } from "../../src/SM_Methods";
import useShelfiMasterMethods from "../customHooks/useShelfiMasterMethods";

const CreateLabelShelf = () => {

  const smM = useShelfiMasterMethods()

  const [shelffNumber, setShelffNumber] = useState("")
  const [qtyFloors, setQtyFloors] = useState("")

  const iframeRef = useRef()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      let addShelfs = await smM().addShelfPlaces(shelffNumber, qtyFloors)
      let iframe = window.document.getElementById("iframe-shelf")
      if(iframe && shelffNumber && qtyFloors)
        iframe.contentWindow.print()
    } catch (error) {
      console.log(error)            
    }
  }

  const getLabels = () => {
    let labels = []

    for (let i = 0; i < qtyFloors; i++) 
      labels.push(
        <ShelfFloorLabelFormat key={i} shelf={shelffNumber} index={i} floor={NumberToCharacterLowerAZ(i)}/>
      )
    
    return labels
  }

  return <>
    <form onSubmit={handleSubmit} style={{padding: "1rem 0"}}>
      <Typography variant="subtitle1" align="center">Print Shelff Labels</Typography>
      <TextField size="small" placeholder="Shelf Number" variant="outlined" value={shelffNumber} onChange={e=>setShelffNumber(e.target.value)} fullWidth/>
      <TextField size="small" placeholder="Floors quantity" variant="outlined" value={qtyFloors} onChange={e=>setQtyFloors(e.target.value)} fullWidth/>
      <Button startIcon={<PrintIcon/>} variant="contained" color="primary" type="submit" fullWidth>
        Print shelf labels
      </Button>
    </form>

    <Iframe id="iframe-shelf" style={{display:"none"}}>
      {getLabels()}
    </Iframe>
  </>  
}

export default CreateLabelShelf
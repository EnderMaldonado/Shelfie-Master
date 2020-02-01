import {useState, useEffect} from 'react'
import { Grid, InputBase, TextField, Paper } from "@material-ui/core"
import SearchIcon from '@material-ui/icons/Search';
import useShelfiMasterMethods from '../customHooks/useShelfiMasterMethods'
import Autocomplete from '@material-ui/lab/Autocomplete'

const AdminShelfFilters = ({shelf, filterText, onChangeFilter}) => {

  const smM = useShelfiMasterMethods()

  const [shelfFilters, setShelfFilters] = useState(null)

  const getFilters = async () => {
    try {
      let sf = await smM().getShelfs()
      setShelfFilters(sf)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(()=>{
    getFilters()
  },[])

  return <Grid container justify="space-around" alignItems="center" spacing={2}>
    <Grid item>
      <Autocomplete
         freeSolo
         id="shelf"
         onInputChange={(o, e)=>onChangeFilter("shelf", e)}
         options={shelfFilters? Object.keys(shelfFilters).map(sf => sf) : []}
         renderInput={params => (
           <TextField {...params}
           value={shelf}
           style={{minWidth:"10rem"}} size="small" variant="outlined"
           type="text" label="Shlef number"/>
         )}
       />
    </Grid>
    <Grid item xs>
      <Paper style={{display: "grid",
        gridTemplateColumns: "max-content auto",
        alignItems: "center"}}>
        <SearchIcon/>
       <InputBase type="text"
       onChange={e=>onChangeFilter("filterText", e.target.value)}
       id="filterText" placeholder="Filter" value={filterText}/>
      </Paper>
    </Grid>
  </Grid>
}

export default AdminShelfFilters

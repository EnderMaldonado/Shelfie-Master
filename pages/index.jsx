import {useEffect, useState, useContext} from 'react'
import useShelfiMasterMethods from '../components/customHooks/useShelfiMasterMethods'

import NavigationContext from '../components/Context/Navigation/NavigationContext'

import CreateLabelsPage from '../components/Pages/CreateLabelsPage'
import LocateItemPage from '../components/Pages/LocateItemPage'
import AdminShelfPage from '../components/Pages/AdminShelfPage'

import SimpleAppBar from '../components/Organisms/SimpleAppBar'
import HandlesContext from '../components/Context/Handles/HandlesContext'
import LoadingBg from '../components/Molecules/LoadingBg'
import LoadingContext from '../components/Context/Loading/LoadingContext'
import { Paper, makeStyles } from '@material-ui/core'

const useStyles = makeStyles( theme => ({
  screenView: {
    display: "grid",
    justifyContent: "stretch",
    overflow: "auto",
    minHeight: "100vh",
    justifyItems: "center",
    backgroundColor: "#f5f5f5"
  },
  paper: {
    display:"grid",
    gridTemplateRows:"auto 1fr",
    width: "100%",
    maxWidth: theme.spacing(100)
  }
}))

const Index = () => {
  const classes = useStyles()

  const [{page}] = useContext(NavigationContext)
  const [{handleKeyDown}] = useContext(HandlesContext)
  const [{loading}] = useContext(LoadingContext)

  const [loadPage, setLoadPage] = useState(false)
  const smM = useShelfiMasterMethods()

  useEffect(()=>{
    setLoadPage(false)
    smM().setShopName()
      .then(() => setLoadPage(true))
  },[])

  const pageNavigation = () => {
    switch (page) {
      case "createLabels":
        return <CreateLabelsPage/>
      case "locateItems":
        return <LocateItemPage/>
      case "adminShelf":
        return <AdminShelfPage/>
      default:
        return null
    }
  }
  
  return loadPage ? <div className={classes.screenView}
  tabIndex="0"
  onKeyDown={e => {   
    if(handleKeyDown)
    handleKeyDown(e.key)
  }}>
    <Paper className={classes.paper} elevation={3}>
      <SimpleAppBar/>
      <LoadingBg open={loading}/>
      {pageNavigation()}
    </Paper>
  </div>
  : 
    <div>Loading . . .</div>

}
export default Index

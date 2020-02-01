import React,{ useEffect, useState } from "react"
import useShelfiMasterMethods from "../customHooks/useShelfiMasterMethods"
import { convertInventoryInShelfFloorItem } from "../../src/SM_Methods"
import { List, ListSubheader, ListItemText, ListItem, makeStyles, LinearProgress , Paper, Typography } from "@material-ui/core"
import AdminShelfListItem from "../Molecules/AdminShelfListItem";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    margin: `${theme.spacing(3)}px ${theme.spacing(1)}px`,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 500,
  },
  listSection: {
    backgroundColor: 'inherit',
    padding: 0,
    width: "100%",
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
    listStyle: "none",
  },
}));

const AdminShelfList = ({shelf, filterText, onClickItem}) => {
  const classes = useStyles();

  const smM = useShelfiMasterMethods()

  const [loading, setLoading] = useState(false)

  const [inventary, setInventary] = useState(null)

  const getShelfItems = async () => {
    try {
      setLoading(true)
      let shelfItems = await smM().getShelfItems(shelf, filterText)
      setInventary(convertInventoryInShelfFloorItem(shelfItems))
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const [refresh, setRefresh] = useState(false)
  const handleRefresh = () => setRefresh(!refresh)

  useEffect(()=>{
    getShelfItems()
  },[shelf, filterText, refresh])

  return <Paper elevation={4}>
    <List className={classes.root} subheader={<li />}>
      {
        inventary && Object.keys(inventary).length ?
        Object.keys(inventary).map((shelf, i) => <li className={classes.listSection} key={"shelf"+i}>
            <ul className={classes.ul}>
              <ListSubheader>SHELF {shelf}</ListSubheader>
                <ListItem>
                  <List className={classes.listSection}>
                    {Object.keys(inventary[shelf]).map((floor,j) => <li className={classes.listSection} key={"floor"+j}>
                        <ul className={classes.ul}>
                          <ListSubheader style={{marginLeft: "3rem"}}>{floor.toUpperCase()}</ListSubheader>
                          {Object.keys(inventary[shelf][floor]).map((itemId,k) =>
                            <AdminShelfListItem button onClick={()=>onClickItem(itemId)}
                            key={"item"+k} {...{...inventary[shelf][floor][itemId], handleRefresh}}/>
                          )}
                        </ul>
                      </li>
                    )}
                  </List>
                </ListItem>
            </ul>
          </li>) : <>
          {loading?<LinearProgress />:null}
          <Typography variant="h3" color="textSecondary">No found items {}</Typography>
          </>
      }
    </List>
  </Paper>

}

export default AdminShelfList

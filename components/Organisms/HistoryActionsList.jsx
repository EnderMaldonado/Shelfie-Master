import { List, Card, makeStyles, Divider, CardHeader, Typography } from "@material-ui/core"
import React,{ useContext, useEffect } from "react"
import ListContext from "../Context/List/ListContext"

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 720,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 500,
    maxWidth: "none"
  },
  card: {
    maxWidth: "40rem"
  }
}))

const HistoryActionsList = ({component}) => {
  const classes = useStyles()

  const [{historyActions}] = useContext(ListContext)

  return historyActions && historyActions.length ?
    <Card className={classes.card}> 
      <List className={classes.root}>
        {historyActions.map((item, i) => component(item, i))}
      </List>
    </Card>
  : null
}

export default HistoryActionsList
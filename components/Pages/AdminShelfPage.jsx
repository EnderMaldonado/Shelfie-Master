import AdminShelfTemplate from "../Templates/AdminShelfTemplate"
import { useState, useEffect, useRef } from "react"
import useShelfiMasterMethods from "../customHooks/useShelfiMasterMethods"

const AdminShelfPage = () => {

  const smM = useShelfiMasterMethods()

  const [shelf, setShelf] = useState("")
  const [filterText, setFilterText] = useState("")

  const handleChangeFilters = (id, e) => {
    switch (id) {
      case "shelf":
        setShelf(e)
        break;
      case "filterText":
        setFilterText(e)
        break;
      default:
        break;
    }
  }

  useEffect(()=>{
    smM().setLoading(false)
  },[])

  return <AdminShelfTemplate {...{shelf, filterText, handleChangeFilters, handleClickItem, refItemInfo}}/>
}

export default AdminShelfPage

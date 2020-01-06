import {useEffect, useState} from 'react'

import useShelfiMasterMethods from '../components/customHooks/useShelfiMasterMethods'
import Main from '../components/Pages/Main'

const Index = () => {

  const [loadPage, setLoadPage] = useState(false)
  const setShopName = useShelfiMasterMethods.Api().setShopName

  useEffect(()=>{
    setLoadPage(false)
    setShopName()
      .then(() => setLoadPage(true))
  },[])

  return loadPage ? <Main/> : "Loading . . ."

}
export default Index

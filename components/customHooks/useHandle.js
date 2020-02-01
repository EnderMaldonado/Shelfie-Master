import { useEffect } from "react"
import useShelfiMasterMethods from "./useShelfiMasterMethods"

const useHandle = (handle, dataUpdate=[]) => {

	const smM = useShelfiMasterMethods()

	useEffect(()=>{
    //Set handle key down...
    smM().setHandle(handle.name, handle.method)
    
    return () => {
      smM().deleteHandle(handle.name)
    }
    
  },dataUpdate)

	return null

}

export default useHandle
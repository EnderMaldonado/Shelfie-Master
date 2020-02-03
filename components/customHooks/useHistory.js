import { useContext } from 'react'
import useFirebase from './useFirebase'
import serverTime from '../../custom_modules/server-time'
import SessionContext from '../Context/Session/SessionContext'

const useHistory = () => {

  const [{user}] = useContext(SessionContext)

  const runner = async (message, id=null, shopify_id=null) => new Promise((resolve, reject) =>
    useFirebase.pushData("history", {id, shopify_id, message, date:serverTime.getDate(), user})
      .then(() => resolve(true))
      .catch(e => {console.log(e);reject(e);}))

  return runner
}

export default useHistory

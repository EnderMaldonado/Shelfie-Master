import { useRef, useState } from "react"
import { useQuery } from "react-apollo"


const useCustomLazyQuery = (query, options) => {
  const ref = useRef()

  const [variables, runQuery] = useState(false)

  ref.current = useQuery(query, {
    ...options,
    variables,
    onCompleted: data => {      
      if(data && options.onCompleted) {
        options.onCompleted(data)
      runQuery(false)
      }
    },
    skip: !variables,
  })

  const runner = (vars) => runQuery(vars)

  return [runner, ref.current]
}

export default useCustomLazyQuery
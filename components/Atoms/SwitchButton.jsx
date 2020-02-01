import { useState, useEffect } from "react"
import {Button} from '@material-ui/core'

const SwitchButton = ({
  onChange, defaultValue=false, text="B Switch", className,
  texts, variations=["contained", "outlined"], colors=["primary","default"],
  startIcons, endIcons, size="medium"
}) => {
  
  const [checked, setChecked] = useState(defaultValue)

  useEffect(()=>{
    if(onChange)
      onChange(checked)
  },[checked])

  const color = checked ? colors[0] : colors[1]
  const titleTooltip = texts ? checked ? texts[0] : texts[1] : text
  const variation = checked ? variations[0] : variations[1]
  const startIcon = startIcons ? checked ? startIcons[0] : startIcons[1] : null
  const endIcon = endIcons ? checked ? endIcons[0] : endIcons[1] : null

  return <Button className={className} variant={variation} color={color} onClick={()=>setChecked(!checked)} 
    startIcon={startIcon} endIcon={endIcon} size={size}>
    {titleTooltip}
  </Button>
}

export default SwitchButton
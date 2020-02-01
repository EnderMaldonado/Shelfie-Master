import { Chip } from "@material-ui/core"
import BoxIcon from '../SvgIcons/BoxIcon'

const PackedChip = ({paquedQuantity}) => paquedQuantity && paquedQuantity.length > 0 ? <Chip
    icon={<BoxIcon/>}
    label={paquedQuantity}
    /> : null

export default PackedChip
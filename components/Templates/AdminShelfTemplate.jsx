import AdminShelfFilters from "../Organisms/AdminShelfFilters"
import AdminShelfList from "../Organisms/AdminShelfList"
import InfoItemDrawer from "../Organisms/InfoItemDrawer"

const AdminShelfTemplate = ({shelf, filterText, handleChangeFilters}) => {

  return <div style={{padding:"16px 8px 0"}}>
    <AdminShelfFilters {...{shelf, filterText, onChangeFilter:handleChangeFilters}}/>
    <AdminShelfList {...{shelf, filterText}}/>
  </div>
}

export default AdminShelfTemplate

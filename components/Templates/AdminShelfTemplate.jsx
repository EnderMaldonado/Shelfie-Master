import AdminShelfFilters from "../Organisms/AdminShelfFilters"
import AdminShelfList from "../Organisms/AdminShelfList"
import InfoItemDrawer from "../Organisms/InfoItemDrawer"

const AdminShelfTemplate = ({shelf, filterText, handleChangeFilters, handleClickItem, refItemInfo}) => {

  return <div style={{padding:"16px 8px 0"}}>
    <AdminShelfFilters {...{shelf, filterText, onChangeFilter:handleChangeFilters}}/>
    <AdminShelfList {...{shelf, filterText}} onClickItem={handleClickItem}/>
    <InfoItemDrawer ref={refItemInfo}/>
  </div>
}

export default AdminShelfTemplate

/* eslint-disable max-len */

const { useSelector, useDispatch } = require('react-redux')
const { useNavigate, NavLink } = require('react-router-dom')
const { getTokenSelector, logOut } = require('../../Redux/slices/userSlice')

function Footer() {
  const userToken = useSelector(getTokenSelector)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogOut = () => {
    dispatch(logOut())
    navigate('/signin')
  }
  return (
    <div className="p-3 position-fixed bottom-0 start-0 header_footer">
      <h1>DOG FOOT</h1>
      <span>
        <NavLink to="/products" className={({ isActive }) => (isActive ? 'btn mx-1 btn-info' : 'btn mx-1 btn-primary')}>
          Каталог
        </NavLink>
        <button className={userToken ? 'btn btn-info mx-2' : 'btn btn-light mx-2'} type="button" onClick={handleLogOut}>Выйти</button>
      </span>
    </div>
  )
}
export default Footer

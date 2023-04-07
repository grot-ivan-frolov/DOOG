import Products from '../Products/Products'
import Search from '../Search/Search'

function Cotolog() {
  console.log()

  return (
    <div style={{ position: 'absolute', top: '120px' }}>
      <Search />
      <Products />
    </div>
  )
}

export default Cotolog

import { useSearchParams } from 'react-router-dom'
// import { FILTERS, FILTER_QUERY_NAME } from './constants'
// import { DangerButton } from './DangerButton'
// import { RegularButton } from './RegularButton'

export function Filters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const FILTERS = ['Дороже', 'Дешевле', 'Скидки', 'Новинки', 'Популярное']

  const clickFilterHandler = (filterName) => {
    const currentFilterName = searchParams.get('filterName')
    if (currentFilterName && currentFilterName.length && currentFilterName === filterName) {
      setSearchParams('', filterName)
    } else {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        filterName,
      })
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center gap-4 mb-2">
      {FILTERS.map((filter) => (
        <FilterItem key={filter} filterName={filter} clickFilterHandler={clickFilterHandler} />))}
    </div>
  )
}

export function FilterItem({ filterName, clickFilterHandler }) {
  const [searchParams] = useSearchParams()
  const currentFilterName = searchParams.get('filterName')

  return (
    <button
      type="button"
      className={filterName === currentFilterName ? 'btn btn-info' : 'btn btn-light'}
      onClick={() => clickFilterHandler(filterName)}
    >
      {filterName}
    </button>
  )
}

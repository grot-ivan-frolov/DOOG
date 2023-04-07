import { useSearchParams } from 'react-router-dom'

export function Filters() {
  const [searchParams, setSearchParams] = useSearchParams()
  const FILTERS = ['Дороже', 'Дешевле', 'Новинки', 'Скидки', 'Популярные']
  const clickFilterHadler = (filterName) => {
    const currentFilterName = searchParams.get('filterName')
    if (currentFilterName && currentFilterName.length && currentFilterName === filterName) {
      setSearchParams('', filterName)
    } else {
      setSearchParams({
        ...Object.fromEntries(setSearchParams.entries()),
        filterName,
      })
    }
  }
  return (
    <div className="d-flex align-items-center justify-content-center gap-4 mb-2">
      {FILTERS.map((filter) => (
        <FilterItem key={filter} filterName={filter} clickFilterHadler={clickFilterHadler} />))}
    </div>
  )
}
export function FilterItem({ filterName, clickFilterHadler }) {
  const [searchParams] = useSearchParams()
  const currentFilterName = searchParams.get('filterName')

  return (
    <button
      type="button"
      className={filterName === currentFilterName ? 'btn btn-info' : 'btn btn-light'}
      onClick={() => clickFilterHadler(filterName)}
    >
      {filterName}
    </button>
  )
}

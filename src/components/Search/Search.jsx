import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeSearchFilter } from '../../Redux/slices/filterSlice'

import { useDebounce } from '../Hooks/useDebounce'

function Search() {
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const debouncedSearchValue = useDebounce(search, 750)
  const searchHandler = (e) => {
    const newSearchValue = e.target.value
    setSearch(newSearchValue)
  }

  useEffect(() => {
    dispatch(changeSearchFilter(debouncedSearchValue))
  }, [dispatch, debouncedSearchValue])

  return (
    <input
      placeholder="Поиск"
      type="text"
      className="form-control"
      style={{ width: '500px', margin: '24px auto' }}
      value={search}
      onChange={searchHandler}
    />
  )
}

export default Search

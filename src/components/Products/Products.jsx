/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import { isError, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { DogFoodApiConst } from '../../api/DogFoodapi'
import { getTokenSelector } from '../../Redux/slices/userSlice'
import { getQuerySearchKey } from './reguest'
import withQuery from './withQuery'
import Styles from './products.module.css'
import ProductsItem from '../ProductsItem/ProductsItem'
import { getSearchSelector } from '../../Redux/slices/filterSlice'
import { Filters } from '../Filters/Filters'

function ProductsInner({ data }) {
  let products = [...data]
  const [searchParams] = useSearchParams()
  const currentFilterName = searchParams.get('filterName')
  switch (currentFilterName) {
    case null:
      products = [...data]
      break
    case 'Новинки':
      products = products.sort((item, nextItem) => {
        const itemTime = new Date(Date.parse(item.updated_at))
        const nextItemTime = new Date(Date.parse(nextItem.updated_at))
        if (itemTime > nextItemTime) {
          return -1
        }
        if (itemTime < nextItemTime) {
          return 1
        }
        return 0
      })
      break
    case 'Скидки':
      products = products.filter((item) => item.discount > 0).sort((item, nextItem) => {
        if (item.discount > nextItem.discount) {
          return -1
        }
        if (item.discount < nextItem.discount) {
          return 1
        }
        return 0
      })
      break
    case 'Дороже':
      products = products.sort((item, nextItem) => {
        if (item.price > nextItem.price) {
          return -1
        }
        if (item.price < nextItem.price) {
          return 1
        }
        return 0
      })
      break
    case 'Дешевле':
      products = products.sort((item, nextItem) => {
        if (item.price < nextItem.price) {
          return -1
        }
        if (item.price > nextItem.price) {
          return 1
        }
        return 0
      })
      break
    case 'Популярное':
      products = products.sort((item, nextItem) => {
        if (item.likes.length > nextItem.likes.length) {
          return -1
        }
        if (item.likes.length < nextItem.likes.length) {
          return 1
        }
        return 0
      })
      break

    default:
      break
  }
  return (
    <>
      <Filters />
      <div className={Styles.products}>
        {products[0] && (
          products.map((product) => (
            <ProductsItem
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
              pictures={product.pictures}
              discount={product.discount}
              weight={product.wight}
            />
          ))
        )}

        {!products[0] && products.length && (
        <h4 className="card-header">По вашему запросу ничего не найдено</h4>
        )}
      </div>
    </>
  )
}

const ProductsInnerWithQuery = withQuery(ProductsInner)

function Products() {
  const userToken = useSelector(getTokenSelector)
  const navigate = useNavigate()

  useEffect(() => {
    if (!userToken) {
      navigate('/signin')
    }
  }, [navigate, userToken])

  const search = useSelector(getSearchSelector)
  const {
    data, isLoading, error, refetch,
  } = useQuery({
    queryKey: getQuerySearchKey(search),
    queryFn: () => DogFoodApiConst.getAllProducts(search, userToken),
    enabled: !!(userToken),
  })

  return <ProductsInnerWithQuery data={data} isLoading={isLoading} isError={isError} refetch={refetch} error={error} />
}

export default Products

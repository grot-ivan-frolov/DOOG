/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import { isError, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DogFoodApiConst } from '../../api/DogFoodapi'
import { getTokenSelector } from '../../Redux/slices/userSlice'
import { getQuerySearchKey } from './reguest'
import withQuery from './withQuery'
import Styles from './products.module.css'
import ProductsItem from '../ProductsItem/ProductsItem'
import { getSearchSelector } from '../../Redux/slices/filterSlice'

function ProductsInner({ data }) {
  const products = data
  return (

    <div className={Styles.products}>
      {products[0] && (
        products.map((product) => (
          <ProductsItem
            key={product._id}
            id={product._id}
            name={product.name}
            price={product.price}
            pictures={product.pictures}
          />
        ))
      )}

      {!products[0] && products.length && (
        <h4 className="card-header">По вашему запросу ничего не найдено</h4>
      )}
    </div>
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

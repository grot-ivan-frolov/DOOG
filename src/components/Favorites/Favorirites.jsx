/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import '../../index.css'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { DogFoodApiConst } from '../../api/DogFoodapi'
import Loader from '../Loader/Loader'
import { getQueryCartKey } from '../Products/utils'
import FavoriteItem from '../FavoriteItem/FavoriteItem'
import { clearFavorites, getAllFavoriteProductsSelector } from '../../Redux/slices/favoriteSlice'
import { getTokenSelector } from '../../Redux/slices/userSlice'

function FavoritesPage() {
  const favorites = useSelector(getAllFavoriteProductsSelector)
  const userToken = useSelector(getTokenSelector)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (!userToken) {
      navigate('/signin')
    }
  }, [userToken])
  const {
    data: favoriteProducts, isLoading, isError, error,
  } = useQuery({
    queryKey: [getQueryCartKey(favorites.length)],
    queryFn: () => DogFoodApiConst.getProductsByIds(favorites, userToken),
    enabled: !!(userToken),
  })
  const clearFavoritesHandler = () => {
    dispatch(clearFavorites())
  }
  if (isLoading) return <Loader />
  if (isError) return <p>{`${error} `}</p>

  return (
    <div style={{ width: '100%', paddingBottom: '70px' }}>
      {!favorites[0] && (
      <div className="d-flex align-items-center justify-content-center flex-column mt-5">
        <h1>Вы ещё ничего не выбрали</h1>
        <Link to="/products">
          <motion.button
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{
              scale: 0.9,
            }}
            type="button"
            className="btn btn-primary mt-4"
          >
            перейти к покупкам
          </motion.button>

        </Link>
      </div>
      )}

      {favoriteProducts[0] && (
        <div className="d-flex flex-column gap-3 p-4  align-items-center">
          <button type="button" className="btn btn-primary mt-4" onClick={clearFavoritesHandler}>
            Очистить
          </button>
          <ul
            className="d-flex flex-column gap-3 p-2  align-items-center justify-content-space-between"
            style={{ maxWidth: '800px', minWidth: '700px' }}
          >
            {favoriteProducts.map((item) => (
              <FavoriteItem
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                pictures={item.pictures}
                stock={item.stock}
                discount={item.discount}
                description={item.description}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default FavoritesPage

/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import detailStyles from './detailPage.module.css'
import { DogFoodApiConst } from '../../api/DogFoodapi'
import { getQueryProductKey } from '../Products/utils'
import { getTokenSelector, getUserSelector } from '../../Redux/slices/userSlice'
import { addFavorite, getAllFavoriteProductsSelector, removeFavorite } from '../../Redux/slices/favoriteSlice'
import { addNewProduct, deleteProduct, getAllCartProductsSelector } from '../../Redux/slices/cartSlice'
import Loader from '../Loader/Loader'
import pen from '../Image/pen.png'
import DeleteProductModal from './DeleteProductModal'
import EditProductModal from './EditProductModal'
import trash from '../Image/trash.png'
import Comments from './Comments'

function DetailPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const navigate = useNavigate()
  const userToken = useSelector(getTokenSelector)
  const { email } = useSelector(getUserSelector)
  const favorites = useSelector(getAllFavoriteProductsSelector)
  const cartProducts = useSelector(getAllCartProductsSelector)
  useEffect(() => {
    if (!userToken) {
      navigate('/signin')
    }
  }, [userToken])

  const {
    data, isLoading, isError, error,
  } = useQuery({
    queryKey: getQueryProductKey(id),
    queryFn: () => DogFoodApiConst.getProduct(id, userToken),
    enabled: !!(userToken),
  })
  const openDeleteModalHandler = () => {
    setIsDeleteModalOpen(true)
  }
  const openEditModalHandler = () => {
    setIsEditModalOpen(true)
  }
  const moveToCartHandler = () => {
    dispatch(addNewProduct(id))
  }
  const removeFromCartHandler = () => {
    dispatch(deleteProduct(id))
  }
  if (isLoading) return <Loader />
  if (isError) return <p>{`${error} `}</p>

  const isInCart = (productListId) => cartProducts.find((product) => product.id === productListId)
  const isAuthor = (email === data.author.email)
  return (
    <>
      <div className="card m-5" style={{ width: '80%', maxWidth: '550px' }}>
        <div className="d-flex flex-column" style={{ width: '100%' }}>
          <h5 className="card-header">
            {data.name}
          </h5>
          {favorites.includes(id) && (
          <button
            type="button"
            className="heart_icon-red btn btn-light"
            onClick={() => { dispatch(removeFavorite(id)) }}
          />
          )}
          {!favorites.includes(id) && (
          <button
            type="button"
            className="heart_icon-black btn btn-light"
            onClick={() => { dispatch(addFavorite(id)) }}
          />
          )}
          <div className="card-body">
            <div className="d-flex flex-row gap-2">
              <div className="card-body">
                <div className="d-flex flex-row gap-3">
                  <h5 className="card-title">
                    {data.discount > 0 && `${((data.price * (100 - data.discount)) / 100)} ₽`}
                    {data.discount === 0 && `${data.price} ₽`}
                  </h5>
                  {data.discount > 0 && (
                    <h6 className="card-title" style={{ textDecoration: 'line-through', color: 'gray' }}>
                      {data.price}
                      ₽
                    </h6>
                  )}
                </div>
                <p className="card-text mt-2">{data.description}</p>
                <p className="card-text">
                  <b>В наличии:</b>
                  {' '}
                  {data.stock}
                </p>
                <p className="card-text">
                  <b>Вес:</b>
                  {' '}
                  {data.wight}

                </p>
              </div>
              <img src={data.pictures} className={detailStyles.product_picture} alt="product" />
            </div>
            <div className="d-flex flex-row gap-4 px-3">
              {isAuthor && (
                <>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={openDeleteModalHandler}
                  >
                    <img src={trash} alt="delete" className={detailStyles.trash} />
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={openEditModalHandler}
                  >
                    <img src={pen} alt="edit" style={{ width: '25px', height: '25px' }} />
                  </button>

                </>
              )}
              <button
                type="button"
                className={isInCart(id) ? 'button__cart-done btn btn-primary' : 'button__cart-cart btn btn-primary'}
                onClick={isInCart(id) ? removeFromCartHandler : moveToCartHandler}
              />
            </div>
          </div>
          <EditProductModal
            isOpen={isEditModalOpen}
            setIsEditModalOpen={setIsEditModalOpen}
            name={data.name}
            id={id}
            pictures={data.pictures}
            description={data.description}
            available={data.available}
            stock={data.stock}
            price={data.price}
            discount={data.discount}
            wight={data.wight}
          />
          <DeleteProductModal
            isOpen={isDeleteModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            title={data.name}
            id={id}
          />
        </div>
      </div>
      <Comments id={id} />

    </>
  )
}

export default DetailPage

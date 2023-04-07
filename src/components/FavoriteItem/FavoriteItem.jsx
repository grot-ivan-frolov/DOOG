/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addNewProduct, deleteProduct, getAllCartProductsSelector } from '../../Redux/slices/cartSlice'
import { removeFavorite } from '../../Redux/slices/favoriteSlice'
import smallHeart from '../Image/herd.jpg'
import cart from '../Image/basket.jpg'
import done from '../Image/done.svg'
import Styles from './favoriteItem.module.css'

function FavoriteItem({
  name, pictures, price, id, description, stock, discount,
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartProducts = useSelector(getAllCartProductsSelector)
  const moveToCartHandler = () => {
    dispatch(addNewProduct(id))
  }
  const removeFromCartHandler = () => {
    dispatch(deleteProduct(id))
  }
  const navigateToDetailsHandler = (event) => {
    const { label } = event.target.dataset
    if (label !== 'notNavigate') navigate(`/product/${id}`)
  }
  const isInCart = (productListId) => cartProducts.find((product) => product.id === productListId)
  return (
    <li
      onClick={navigateToDetailsHandler}
      className="card"
      style={{ width: '100%', cursor: 'pointer' }}
    >
      <h5 className="card-header" style={{ height: '65px' }}>
        {name}
      </h5>
      <div className="card-body">
        <div className="d-flex flex-row gap-2">
          <div className="card-body">
            <div className="d-flex flex-row gap-3">
              <h5 className="card-title">
                {discount > 0 && `${((price * (100 - discount)) / 100)} ₽`}
                {discount === 0 && `${price} ₽`}
              </h5>
              {discount > 0 && (
                <h6 className="card-title" style={{ textDecoration: 'line-through', color: 'gray' }}>
                  {price}
                  ₽
                </h6>
              )}
            </div>
            <p className="card-text">{description}</p>
            <p className="card-text">
              В наличии:
              {' '}
              {stock}
            </p>
            <div className="d-flex flex-row gap-4 align-items-center">
              <img
                data-label="notNavigate"
                src={smallHeart}
                style={{ width: '40px', height: '40px' }}
                alt="not favorite"
                onClick={() => { dispatch(removeFavorite(id)) }}
              />
              <button
                type="button"
                data-label="notNavigate"
                className="btn btn-primary"
                onClick={isInCart(id) ? removeFromCartHandler : moveToCartHandler}
              >
                {isInCart(id) ? (
                  <img className={Styles.number_icon} src={done} alt="done" data-label="notNavigate" />
                ) : (
                  <img className={Styles.number_icon} src={cart} alt="cart" data-label="notNavigate" />
                )}
              </button>
            </div>
          </div>
          <img src={pictures} className={Styles.product_picture} alt="product" />
        </div>
      </div>
    </li>
  )
}

export default FavoriteItem

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable max-len */
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addNewProduct, deleteProduct, getAllCartProductsSelector } from '../../Redux/slices/cartSlice'
import productStyle from './productsItem.module.css'
import redHeart from '../Image/herd.jpg'
import smallHeart from '../Image/smallHeart.png'
import { addFavorite, getAllFavoriteProductsSelector, removeFavorite } from '../../Redux/slices/favoriteSlice'

function ProductsItem({
  pictures, name, price, id, discount, wieght,
}) {
  const cartProducts = useSelector(getAllCartProductsSelector)
  const favorites = useSelector(getAllFavoriteProductsSelector)
  const navigate = useNavigate
  const dispatch = useDispatch()
  const moveToCartHandler = () => {
    dispatch(addNewProduct(id))
  }
  const removeFromCartHandler = () => {
    dispatch(deleteProduct(id))
  }

  const navigateToDetailsHandler = (event) => {
    if (event.target.dataset.label !== 'notNovigate') navigate(`/product/${id}`)
  }

  const isInCart = (productListId) => cartProducts.find((product) => product.id === productListId)
  return (
    <li
      className="card m-3 product_card p-2"
      onClick={navigateToDetailsHandler}
    >

      <div className={productStyle.container}>

        <img src={pictures} className={productStyle.image} alt="product" />

        {favorites.includes(id) && (

        <img
          src={redHeart}
          className={productStyle.favorite}
          alt="favorite"
          data-label="notNavigate"
          onClick={() => { dispatch(removeFavorite(id)) }}
        />
        )}
        {!favorites.includes(id) && (
        <img
          src={smallHeart}
          className={productStyle.favorite}
          alt="not favorite"
          data-label="notNavigate"
          onClick={() => { dispatch(addFavorite(id)) }}
        />
        )}
        <div className={productStyle.card_body}>
          <h2 className={productStyle.product}>{name}</h2>
          <b className={productStyle.card_price}>
            {price}
            {' '}
          </b>
          {discount > 0 && (
          <span className="badge rounded-pill bg-info text-dark">

            -

              {' '}
            {discount}
            {' '}
            %
          </span>
          )}
        </div>
        <small className="mb-3">{wieght}</small>

        <button type="button" data-label="notNavigate" className="btn btn-primary" onClick={isInCart(id) ? removeFromCartHandler : moveToCartHandler}>
          {isInCart(id) ? (

            <button type="button" className={productStyle.card_icon}>Добавлено</button>
          ) : (
            <button type="button" className={productStyle.card_icon}>В корзину</button>
          )}
        </button>
      </div>
    </li>
  )
}

export default ProductsItem

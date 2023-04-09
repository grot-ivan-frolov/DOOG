/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { DogFoodApiConst } from '../../api/DogFoodapi'
import {
  clearCart, getAllCartProductsSelector, notPickAllProducts, pickAllProducts,
} from '../../Redux/slices/cartSlice'
import { getTokenSelector } from '../../Redux/slices/userSlice'
import { CartItem } from '../CartItem/CartItem'
import Loader from '../Loader/Loader'
import { getQueryCartKey } from '../Products/reguest'

function Cart() {
  const cart = useSelector(getAllCartProductsSelector)
  const userToken = useSelector(getTokenSelector)
  const dispatch = useDispatch()
  const navigate = useNavigate
  const getKey = cart.map((item) => item.id).toString()
  useEffect(() => {
    if (!userToken) {
      navigate('/signin')
    }
  }, [userToken])

  const {
    data: cartProducts, isLoading, isError, error,
  } = useQuery({
    queryKey: [getQueryCartKey(getKey)],
    queryFn: () => DogFoodApiConst.getProductsByIds(cart.map((product) => product.id), userToken),
    enabled: !!(userToken),
  })

  const cleartCartHandler = () => {
    dispatch(clearCart())
  }
  if (cartProducts) {
    const isAllCardPicked = () => (cart.filter((item) => (item.isPicked === true)).length === cart.length)
    const findAllPickedProducts = () => {
      const allPickedProducts = []
      cart.forEach((item) => {
        if (item.isPicked === true) allPickedProducts.push(item)
      })
      return allPickedProducts
    }
    const getCartProductById = (idItem) => cartProducts.find((product) => product._id === idItem)
    const getAllCartStateProductById = (idItem) => cart.find((product) => product.id === idItem)
    const pickAllroductsHandler = () => {
      console.log({ isAllCardPicked })
      if (!isAllCardPicked()) dispatch(pickAllProducts())
      else dispatch(notPickAllProducts())
    }
    const calculateSum = () => findAllPickedProducts().reduce((sum, product) => {
      const updateSum = sum + product.count * getCartProductById(product.id).price
      return Math.ceil(updateSum)
    }, 0)

    const calculateDiscount = () => findAllPickedProducts().reduce((sum, product) => {
      const updateSum = sum + product.count * getCartProductById(product.id).price * (getCartProductById(product.id).discount / 100)
      return Math.ceil(updateSum)
    }, 0)
    const calculateSumWithDiscount = () => findAllPickedProducts().reduce((sum, product) => {
      const updateSum = sum + product.count * getCartProductById(product.id).price * ((100 - getCartProductById(product.id).discount) / 100)

      return Math.ceil(updateSum)
    }, 0)

    if (isLoading) return <Loader />
    if (isError) return <p>{`${error}`}</p>

    return (

      <div style={{ width: '100%' }} className="d-flex align-items-center justify-content-center">
        { !cart[0] && (
        <div className="d-flex align-items-center justify-content-center flex-column mt-5">
          <h2>Ваша корзина пустая</h2>
          <Link to="/products">
            <button type="button" className="btn btn-primary mt-4">Перейти к покупкам</button>
          </Link>
        </div>
        )}
        {cartProducts[0] && (
        <div className="d-flex flex-row justify-content-between" style={{ width: '70%', marginBottom: '100px' }}>
          <div className="d-flex p-2 flex-column" style={{ width: '70%' }}>
            <div className="d-flex p-4 flex-row gap-2 align-items-center  justify-content-between">
              <span className="d-flex flex-row gap-2">
                <input id="select_all" type="checkbox" checked={isAllCardPicked()} onChange={pickAllroductsHandler} />
                <label htmlFor="select_all">Выбрать все</label>
              </span>
              <button type="button" className="btn btn-primary mt-4" onClick={cleartCartHandler}>Очистить</button>
            </div>
            <ul className="d-flex flex-column gap-3 p-2  align-items-start justify-content-start">
              {cartProducts.map((item) => (
                <CartItem
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  pictures={item.pictures}
                  stock={item.stock}
                  discount={item.discount}
                  description={item.description}
                  isPicked={getAllCartStateProductById(item._id)?.isPicked}
                  count={getAllCartStateProductById(item._id)?.count}
                />

              ))}
            </ul>
          </div>
          <div style={{ width: '40%' }} className="d-flex flex-column gap-3 m-3">
            <h4>Информация о заказе:</h4>
            <p>
              Сумма:
              {' '}
              {calculateSum() || 0}
              {' '}
              руб.
            </p>
            <p>
              Скидка:
              {' '}
              руб.
              {calculateDiscount() || 0}
              {' '}
              руб.
            </p>
            <h4>
              К оплате:
              {' '}
              {calculateSumWithDiscount() || 0}
              {' '}
              руб.
            </h4>
            <button type="button" className="btn btn-primary mt-4">Оформить заказ</button>
          </div>
        </div>
        )}
      </div>
    )
  }
}
export default Cart

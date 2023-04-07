/* eslint-disable max-len */
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Styles from './cartItem.module.css'
import minus from '../Image/minus.svg'
import plus from '../Image/plus.svg'
import { changeIsPickProduct, productDecrement, productIncrement } from '../../Redux/slices/cartSlice'
import DeleteItemModal from './DeleteItemModal'

export function CartItem({
  name, pictures, price, id, description, stock, discount, isPicked, count,
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const openDeleteModalHandler = () => {
    setIsDeleteModalOpen(true)
  }

  const selectProductHandler = () => {
    dispatch(changeIsPickProduct(id))
  }
  const navigateToDetailsHandler = (event) => {
    if (event.target.dataset.label !== 'notNavigate') navigate(`/product/${id}`)
  }
  const incrementCountHandler = () => {
    if (count < stock) { dispatch(productIncrement(id)) }
  }
  const decrementCountHandler = () => {
    if (count > 0) { dispatch(productDecrement(id)) }
  }
  return (
    <li
      role="presentation"
      className="card"
      style={{ width: '100%', cursor: 'pointer' }}
      onClick={navigateToDetailsHandler}

    >

      <h5 className="card-header">
        <input
          type="checkbox"
          checked={isPicked}
          style={{ marginRight: '10px' }}
          onChange={selectProductHandler}
          data-label="notNavigate"
        />
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
          </div>
          <img src={pictures} className={Styles.product_picture} alt="product" />
        </div>
        <div className="d-flex flex-row gap-4 px-3">
          <div className="d-flex flex-row gap-2 px-2 align-items-center">
            <button
              type="button"
              className="btn btn-light"
              onClick={decrementCountHandler}
              data-
              label="notNavigate"
            >
              <img src={minus} alt="minus" className={Styles.number_icon} data-label="notNavigate" />
            </button>

            <h4 data-label="notNavigate">{count}</h4>
            <button
              type="button"
              className="btn btn-light"
              onClick={incrementCountHandler}
              data-
              label="notNavigate"
            >
              <img src={plus} alt="plus" data-label="notNavigate" className={Styles.number_icon} />
            </button>
          </div>
          <button
            type="button"
            data-label="notNavigate"
            className="btn btn-primary"
            onClick={openDeleteModalHandler}
          >
            Удалить

          </button>
        </div>
      </div>
      <DeleteItemModal
        isOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        title={name}
        id={id}
      />
    </li>
  )
}

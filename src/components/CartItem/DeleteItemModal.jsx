import { useDispatch } from 'react-redux'
import { deleteProduct } from '../../Redux/slices/cartSlice'
import Modal from '../Modal/Modal'

function DeleteItemModal({
  setIsDeleteModalOpen, isOpen, id, title,

}) {
  const dispatch = useDispatch()
  const deleteHandler = () => {
    dispatch(deleteProduct(id))
  }
  const closeDeleteModalHandler = () => {
    setIsDeleteModalOpen(false)
  }
  return (
    <Modal isOpen={isOpen} closeHandler={closeDeleteModalHandler}>
      <p>Удалить этот товар из корзины?</p>
      {' '}
      <b>
        {title}
      </b>
      <div className="d-flex justify-content-around align-items-center mt-4">
        <button
          type="button"
          data-label="notNavigate"
          className="btn btn-success mx-2"
          onClick={closeDeleteModalHandler}
        >
          Отмена
        </button>
        <button
          onClick={deleteHandler}
          type="submit"
          className="btn btn-danger mx-2"
          data-label="notNavigate"
        >
          Удалить
        </button>
      </div>
    </Modal>
  )
}
export default DeleteItemModal

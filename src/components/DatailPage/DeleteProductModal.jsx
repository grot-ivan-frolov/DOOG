/* eslint-disable react/function-component-definition */
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DogFoodApiConst } from '../../api/DogFoodapi'
import { deleteProduct } from '../../Redux/slices/cartSlice'
import { removeFavorite } from '../../Redux/slices/favoriteSlice'
import { getTokenSelector } from '../../Redux/slices/userSlice'
import Loader from '../Loader/Loader'
import Modal from '../Modal/Modal'
import SuccessModal from './SuccessModal'
// import SuccessModal from './SuccessModal'

const DeleteProductModal = ({
  setIsDeleteModalOpen, isOpen, id, title,
}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [action, setAction] = useState('')
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const userToken = useSelector(getTokenSelector)
  const {
    mutateAsync, isLoading, isError, error,
  } = useMutation({
    mutationFn: () => DogFoodApiConst.deleteProduct(id, userToken)
      .then(() => {
        setAction('удалили')
        setIsSuccessModalOpen(true)
      }),
  })

  const closeDeleteModalHandler = () => {
    setIsDeleteModalOpen(false)
  }
  const deleteHandler = async () => {
    dispatch(deleteProduct(id))
    dispatch(removeFavorite(id))
    await mutateAsync()
    navigate('/products')
  }
  if (isLoading) return <Loader />
  if (isError) return <p>{`${error} `}</p>

  return (
    <Modal isOpen={isOpen} closeHandler={closeDeleteModalHandler}>
      <p>
        Xотите удалить этот товар?
      </p>
      {' '}
      <b>
        &quot;
        {title}
        &quot;
      </b>
      <div className="d-flex justify-content-around align-items-center mt-4">
        <button
          type="button"
          data-label="notNavigate"
          className="btn btn-success mx-2"
          onClick={closeDeleteModalHandler}
        >
          Cancel
        </button>
        <button
          onClick={deleteHandler}
          type="submit"
          className="btn btn-danger mx-2"
          data-label="notNavigate"
        >
          Delete
        </button>
      </div>
      <SuccessModal
        isOpen={isSuccessModalOpen}
        setIsSuccessModalOpen={setIsSuccessModalOpen}
        action={action}
      />
    </Modal>
  )
}

export default DeleteProductModal

/* eslint-disable react/function-component-definition */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useMutation } from '@tanstack/react-query'
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DogFoodApiConst } from '../../api/DogFoodapi'
import Loader from '../Loader/Loader'
import Modal from '../Modal/Modal'
import { getTokenSelector } from '../../Redux/slices/userSlice'
import { ProductValidationSchema } from '../UserPage/validator'

const AddProductModal = ({
  setIsAddModalOpen, isOpen,
}) => {
  const navigate = useNavigate()
  const userToken = useSelector(getTokenSelector)
  const closeAddModalHandler = () => {
    setIsAddModalOpen(false)
  }
  const {
    mutateAsync, isLoading, isError, error,
  } = useMutation({
    mutationFn: (dataEdit) => DogFoodApiConst.addProduct(dataEdit, userToken)
      .then((data) => {
        setIsAddModalOpen(false)
        navigate(`/product/${data._id}`)
      }),
  })
  const initialValues = {
    available: true,
    pictures: '',
    name: '',
    price: '',
    discount: 0,
    stock: 0,
    wight: '',
    description: '',

  }
  const handleSubmit = async (values) => {
    await mutateAsync(values)
  }
  if (isLoading) return <Loader />
  if (isError) return <p>{`${error} `}</p>
  return (
    <Modal isOpen={isOpen} closeHandler={closeAddModalHandler}>
      <h1>Введите данные о товаре</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={ProductValidationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        <Form className="d-flex flex-column" style={{ width: '100%' }}>
          <label>
            Введите название товара
            <Field className="mb-2 form-control" name="name" type="text" />
            <ErrorMessage component="p" className="error" name="name" />
          </label>
          <label>
            Введите описание товара
            <Field className="mb-2 form-control" name="description" type="text" />
            <ErrorMessage component="p" className="error" name="description" />
          </label>
          <label>
            Введите ссылку на фото товара c окончанием .jpg
            <Field className="mb-2 form-control" name="pictures" type="text" />
            <ErrorMessage component="p" className="error" name="pictures" />
          </label>
          <label>
            Введите цену товара
            <Field className="mb-2 form-control" name="price" type="number" />
            <ErrorMessage component="p" className="error" name="price" />
          </label>
          <label>
            Введите скидку %
            <Field className="mb-2 form-control" name="discount" type="number" />
            <ErrorMessage component="p" className="error" name="discount" />
          </label>
          <label>
            Введите количество товара в наличии
            <Field className="mb-2 form-control" name="stock" type="number" />
            <ErrorMessage component="p" className="error" name="stock" />
          </label>

          <label>
            Введите вес товара
            <Field className="mb-2 form-control" name="wight" type="text" />
            <ErrorMessage component="p" className="error" name="wight" />
          </label>

          <div className="d-flex justify-content-around align-items-center mt-4">
            <label>
              <Field type="checkbox" name="available" />
              {' '}
              Доступно
            </label>
            <button
              type="button"
              data-label="notNavigate"
              className="btn btn-success mx-2"
              onClick={closeAddModalHandler}
            >
              Отменить
            </button>
            <button type="submit" className="btn btn-primary mx-2">
              Сохранить
            </button>
          </div>
        </Form>
      </Formik>
    </Modal>
  )
}

export default AddProductModal

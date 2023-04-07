/* eslint-disable react/no-array-index-key */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import { useState } from 'react'
import dayjs from 'dayjs'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import { useSelector } from 'react-redux'
import '../../index.css'
import { DogFoodApiConst } from '../../api/DogFoodapi'
import Loader from '../Loader/Loader'
import { getQueryCommentsKey } from '../Products/utils'
import { getTokenSelector, getUserSelector } from '../../Redux/slices/userSlice'
import { CommentFormValidationSchema } from '../UserPage/validator'
import trash from '../Image/trash.png'
import favoriteStyles from './detailPage.module.css'

function StarRating({ rating, setRating }) {
  const [hover, setHover] = useState(0)
  return (
    <div className="star-rating mb-2">
      {[...Array(5)].map((star, index) => {
        index += 1
        return (
          <button
            type="button"
            key={index}
            style={{
              backgroundColor: 'white', border: 'none', outline: 'none', cursor: 'pointer',
            }}
            className={index <= (hover || rating) ? 'on' : 'off'}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className={star}>&#9733;</span>
          </button>
        )
      })}
    </div>
  )
}

function Comments({ id }) {
  const userToken = useSelector(getTokenSelector)
  const { email } = useSelector(getUserSelector)
  const queryClient = useQueryClient()
  const [rating, setRating] = useState(5)
  const initialValues = {
    text: '',
    rating,
  }
  const {
    data, isLoading, isError, error,
  } = useQuery({
    queryKey: getQueryCommentsKey(),
    queryFn: () => DogFoodApiConst.getComments(id, userToken),
    enabled: !!(userToken),
  })

  const {
    mutateAsync, isLoading: isEditLoading, isError: isEditError, error: errorEdit,
  } = useMutation({
    mutationFn: (comment) => DogFoodApiConst.addComment(id, comment, userToken)
      .then(() => queryClient.invalidateQueries({ queryKey: getQueryCommentsKey() })),
  })

  const {
    mutateAsync: mutateDeleteAsync, isLoading: isDeleteLoading, isError: isDeleteError, error: errorDelete,
  } = useMutation({
    mutationFn: (reviewId) => DogFoodApiConst.deleteComment(id, reviewId, userToken)
      .then(() => queryClient.invalidateQueries({ queryKey: getQueryCommentsKey() })),
  })

  const handleSubmit = async (values) => {
    await mutateAsync({ ...values, rating })
  }

  const handleDelete = async (reviewId) => {
    await mutateDeleteAsync(reviewId)
  }
  if (isLoading || isEditLoading || isDeleteLoading) return <Loader />
  if (isError) return <p>{`${error} `}</p>
  if (isEditError) return <p>{`${errorEdit} `}</p>
  if (isDeleteError) return <p>{`${errorDelete} `}</p>

  return (
    <div className="d-flex flex-column" style={{ width: '70%', paddingBottom: '90px', maxWidth: '600px' }}>
      <h5>Отзывы</h5>
      <Formik
        initialValues={initialValues}
        validationSchema={CommentFormValidationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        <Form className="d-flex flex-column">
          <Field
            className="mb-3 form-control"
            name="text"
            type="text"
            placeholder="Оставьте свой отзыв"
          />
          <ErrorMessage component="p" className="error" name="text" />
          <div className="d-flex flex-row justify-content-between">
            <StarRating rating={rating} setRating={setRating} />
            <button type="submit" disabled={isLoading} className="btn btn-primary">
              Сохранить
            </button>
          </div>
        </Form>
      </Formik>
      {data.map((item) => (
        <div className="comment mt-2 text-justify float-left" key={item.created_at}>
          <div className="d-flex flex-row gap-2 mb-1">
            <img src={item.author.avatar} alt="" className="rounded-circle" width="40" height="40" />
            <h4>{item.author.name}</h4>
          </div>
          <small>{dayjs(item.created_at).format('YYYY-MM-DD HH:mm:ss')}</small>
          <br />
          <div className="d-flex flex-row justify-content-between align-items-center mb-1">
            <p>{item.text}</p>
            {item.author.email === email && (
            <button onClick={() => handleDelete(item._id)} className="btn" type="button">
              <img src={trash} className={favoriteStyles.trash} alt="delete" />
            </button>
            )}
          </div>
          <StarRating rating={item.rating} setRating={setRating} />
        </div>
      ))}
    </div>
  )
}

export default Comments

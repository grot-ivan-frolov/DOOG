/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
import {
  useMutation, useQuery, useQueryClient,
} from '@tanstack/react-query'
import { ErrorMessage, Field, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Form, useNavigate } from 'react-router-dom'
import { DogFoodApiConst } from '../../api/DogFoodapi'
import { getTokenSelector, getUserSelector } from '../../Redux/slices/userSlice'
import Loader from '../Loader/Loader'
import { getQueryUserKey } from '../Products/utils'
import { EditAvatarForm } from './EditAvatarForm'
import pen from '../Image/pen.png'
import { UserEditValidationSchema } from './validator'

export function UserPage() {
  const navigate = useNavigate()
  const gueryClient = useQueryClient()
  const userToken = useSelector(getTokenSelector)
  const { group } = useSelector(getUserSelector)
  const [isAvatarEditing, setIsAvataEditing] = useState(false)
  useEffect(() => {
    if (!userToken) {
      navigate('/signin')
    }
  }, [userToken])

  const {
    data, isLoading, isError, error,
  } = useQuery({
    queryKey: getQueryUserKey(),
    queryFn: () => DogFoodApiConst.getUser(group, userToken),
    enabled: !!(userToken),
  })

  const {
    mutateAsync, isLoading: isEditLoading, isError: isEditError, error: errorEdit,
  } = useMutation({
    mutationFn: (dataEdit) => DogFoodApiConst.editUserInfo(group, dataEdit, userToken)
      .then(() => gueryClient.invalidateQuries({ queryKey: getQueryUserKey() })),
  })
  const handleSubmit = async (values) => {
    await mutateAsync(values)
  }
  const handleAvatarEdit = () => {
    setIsAvataEditing(!isAvatarEditing)
  }
  if (isLoading || isEditLoading) return <Loader />
  if (isError) return <p>{`${error}`}</p>
  if (isEditError) return <p>{`${errorEdit}`}</p>
  const initialValues = {
    name: data.name ? data.name : '',
    about: data.about ? data.about : '',
  }
  return (
    <div className="d-flex align-items-center" style={{ paddingBottom: '90px' }}>
      <div className="card m-3" style={{ width: '25rem' }}>
        {isAvatarEditing && (
        <EditAvatarForm
          userAvatar={data.avatar}
          isAvatarEditing={isAvatarEditing}
          setIsAvataEditing={setIsAvataEditing}
        />
        )}
        <img className="card-img-top" src={data.avatar} alt="user" />
        <img
          src={pen}
          alt="edit"
          style={{
            position: 'absolute', top: '15px', right: '15px', cursor: 'pointer', width: '25px', height: '25px',
          }}
          onClick={handleAvatarEdit}
        />
        <div className="card-body">
          <Formik
            initialValues={initialValues}
            validationSchema={UserEditValidationSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form className="d-flex flex-column" style={{ width: '100%' }}>
              <Field className="mb-3 form-control" name="name" type="text" />
              <ErrorMessage component="p" className="error" name="name" />
              <p>
                <b>Группа</b>
                {' '}
                {data.group}
              </p>
              <p>
                <b>Email</b>
                {' '}
                {data.email}
              </p>
              <button type="submit" disabled={isLoading} className="btn btn-primary">Сохранить</button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  )
}

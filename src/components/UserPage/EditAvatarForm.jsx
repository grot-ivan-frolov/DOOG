import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik'
import { useSelector } from 'react-redux'
import { DogFoodApiConst } from '../../api/DogFoodapi'
import { getTokenSelector, getUserSelector } from '../../Redux/slices/userSlice'
import Loader from '../Loader/Loader'
import { getQueryUserKey } from '../Products/utils'
import { UserEditAvatarValidationSchema } from './validator'

export function EditAvatarForm({
  userAvatar,
  setIsAvatarEditing, IsAvatarEditing,
}) {
  const userToken = useSelector(getTokenSelector)
  const { group } = useSelector(getUserSelector)
  const queryClient = useQueryClient()
  const {
    mutateAsync, isLoading, isError, error,
  } = useMutation({
    mutationFn: (dataEdit) => DogFoodApiConst.editUserAvatar(group, dataEdit, userToken)
      .then(() => queryClient.invalidateQueries({ queryKey: getQueryUserKey() })),
  })
  const handleSubmit = async (values) => {
    await mutateAsync(values)
    setIsAvatarEditing(!IsAvatarEditing)
  }
  if (isLoading) return <Loader />
  if (isError) return <p>{`${error}`}</p>
  const initialValues = {
    avatar: userAvatar || '',
  }
  return (
    <div className="m-3">
      <Formik
        initialValues={initialValues}
        validationSchema={UserEditAvatarValidationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >

        <Form className="d-flex flex-column" style={{ width: '100%' }}>
          <Field className="mb-1 form-control" name="avatar" type="text" />
          <ErrorMessage component="p" className="error" name="avatar" />
          <small>Введите url вашего аватара</small>
          <button type="submit" disabled={isLoading} className="btn btn-primary">Сохронить</button>
        </Form>
      </Formik>
    </div>
  )
}

/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  ErrorMessage, Field, Formik, Form,
} from 'formik'
import { DogFoodApiConst } from '../../api/DogFoodapi'
import signInStyles from './signin.module.css'

import { setNewUser } from '../../Redux/slices/userSlice'
import { Signinvalidator } from './SigninValidator'

function SignIn() {
  const initialValues = {
    email: '',
    password: '',
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { mutateAsync, isLoading } = useMutation({

    mutationFn: (values) => DogFoodApiConst.signIn(values)

      .then((user) => {
        dispatch(setNewUser(user.data._id, user.token, user.data.email, user.data.group))
      }),
  })

  const handleSubmit = async (values) => {
    await mutateAsync(values)
    setTimeout(() => { navigate('/products') })
  }

  return (
    <>
      <h1>Войти</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={Signinvalidator}
        onSubmit={(values) => handleSubmit(values)}
      >
        <Form className={signInStyles.sigstyle}>

          <p>
            <Field name="email" type="email" placeholder="email" />
            <ErrorMessage component="p" className="error" name="email" />
          </p>
          <p>
            <Field name="password" type="password" placeholder="Пароль" />
            <ErrorMessage component="p" className="error" name="password" />
          </p>

          <button className="signupSave" disabled={isLoading} type="submit">Войти</button>
          {/* <button className="signupClose" type="submit" onClick={SagnupAll}>Отменить</button> */}
        </Form>
      </Formik>
    </>
  )
}

export default SignIn

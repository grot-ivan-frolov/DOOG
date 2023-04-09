import {
  Formik, Form, Field, ErrorMessage,
} from 'formik'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { Signupformvalidator } from './validator'
import signUpStyles from './signup.module.css'
import { DogFoodApiConst } from '../../api/DogFoodapi'
import Loader from '../Loader/Loader'

function SignUp() {
  const newSegnup = {
    email: '',
    group: 'sm9',
    password: '',

  }

  const navigate = useNavigate()

  const {
    mutateAsync, isLoading, isError, error,
  } = useMutation({
    mutationFn: (data) => DogFoodApiConst.signUp(data),

  })

  const handleSubmit = async (values) => {
    await mutateAsync({
      email: values.email,
      group: values.group,
      password: values.password,
    })
    navigate('/signin')
  }
  if (isLoading) return <Loader />
  if (isError) {
    return (
      <p>
        {`${error} `}
      </p>
    )
  }

  return (
    <>
      <h1>Регистрация</h1>
      <Formik
        initialValues={newSegnup}
        validationSchema={Signupformvalidator}
        onSubmit={(values) => handleSubmit(values)}
      >
        <Form className={signUpStyles}>

          <p>
            <Field name="email" type="email" placeholder="email" />
            <ErrorMessage component="p" className="error" name="email" />
          </p>
          <p>
            <Field name="group" type="text" placeholder="sm9" />
            <ErrorMessage component="p" className="error" name="group" />
          </p>
          <p>
            <Field name="password" type="password" placeholder="Пароль" />
            <ErrorMessage component="p" className="error" name="password" />
          </p>

          <p>
            <Field name="confirmPassword" type="password" placeholder="Подвтвердите пароль" />
            <ErrorMessage component="p" className="error" name="confirmPassword" />
          </p>
          <button className="signupSave" disabled={isLoading} type="submit">Отправить</button>

        </Form>
      </Formik>
    </>
  )
}

export default SignUp

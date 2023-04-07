import * as Yup from 'yup'

export const Signupformvalidator = Yup.object({

  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),

  // confirmEmail: Yup.string()
  //  .oneOf([Yup.ref('email')], 'Данный Email уже существует'),

  group: Yup.string()
    .required('Required'),

  password: Yup.string()
    .required('Введите парль')
    .min(5, 'Пароль должен быть не менее 5 слов'),

  confirmPassword: Yup.string()
    .required('Подтвердите пароль')
    .oneOf([Yup.ref('password')], 'Пароли должны совпадать'),

})

import * as Yup from 'yup'

export const Signinvalidator = Yup.object({
  email: Yup.string()
    .email('Неверный адрес')
    .required('Поле обязательно'),
  password: Yup.string()
    .min(6, 'Пароль должен содержать не менее 6 символов')
    .max(12, 'Пароль должен содержать не более 12 символов')
    .required('Поле обязательно'),
})

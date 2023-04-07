import * as Yup from 'yup'

export const UserEditValidationSchema = Yup.object({
  name: Yup.string()
    .required('Поле обязательно'),
  about: Yup.string()
    .required('Поле обязательно'),
})

export const UserEditAvatarValidationSchema = Yup.object({
  avatar: Yup.string()

    .required('Поле обязательно'),
})

export const ProductValidationSchema = Yup.object({
  available: Yup.boolean(),
  pictures: Yup.string()

    .required('Поле обязательно'),
  name: Yup.string()
    .required('Поле обязательно'),
  price: Yup.number()
    .required('Поле обязательно'),
  discount: Yup.number()
    .required('Поле обязательно'),
  stock: Yup.number()
    .required('Поле обязательно'),
  wight: Yup.string()
    .required('Поле обязательно'),
  description: Yup.string()
    .required('Поле обязательно'),

})

export const CommentFormValidationSchema = Yup.object({
  text: Yup.string()
    .required('Поле обязательно'),
  rating: Yup.number()
    .required('Поле обязательно'),
})

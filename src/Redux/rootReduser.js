import { combineReducers } from '@reduxjs/toolkit'
import { cartReducer } from './slices/cartSlice'
import { favoriteReducer } from './slices/favoriteSlice'
import { filterReducer } from './slices/filterSlice'
import { userReducer } from './slices/userSlice'

export const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  filter: filterReducer,
  favorites: favoriteReducer,
})

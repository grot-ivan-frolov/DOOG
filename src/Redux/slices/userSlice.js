/* eslint-disable consistent-return */
import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const userSlice = createSlice({
  name: 'user',
  initialState: initState.user,
  reducers: {
    setNewUser: {
      reducer(state, action) {
        if (state.email !== action.payload.email) { return action.payload }
      },
      prepare(id, token, email, group) {
        return {
          payload: {
            id,
            token,
            email,
            group,
          },
        }
      },
    },

    logOut() {
      return initState.user
    },
  },
})

export const { setNewUser, logOut } = userSlice.actions
export const getUserSelector = (state) => state.user
export const getTokenSelector = (state) => state.user.token
export const userReducer = userSlice.reducer

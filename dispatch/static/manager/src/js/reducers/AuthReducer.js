import R from 'ramda'
import Cookies from 'js-cookie'

import * as types from '../constants/ActionTypes'

import { Reducer, fulfilled, rejected } from '../util/redux'

const initialState = {
  token: Cookies.get('token'), // Get token stored in browser cookie
  email: Cookies.get('email'), // Get email stored in browser cookie
  nextPath: null,
  validToken: null
}

let reducer = new Reducer(initialState)

reducer.handle(types.AUTH.LOGIN_REQUIRED, (state, action) => {
  return R.merge(state, {
    nextPath: action.nextPath
  })
})

reducer.handle(fulfilled(types.AUTH.CREATE_TOKEN), (state, action) => {

  Cookies.set('token', action.token) // Persist token in browser cookie
  Cookies.set('email', action.email) // Persist email in browser cookie

  return R.merge(state, {
    token: action.token,
    email: action.email,
    nextPath: null
  })
})

reducer.handle(fulfilled(types.AUTH.DELETE_TOKEN), () => {
  Cookies.remove('token')
  Cookies.remove('email')

  return initialState
})

reducer.handle(fulfilled(types.AUTH.VERIFY_TOKEN), (state) => {
  return R.merge(state, { validToken: true })
})

reducer.handle(rejected(types.AUTH.VERIFY_TOKEN), (state) => {    
  return R.merge(state, {
    validToken: false
  })
})

export default reducer.getReducer()

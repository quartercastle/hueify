/* global JSON, localStorage */
import { createStore } from 'redux'
import defaultState from './defaultState'

const store = createStore((
  state = (JSON.parse(localStorage.getItem('store')) || defaultState),
  action
) => {
  switch (action.type) {
    case 'SET_VIEW':
      return Object.assign({}, state, { view: action.view })
    case 'SET_HOST':
      return Object.assign({}, state, { settings: { host: action.host } })
    case 'SET_BRIDGE':
      return Object.assign({}, state, { bridge: action.bridge })
    case 'SET_LIGHTS':
      return Object.assign({}, state, { lights: action.lights })
    case 'SET_GROUPS':
      return Object.assign({}, state, { groups: action.groups })
    default:
      return state
  }
})

export default store

store.subscribe(() => {
  localStorage.setItem('store', JSON.stringify(store.getState()))
})

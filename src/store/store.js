/* global JSON, localStorage */
import { createStore } from 'redux'
import defaultState from './defaultState'

/**
 * Create a new redux store
 * @type {Redux}
 */
const store = createStore((
  state = (JSON.parse(localStorage.getItem('store')) || defaultState),
  action
) => {
  switch (action.type) {
    case 'SET_VIEW':
      return { ...state, view: action.view }
    case 'SET_HOST':
      return { ...state, settings: { host: action.host } }
    case 'SET_BRIDGE':
      return { ...state, bridge: action.bridge }
    case 'SET_LIGHTS':
      return { ...state, lights: action.lights }
    case 'SET_GROUPS':
      return { ...state, groups: action.groups }
    default:
      return { ...state }
  }
})

export default store

/**
 * Save state to localStorage on changes
 */
store.subscribe(() => {
  localStorage.setItem('store', JSON.stringify(store.getState()))
})

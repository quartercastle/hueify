import { Component } from 'preact'
import store from 'store'

/**
 * Higher order component for subscribing to the redux store
 * @param  {JSX} WrappedComponent
 * @param  {Function} getState
 * @return {JSX}
 */
export default (WrappedComponent, getState) => {
  if (getState === undefined) {
    getState = store => store.getState()
  }

  return class extends Component {
    /**
     * The redux subscription
     * @type {Function}
     */
    subscription = null

    /**
     * State
     * @type {Object}
     */
    state = getState(store, this.props)

    /**
     * Subscribe to the store when the HOC mounts
     * @private
     */
    componentDidMount () {
      this.subscription = store.subscribe(this.handleUpdate.bind(this))
    }

    /**
     * Unsubscribe from the store when the component unmounts
     * @private
     */
    componentWillUnmount () {
      this.subscription()
    }

    /**
     * Handle updates from the store and put them into the HOC state
     * @private
     */
    handleUpdate () {
      this.setState(getState(store, this.props))
    }

    /**
     * Pass the store properties to the WrappedComponent
     * @return {JSX}
     */
    render () {
      return <WrappedComponent {...this.state} {...this.props} />
    }
  }
}

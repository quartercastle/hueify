import { Component } from 'preact'
import store from 'store'

export default (WrappedComponent, getState) => {
  if (getState === undefined) {
    getState = store => store.getState()
  }

  return class extends Component {
    subscription = null
    state = getState(store, this.props)

    componentDidMount () {
      this.subscription = store.subscribe(this.handleUpdate.bind(this))
    }

    componentWillUnmount () {
      this.subscription()
    }

    handleUpdate () {
      this.setState(getState(store, this.props))
    }

    render () {
      return <WrappedComponent {...this.state} {...this.props} />
    }
  }
}

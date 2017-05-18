import { Component } from 'preact'
import hue, { HueApi } from 'node-hue-api'
import setLights from 'store/actions/setLights'
import setGroups from 'store/actions/setGroups'
import setHost from 'store/actions/setHost'
import store from 'store'

/**
 * Higher order component which will setup the Hue API connection
 * @param  {JSX} WrappedComponent
 * @return {JSX}
 */
export default WrappedComponent => class extends Component {
  /**
   * State
   * @type {Object}
   */
  state = {
    api: null
  }

  /**
   * Search for a bridge and connect when HOC mounts
   * @private
   */
  componentDidMount () {
    this.searchForBrigde()
    this.connect()
  }

  /**
   * Setup the Hue connection and save it in the state
   * @private
   */
  connect () {
    if (!this.props.bridge.token) {
      return
    }

    const api = new HueApi(
      this.props.settings.host,
      this.props.bridge.token,
      2000
    )

    this.setState({ api }, () => {
      this.updateState()
      this.state.api.updateState = this.updateState.bind(this)
    })
  }

  /**
   * Search for a bridge
   * @private
   */
  searchForBrigde () {
    hue.upnpSearch(3000)
      .then(bridge => {
        if (bridge.length === 0) {
          return
        }

        store.dispatch(setHost(bridge[0].ipaddress))
      })
      .done(() =>
        this.connect()
      )
  }

  /**
   * Get the current lightstate for lights and groups from the Hue bridge
   * @public
   */
  updateState () {
    this.getCurrentLightsState()
    this.getCurrentLightGroups()
  }

  /**
   * Get ligthstate for lights
   * @private
   */
  getCurrentLightsState () {
    this.state.api.lights()
      .then(({ lights }) => store.dispatch(setLights(lights)))
      .done()
  }

  /**
   * Get ligthstate for groups
   * @private
   */
  getCurrentLightGroups () {
    this.state.api.groups()
      .then(groups => {
        store.dispatch(setGroups(groups))
      })
      .done()
  }

  /**
   * Pass the Hue api to the WrappedComponent as props
   * @return {JSX}
   */
  render () {
    return <WrappedComponent {...this.state} {...this.props} />
  }
}

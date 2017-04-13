import { Component } from 'preact'
import hue, { HueApi } from 'node-hue-api'
import setLights from 'store/actions/setLights'
import setGroups from 'store/actions/setGroups'
import setHost from 'store/actions/setHost'
import store from 'store'

export default WrappedComponent => {
  return class extends Component {
    state = {
      api: null
    }

    componentDidMount () {
      this.searchForBrigde()
      this.connect()
    }

    connect () {
      if (!this.props.bridge.token) {
        return
      }

      const api = new HueApi(
        this.props.settings.host,
        this.props.bridge.token
      )

      this.setState({ api }, () => {
        this.updateState()
        this.state.api.updateState = this.updateState.bind(this)
      })
    }

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

    updateState () {
      this.getCurrentLightsState()
      this.getCurrentLightGroups()
    }

    getCurrentLightsState () {
      this.state.api.lights()
        .then(({ lights }) => store.dispatch(setLights(lights)))
        .done()
    }

    getCurrentLightGroups () {
      this.state.api.groups()
        .then(groups => {
          store.dispatch(setGroups(groups))
        })
        .done()
    }

    render () {
      return <WrappedComponent {...this.state} {...this.props} />
    }
  }
}

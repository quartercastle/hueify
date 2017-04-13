import { Component } from 'preact'
import store, { subscribe } from 'store'
import { HueApi } from 'node-hue-api'
import setBridge from 'store/actions/setBridge'
import connectToHue from 'helpers/connectToHue'
import './Connect.css'

class Connect extends Component {
  interval = null

  componentDidMount () {
    this.connect()
    this.interval = setInterval(this.connect.bind(this), 1000)
  }

  componentWillUnmount () {
    this.interval = clearInterval(this.interval)
  }

  connect () {
    const hue = new HueApi()
    hue.registerUser(this.props.settings.host, 'Hueify')
      .then(this.success.bind(this))
      .fail(() => {})
      .done()
  }

  success (token) {
    store.dispatch(setBridge({ token: token }))
  }

  render () {
    return (
      <div className='connect-view'>
        <div className='circle'>
          Connect
        </div>
      </div>
    )
  }
}

export default subscribe(connectToHue(Connect))

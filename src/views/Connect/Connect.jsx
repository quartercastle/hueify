import { Component } from 'preact'
import store, { subscribe } from 'store'
import { HueApi } from 'node-hue-api'
import setBridge from 'store/actions/setBridge'
import connectToHue from 'helpers/connectToHue'
import './Connect.css'

class Connect extends Component {
  /**
   * Interval to check if connection is established
   * @type {setInterval|null}
   */
  interval = null

  /**
   * Connect to the Hue bridge when the component mounts
   * @private
   */
  componentDidMount () {
    this.connect()
    this.interval = setInterval(this.connect.bind(this), 1000)
  }

  /**
   * stop the interval when the component unmounts
   * @private
   */
  componentWillUnmount () {
    this.interval = clearInterval(this.interval)
  }

  /**
   * Try to establish a connection to the hue bridge
   * @private
   */
  connect () {
    const hue = new HueApi()
    hue.registerUser(this.props.settings.host, 'Hueify')
      .then(this.success.bind(this))
      .fail(() => {})
      .done()
  }

  /**
   * If the connection is establish, then tell the store
   * @param  {String} token
   * @private
   */
  success (token) {
    store.dispatch(setBridge({ token: token }))
  }

  /**
   * Render the connection view
   * @return {JSX}
   * @public
   */
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

import { Component } from 'preact'
import Layout from 'components/Layout'
import Toggle from 'components/Toggle'
import setBridge from 'store/actions/setBridge'
import store, { subscribe } from 'store'

class Settings extends Component {
  /**
   * Toggle dark mode on body
   * TODO should be saved in the store in a later version
   * @private
   */
  toggleDarkMode () {
    document.body.classList.toggle('dark')
    this.forceUpdate()
  }

  /**
   * Close the connection to the bridge
   * @private
   */
  closeConnection () {
    store.dispatch(setBridge({}))
  }

  /**
   * Render the settings view
   * @param  {props} settings
   * @return {JSX}
   */
  render ({ settings }) {
    return (
      <Layout>
        <ul>
          <li>
            <small>Host</small>
            {settings.host}
          </li>
          <li>
            Dark mode
            <Toggle
              onClick={this.toggleDarkMode.bind(this)}
              checked={document.body.classList.contains('dark')}
              style={{ float: 'right', marginTop: '0px' }}
            />
            {settings.darkMode}
          </li>
          <li>
            <a onClick={this.closeConnection.bind(this)}>Close Connection</a>
          </li>
        </ul>
      </Layout>
    )
  }
}

export default subscribe(Settings)

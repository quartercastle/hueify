import { Component } from 'preact'
import Layout from 'components/Layout'
import setBridge from 'store/actions/setBridge'
import store, { subscribe } from 'store'

class Settings extends Component {
  /**
   * Toggle dark mode on body
   * TODO should be save in the store in a later version
   * @private
   */
  toggleDarkMode () {
    document.body.classList.toggle('dark')
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
            <input
              onClick={this.toggleDarkMode}
              checked={document.body.classList.contains('dark')}
              style={{ float: 'right' }}
              type='checkbox'
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

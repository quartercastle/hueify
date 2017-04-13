import { Component } from 'preact'
import store, { subscribe } from 'store'
import setView from 'store/actions/setView'
import './header.css'

class Header extends Component {
  /**
   * Switch to a new view
   * @param {String} view
   */
  setView (view) {
    this.context.route(view)

    setTimeout(() => (
      store.dispatch(setView(view))
    ), 10)
  }

  /**
   * Check if current view matches tab
   * @param {String} view
   * @return {String} className
   */
  isView (view) {
    return this.props.view === view ? 'active' : ''
  }

  /**
   * Render header component
   * @return {JSX}
   */
  render () {
    return (
      <header className={this.props.view}>
        <ul>
          <li
            onClick={this.setView.bind(this, 'lights')}
            className={this.isView('lights')}
          >
            Lights
          </li>
          <li
            onClick={this.setView.bind(this, 'groups')}
            className={this.isView('groups')}
          >
            Groups
          </li>
          <li
            onClick={this.setView.bind(this, 'settings')}
            className={this.isView('settings')}
          >
            Settings
          </li>
        </ul>
      </header>
    )
  }
}

export default subscribe(Header)

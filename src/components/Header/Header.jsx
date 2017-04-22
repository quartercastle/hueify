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
      <header className={this.props.view.toLowerCase()}>
        <ul>
          {this.renderTab('Lights')}
          {this.renderTab('Groups')}
          {this.renderTab('Settings')}
        </ul>
      </header>
    )
  }

  /**
   * Render a tab
   * @param  {String}  name
   * @return {JSX}
   */
  renderTab (name) {
    return (
      <li
        onClick={this.setView.bind(this, name)}
        className={this.isView(name)}
      >
        {name}
      </li>
    )
  }
}

export default subscribe(Header)

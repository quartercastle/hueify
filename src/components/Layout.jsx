import { Component } from 'preact'
import Header from 'components/Header'
import Content from 'components/Content'

export default class Layout extends Component {
  /**
   * Render Layout
   * @param {Object} props
   * @return {JSX}
   */
  render ({ children }) {
    return (
      <div>
        <Header />
        <Content>
          {children}
        </Content>
      </div>
    )
  }
}

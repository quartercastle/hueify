import Header from 'components/Header'
import Content from 'components/Content'

export default ({ children }) => (
  <div>
    <Header />
    <Content>
      {children}
    </Content>
  </div>
)

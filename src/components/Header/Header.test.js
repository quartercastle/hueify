/* eslint-env jest */
import '../../__mocks__/localStorage'
import { h, render } from 'preact'
import { Views } from 'preact-views'
import { default as renderToString } from 'preact-render-to-string'
import store from 'store'
import Header from './Header'

global.h = h

test('Should render the header component', () => {
  const vdom = renderToString(<Header />)
  expect(vdom).toMatchSnapshot()
})

test('Header should dispatch view change if a tab is clicked', done => {
  render(<Views view='header'><Header name='header' /></Views>, document.body)
  store.subscribe(done)
  document.querySelectorAll('li')[1].click()
})

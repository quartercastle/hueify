/* eslint-env jest */
import { h, render } from 'preact'
import { default as renderToString } from 'preact-render-to-string'
import Toggle from './Toggle'

global.h = h

test('Should render toggle button', () => {
  const vdom = renderToString(<Toggle />)
  expect(vdom).toMatchSnapshot()
})

test('Should render checked toggle button', () => {
  const vdom = renderToString(<Toggle checked />)
  expect(vdom).toMatchSnapshot()
})

test('Should style component', () => {
  const vdom = renderToString(<Toggle style={{ backgorund: 'green' }} />)
  expect(vdom).toMatchSnapshot()
})

test('Should fire onClick event', done => {
  const onClick = () => done()

  render(
    <Toggle onClick={onClick} />,
    document.body
  )

  document.querySelector('.toggle-button').click()
})

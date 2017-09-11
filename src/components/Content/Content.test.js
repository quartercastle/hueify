/* eslint-env jest */
import { h } from 'preact'
import render from 'preact-render-to-string'
import Content from './Content'

global.h = h

test(`Should render the content component`, () => {
  const vdom = render(<Content />)
  expect(vdom).toMatchSnapshot()
})

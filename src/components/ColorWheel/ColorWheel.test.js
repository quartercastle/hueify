/* eslint-env jest */
import { default as renderToString } from 'preact-render-to-string'
import { h, render } from 'preact' // eslint-disable-line
import ColorWheel from './ColorWheel'

global.h = h

beforeEach(() => {
  document.body.innerHTML = ''
})

test(`Shouldn't render anything if no props is set`, () => {
  const vdom = renderToString(<ColorWheel />)
  expect(vdom).toMatchSnapshot()
})

test(`Should render the color wheel if the show prop is set`, () => {
  const vdom = renderToString(<ColorWheel show />)
  expect(vdom).toMatchSnapshot()
})

test(`Should invoke the onClose method when the color wheel closes`, done => {
  const onClose = () => done()

  render(
    <ColorWheel show onClose={onClose} />,
    document.body
  )

  document.querySelector('.color-overlay').click()
})

test(`Should return color coordinates if color wheel is clicked`, done => {
  const onClick = rgb => {
    expect(rgb).toMatchSnapshot()
    done()
  }

  ColorWheel.prototype.onClick = function () {
    this.props.onClick([1, 2, 3])
  }

  render(
    <ColorWheel show onClick={onClick} />,
    document.body
  )

  document.querySelector('.wheel').click()
})

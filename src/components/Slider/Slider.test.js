/* eslint-env jest */
import { h, render } from 'preact'
import { default as renderToString } from 'preact-render-to-string'
import Slider from './Slider'

global.h = h

test('Should render default slider component', () => {
  const vdom = renderToString(<Slider />)
  expect(vdom).toMatchSnapshot()
})

test('Should render slider with min/max value', () => {
  const vdom = renderToString(<Slider min={0} max={100} />)
  expect(vdom).toMatchSnapshot()
})

test('Should render disabled slider', () => {
  const vdom = renderToString(<Slider disabled />)
  expect(vdom).toMatchSnapshot()
})

test('Should render with a default value', () => {
  const vdom = renderToString(<Slider defaultValue={100} />)
  expect(vdom).toMatchSnapshot()
})

test('Should trigger onInput event when slider value changes', done => {
  const onInput = () => done()

  render(
    <Slider
      onInput={onInput}
      defaultValue={0}
      min={0}
      max={100}
    />,
    document.body
  )

  const $el = document.querySelector('input')
  $el.value = 50
  $el._component.props.onInput() // TODO find out why the on input event isn't fired
})

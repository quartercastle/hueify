import { Component } from 'preact'
import './Slider.css'

export default class Silder extends Component {
  /**
   * Slider element
   * @type {DOMElement|null}
   * @private
   */
  element = null

  /**
   * Update the element value when the defaultValue prop is changed.
   * This is a hack so the slider can slide as smooth as possible
   * @param  {Object} props
   * @private
   */
  componentWillReceiveProps ({ defaultValue }) {
    if (this.element === document.activeElement) {
      return
    }

    this.element.value = defaultValue
  }

  /**
   * Render an input element with the type of a range
   * @param {Object} props
   * @return {JSX}
   * @public
   */
  render ({ onInput, min, max, defaultValue, disabled }) {
    return (
      <input
        ref={el => (this.element = el)}
        type='range'
        min={min}
        max={max}
        disabled={disabled}
        defaultValue={defaultValue}
        onInput={onInput}
      />
    )
  }
}

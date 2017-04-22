import { Component } from 'preact'
import debounce from 'debounce'
import './Slider.css'

export default class Silder extends Component {
  element = null

  componentWillReceiveProps ({ defaultValue }) {
    if (this.element === document.activeElement) {
      return
    }

    this.element.value = defaultValue
  }

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

import './Slider.css'

export default ({ onInput, min, max, value }) => (
  <input
    type='range'
    min={min}
    max={max}
    value={value}
    onInput={onInput}
  />
)

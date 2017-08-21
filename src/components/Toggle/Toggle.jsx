import './Toggle.css'

export default ({ checked = false, onClick, style }) => (
  <div
    style={style}
    className={['toggle-button', checked ? 'active' : ''].join(' ')}
    onClick={onClick}
  />
)

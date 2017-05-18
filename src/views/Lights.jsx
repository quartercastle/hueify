import { Component } from 'preact'
import Layout from 'components/Layout'
import Slider from 'components/Slider'
import ColorWheel from 'components/ColorWheel'
import { subscribe } from 'store'
import { lightState } from 'node-hue-api'
import { convertXYtoRGB } from 'node-hue-api/hue-api/rgb'
import connectToHue from 'helpers/connectToHue'
import debounce from 'debounce'

class Lights extends Component {
  /**
   * State
   * @type {Object}
   */
  state = {
    colorWheel: false,
    currentLight: null
  }

  /**
   * set the brigthness of a light
   * @param  {Object} light
   * @param  {Object} event
   * @private
   */
  setLightBrightness (light, event) {
    this.props.api.setLightState(
        light.id,
        lightState.create().transitionFast().bri(event.target.value)
      )
      .done(this.props.api.updateState)
  }

  /**
   * Toggle ligth on/off
   * @param  {Object} light
   * @private
   */
  toggleLight (light) {
    this.props.api.setLightState(
        light.id,
        lightState.create().on(!light.state.on)
      )
      .done(this.props.api.updateState)
  }

  /**
   * Set color from rgb value
   * @param  {Array} rgb
   * @private
   */
  setColor (rgb) {
    this.props.api.setLightState(
        this.state.currentLight.id,
        lightState.create().rgb(...rgb)
      )
      .done(this.props.api.updateState)
  }

  /**
   * Toggle the color wheel
   * @param  {Object} light
   * @private
   */
  toggleColorWheel (light) {
    this.setState({
      colorWheel: !!light,
      currentLight: light
    })
  }

  /**
   * Render light view
   * @param {Object} props
   * @return {Function}
   * @public
   */
  render ({ lights }) {
    return (
      <Layout>
        <ul>
          {lights.map(light => this.renderListItem(light))}
        </ul>
        <ColorWheel
          show={this.state.colorWheel}
          onClick={this.setColor.bind(this)}
          onClose={this.toggleColorWheel.bind(this)}
        />
      </Layout>
    )
  }

  /**
   * Render list item
   * @param  {Object} light
   * @return {JSX}
   */
  renderListItem (light) {
    const rgb = convertXYtoRGB(...light.state.xy, light.state.bri)

    const gradient = {
      background: `linear-gradient(90deg, transparent, rgb(${rgb.join(',')}))`,
      opacity: (light.state.bri / 255)
    }

    return (
      <li key={light.id} className='fixed-height'>
        <span
          onClick={this.toggleColorWheel.bind(this, light)}
          className='color'
          style={light.state.on ? gradient : {}}
        />
        <span className='control'>
          <span>
            <span onClick={this.toggleColorWheel.bind(this, light)}>
              {light.name}
            </span>
            <input
              type='checkbox'
              style={{ float: 'right', cursor: 'pointer' }}
              onChange={this.toggleLight.bind(this, light)}
              checked={light.state.on}
            />
          </span>
          <Slider
            min='0'
            max='255'
            disabled={!light.state.on}
            defaultValue={light.state.bri}
            onInput={debounce(this.setLightBrightness.bind(this, light), 200)}
          />
        </span>
      </li>
    )
  }
}

export default subscribe(connectToHue(Lights))

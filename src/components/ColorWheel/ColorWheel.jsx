/* global Image */
import { Component } from 'preact'
import './ColorWheel.css'

export default class ColorWheel extends Component {
  /**
   * The canvas element
   * @type {DOMElement|null}
   */
  canvas = null

  /**
   * The diameter of the color wheel
   * @type {Number}
   */
  size = 250

  /**
   * The center coordinates for the wheel
   * @type {Array|null}
   */
  center = null

  /**
   * Setup the canvas when the component mounts
   * @private
   */
  componenDidMount () {
    this.setupCanvas()
  }

  /**
   * When the component receives new props, then update the canvas
   * @param  {Object} nextProps
   * @private
   */
  componentWillReceiveProps (nextProps) {
    this.props = nextProps
    this.setupCanvas()
  }

  /**
   * Remove the DOM reference from memory
   * @private
   */
  componentWillUnmount () {
    this.canvas = null
  }

  /**
   * Setup canvas
   * @private
   */
  setupCanvas () {
    if (!this.props.show) {
      return
    }

    process.nextTick(() => {
      this.canvas = document.querySelector('#canvas')
      this.center = [this.canvas.width / 2, this.canvas.height / 2]
      this.drawCircle()
      this.drawInnerCircle()
      this.convertImageToCanvas(this.convertCanvasToImage())
    })
  }

  /**
   * Draw the color wheel
   * @private
   */
  drawCircle () {
    const context = this.canvas.getContext('2d')
    const [x, y] = this.center
    const radius = this.size / 2

    for (let angle = 0; angle <= 360; angle++) {
      const startAngle = (angle - 2) * Math.PI / 180
      const endAngle = angle * Math.PI / 180
      context.beginPath()
      context.moveTo(x, y)
      context.arc(x, y, radius, startAngle, endAngle)
      context.closePath()
      context.fillStyle = 'hsl(' + angle + ', 100%, 50%)'
      context.fill()
    }
  }

  /**
   * Draw a gradient from the middle of the circle which goes
   * from white to transparent
   * @private
   */
  drawInnerCircle () {
    const context = this.canvas.getContext('2d')
    const [x, y] = this.center
    const radius = this.size / 2

    const innerRadius = 10
    const outerRadius = this.size / 2

    const gradient = context.createRadialGradient(x, y, innerRadius, x, y, outerRadius)
    gradient.addColorStop(0, 'white')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.2)')

    context.arc(x, y, radius, 0, 2 * Math.PI)

    context.fillStyle = gradient
    context.fill()
  }

  /**
   * Convert image to canvas
   * @param  {Image} image
   * @private
   */
  convertImageToCanvas (image) {
    this.canvas.getContext('2d').drawImage(image, 0, 0)
  }

  /**
   * Convert canvas to image
   * @return {Image}
   * @private
   */
  convertCanvasToImage () {
    const image = new Image()
    image.src = this.canvas.toDataURL('image/png')
    return image
  }

  /**
   * Fire the onClick event when the color wheel is click.
   * Send rgb value as arguments in the callback function
   * @param  {Object} event
   * @private
   */
  onClick (event) {
    const { data } = this.canvas.getContext('2d').getImageData(
      event.offsetX,
      event.offsetY,
      1,
      1
    )

    if (typeof this.props.onClick === 'function') {
      this.props.onClick(data)
    }
  }

  /**
   * Close the color wheel when the overlay element is clicked and fire
   * the onClose event
   * @param  {Object} event
   * @private
   */
  close (event) {
    if (event.target.classList.contains('wheel')) {
      return
    }

    if (typeof this.props.onClose === 'function') {
      this.props.onClose()
    }
  }

  /**
   * Render the color wheel canvas
   * @param  {Object} props
   * @return {JSX}
   * @public
   */
  render ({ show }) {
    if (!show) {
      return null
    }

    return (
      <div className='color-overlay' onClick={this.close.bind(this)}>
        <canvas
          onClick={this.onClick.bind(this)}
          className='wheel'
          width={this.size}
          height={this.size}
          id='canvas'
        />
      </div>
    )
  }
}

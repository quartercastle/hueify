/* global Image */
import { Component } from 'preact'
import './ColorWheel.css'

export default class ColorWheel extends Component {
  canvas = null
  size = 250
  center = null

  componenDidMount () {
    this.setupCanvas()
  }

  componentWillReceiveProps (nextProps) {
    this.props = nextProps
    this.setupCanvas()
  }

  componentWillUnmount () {
    this.canvas = null
  }

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

  convertImageToCanvas (image) {
    this.canvas.getContext('2d').drawImage(image, 0, 0)
  }

  convertCanvasToImage () {
    const image = new Image()
    image.src = this.canvas.toDataURL('image/png')
    return image
  }

  onClick (event) {
    const { data } = this.canvas.getContext('2d').getImageData(
      event.offsetX,
      event.offsetY,
      1,
      1
    )

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(data)
    }
  }

  close (event) {
    if (event.target.classList.contains('wheel')) {
      return
    }

    if (typeof this.props.onClose === 'function') {
      this.props.onClose()
    }
  }

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

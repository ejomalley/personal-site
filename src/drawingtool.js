import React from 'react'
import { SketchPicker } from 'react-color'
import { NavBar } from './home'

var drawColor = '#000000'
var drawWidth = 2

const Canvas = (props) => {
  const canvasRef = React.useRef(null)
  let canvas, ctx

  var isMouseDown = false,
      curx = 0, cury = 0

  const mouseDown = (e) => {
    curx = e.nativeEvent.offsetX
    cury = e.nativeEvent.offsetY
    isMouseDown = true
  }
  const mouseUp = (e) => {
    if (isMouseDown) {
      drawLine(curx, cury, e.nativeEvent.offsetX, e.nativeEvent.offsetY, drawColor)
      curx = 0
      cury = 0
      isMouseDown = false
    }
  }
  const mouseMove = (e) => {
    if (isMouseDown) {
      drawLine(curx, cury, e.nativeEvent.offsetX, e.nativeEvent.offsetY, drawColor)
      curx = e.nativeEvent.offsetX
      cury = e.nativeEvent.offsetY
    }
  }

  const drawLine = (x1, y1, x2, y2, color) => {
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = drawWidth
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
    ctx.closePath()
  }

  React.useEffect(() => {
    // eslint-disable-next-line
    canvas = canvasRef.current
    // eslint-disable-next-line
    ctx = canvas.getContext('2d')
  }, [])

  return <canvas ref={canvasRef} onMouseMove={mouseMove} onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseLeave={mouseUp} {...props} />
}

const DrawPanel = (props) => {
  return (
    <div className='bg-gray-200 min-h-screen min-w-full flex flex-row justify-center'>
      <DrawBox/>
      <DrawTools/>
    </div>
  )
}

const DrawBox = (props) => {
  return (
    <Canvas id='draw-box' width='560px' height='560px' className='-mt-64 bg-gray-100 self-center' {...props}/>
  )
}

const DrawTools = (props) => {
  const [color, setColor] = React.useState()
  const [width, setWidth] = React.useState()
  // const handleClick = (e) => {
  //   drawColor = e.target.value
  //   setColor(drawColor)
  // }
  React.useEffect(() => {
    setColor(drawColor)
    setWidth(drawWidth)
    let ctx = document.getElementById('color-sel').getContext('2d')
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }, [])

  const clear = () => {
    let ctx = document.getElementById('draw-box').getContext('2d')
    var b = window.confirm("Clear canvas?")
    if (b) ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }

  const save = () => {
  //   let imgURL = document.getElementById('draw-box').toDataURL('image/png')
  //   let w = window.open()
  //   w.document.write(`<img src=${imgURL} />`)
  //   clear()
  window.alert('SAVE NOT YET IMPLEMENTED')
  }

  const updateWidth = (e) => {
    drawWidth = e.target.value
    setWidth(drawWidth)
  }

  const showColorPicker = (e) => {
    // !color-picker.visible
  }

  const handleChange = (color) => {
    drawColor = color.hex
    setColor(drawColor)
    let ctx = document.getElementById('color-sel').getContext('2d')
    ctx.fillStyle = drawColor
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    console.log(ctx)
  }

  return (
    // Toolbox
    <div className='flex flex-col justify-center h-auto ml-10 -mt-64 py-5'>
      <div className='mb-5 mx-auto'>
        <SketchPicker width='8rem' onChange={handleChange} color={color} presetColors={['#FF0000', '#00FF00', '#0000FF', '#000000']}/>
      </div>
      <div className='bg-gray-300 w-32 h-auto flex flex-col'>
        <div className='py-5'>
          {/* Color Info */}
          <div className='flex flex-row justify-center'>
            <label className='text-sm'>{'Color: '}</label>
            <canvas id='color-sel' className='w-5 h-5 border border-black bg-gray-100 self-center' onClick={showColorPicker} />
          </div>
          {/* Pencil Width */}
          <div className='mt-6 mb-8 flex flex-row justify-center'>
            <label className='text-sm ml-2'>Width: </label>
            <input type='number' className='w-10 h-5 ml-2' defaultValue={width} onChange={updateWidth}></input>
          </div>
          {/* Save/Clear */}
          <div className='flex flex-row justify-around'>
            <button className='bg-gray-100 hover:bg-gray-200 rounded px-1' onClick={save}>Save</button>
            <button className='bg-gray-100 hover:bg-gray-200 rounded px-1' onClick={clear}>Clear</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const DTHeader = () => {
  return (
    <div className='min-w-full h-32 bg-gray-300 items-center flex flex-row justify-center'>
      <p className='text-xl text-center px-20'>
        This is a test to see how browser based drawing tools work!
        Inspired by my wish for a game much like {' '}
        <a href='https://www.brokenpicturephone.com' className='text-blue-500'>brokenpicturephone</a>, 
        but with an improved drawing tool.
      </p>
    </div>
  )
}

export default function DrawPage() {
  return (
    <div>
      <NavBar />
      <DTHeader />
      <DrawPanel/>
    </div>
  )
}
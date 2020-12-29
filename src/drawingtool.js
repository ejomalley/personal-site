import React from 'react'
import { NavBar } from './home'

var drawColor = 'black'
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
  const [color, setColor] = React.useState('')
  const [width, setWidth] = React.useState()
  const handleClick = (e) => {
    drawColor = e.target.value
    setColor(drawColor)
  }
  React.useEffect(() => {
    setColor(drawColor)
    setWidth(drawWidth)
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
  console.log('SAVE NOT YET IMPLEMENTED')
  }

  const updateWidth = (e) => {
    drawWidth = e.target.value
    setWidth(drawWidth)
  }

  return (
    // Toolbox
    <div className='bg-gray-300 w-32 h-auto self-center -mt-64 ml-10 py-2'>
      {/* Color Wheel */}
      <div className='flex flex-row justify-around flex-wrap'>
        <button className='w-5 h-5 bg-black' onClick={handleClick} value={'black'}></button>
        <button className='w-5 h-5 bg-green-600' onClick={handleClick} value={'green'}></button>
        <button className='w-5 h-5 bg-blue-600' onClick={handleClick} value={'blue'}></button>    
        <button className='w-5 h-5 bg-red-600' onClick={handleClick} value={'red'}></button>   
      </div>
      {/* Color Info */}
      <p className='text-sm pt-8 px-1 text-center -mt-5'>Current Color:</p>
      <p className='text-sm pt-1 px-1 text-center'>{color.toUpperCase()}</p>
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
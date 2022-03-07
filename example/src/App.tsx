import React from 'react'

import create from 'react-layer'

const App = () => {
  function createLayer() {
    const layer = create<{
      name: string
    }>(({layer, name}) => {
      return (
          <div>
            <h1>I'm {name} !</h1>
            <button onClick={layer!.destroy}>destroy</button>
          </div>
      )
    })

    layer.render({
      name: 'Layer'
    })
  }

  function createAsyncLayer() {

  }

  return (
      <div>
        <button onClick={createLayer}>create layer</button>
        <button onClick={createAsyncLayer}>create async Layer</button>
      </div>
  )
}

export default App

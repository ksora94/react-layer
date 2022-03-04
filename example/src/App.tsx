import React from 'react'

import createLayer from 'react-layer'

const App = () => {
  function handleClick() {
    const layer = createLayer<{
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

  return (
      <button onClick={handleClick}>create layer</button>
  )
}

export default App

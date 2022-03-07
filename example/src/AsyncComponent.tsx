import React from 'react';
import {LC} from 'react-layer';

const AsyncComponent: LC<{
  name?: string
}> = ({layer, name}) => {
  return (
      <div>
        <h1>I'm an {name}</h1>
        <button onClick={layer!.destroy}>destroy</button>
      </div>
  )
};

export default AsyncComponent;

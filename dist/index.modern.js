import React from 'react';
import ReactDom from 'react-dom';

function getLayerRoot(id = 'layer-root') {
  let layerRoot = document.getElementById(id);
  if (layerRoot) return layerRoot;
  layerRoot = document.createElement('div');
  layerRoot.setAttribute('id', id);
  document.body.appendChild(layerRoot);
  return layerRoot;
}
function create(Component, root) {
  const container = root || getLayerRoot();
  const layer = {
    instance: null,
    root: container,

    render(props) {
      const layerElement = Component.prototype && Component.prototype.render ? React.createElement(Component, Object.assign({
        ref: ref,
        layer: layer
      }, props)) : React.createElement(Component, Object.assign({
        layer: layer
      }, props));
      ReactDom.render(layerElement, container);
    },

    destroy() {
      ReactDom.unmountComponentAtNode(container);
      layer.instance = null;
      if (container.parentNode && !container.children.length) container.parentNode.removeChild(container);
    }

  };

  function ref(layerComponent) {
    if (layerComponent) layer.instance = layerComponent;
  }

  return layer;
}

export { create, getLayerRoot };
//# sourceMappingURL=index.modern.js.map

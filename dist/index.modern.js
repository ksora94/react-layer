import React, { Suspense } from 'react';
import ReactDom from 'react-dom';

function createRoot(id) {
  if (id === void 0) {
    id = 'layer-root';
  }

  var root = document.getElementById(id);
  if (root) return root;
  root = document.createElement('div');
  root.setAttribute('id', id);
  document.body.appendChild(root);
  return root;
}
function create(Component, root) {
  var layer = {
    instance: null,
    render: function render() {},
    root: typeof root === 'string' ? createRoot(root) : root || createRoot(),
    destroy: function destroy() {
      var root = layer.root;
      ReactDom.unmountComponentAtNode(root);
      layer.instance = null;
      if (root.parentNode && !root.children.length) root.parentNode.removeChild(root);
    }
  };

  function createElement(Comp, props) {
    function ref(layerComponent) {
      if (layerComponent) layer.instance = layerComponent;
    }

    return Comp.prototype && Comp.prototype.render ? React.createElement(Comp, Object.assign({
      ref: ref,
      layer: layer
    }, props)) : React.createElement(Comp, Object.assign({
      layer: layer
    }, props));
  }

  if (Component instanceof Promise) {
    layer.render = function (props) {
      var LazyComponent = React.lazy(function () {
        return Component;
      });
      var element = React.createElement(Suspense, {
        fallback: null
      }, createElement(LazyComponent, props));
      return ReactDom.render(element, layer.root);
    };

    return Component.then(function () {
      return layer;
    });
  } else {
    layer.render = function (props) {
      return ReactDom.render(createElement(Component, props), layer.root);
    };

    return layer;
  }
}

export { create, createRoot };
//# sourceMappingURL=index.modern.js.map

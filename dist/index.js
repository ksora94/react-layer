function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var ReactDom = _interopDefault(require('react-dom'));

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

  function ref(layerComponent) {
    if (layerComponent) layer.instance = layerComponent;
  }

  function createElement(Comp, props) {
    return Comp.prototype && Comp.prototype.render ? React__default.createElement(Comp, Object.assign({
      ref: ref,
      layer: layer
    }, props)) : React__default.createElement(Comp, Object.assign({
      layer: layer
    }, props));
  }

  if (Component instanceof Promise) {
    layer.render = function (props) {
      var LazyComponent = React__default.lazy(function () {
        return Component;
      });
      var element = React__default.createElement(React.Suspense, {
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

exports.create = create;
exports.createRoot = createRoot;
//# sourceMappingURL=index.js.map

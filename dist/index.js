function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var ReactDom = _interopDefault(require('react-dom'));

function getLayerRoot(id) {
  if (id === void 0) {
    id = 'layer-root';
  }

  var layerRoot = document.getElementById(id);
  if (layerRoot) return layerRoot;
  layerRoot = document.createElement('div');
  layerRoot.setAttribute('id', id);
  document.body.appendChild(layerRoot);
  return layerRoot;
}
function create(Component, root) {
  var container = root || getLayerRoot();
  var layer = {
    instance: null,
    root: container,
    render: function render(props) {
      var layerElement = Component.prototype && Component.prototype.render ? React.createElement(Component, Object.assign({
        ref: ref,
        layer: layer
      }, props)) : React.createElement(Component, Object.assign({
        layer: layer
      }, props));
      ReactDom.render(layerElement, container);
    },
    destroy: function destroy() {
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

exports.default = create;
exports.getLayerRoot = getLayerRoot;
//# sourceMappingURL=index.js.map

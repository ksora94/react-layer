import React, {ComponentType, ReactInstance} from 'react';
import ReactDom from 'react-dom';

export function getLayerRoot(id = 'layer-root'): HTMLElement {
  let layerRoot = document.getElementById(id);

  if (layerRoot) return layerRoot;
  layerRoot = document.createElement('div');
  layerRoot.setAttribute('id', id);
  document.body.appendChild(layerRoot);
  return layerRoot;
}

export interface LayerType<P = {}> {
  /**
   * 子组件实例
   * @note 只有当子组件为类组件时才有值
   */
  instance: ReactInstance | null;

  /**
   * 挂载组件
   * @param props 给子组件传递的props
   */
  render(props?: Omit<P, 'layer'>): void;

  /**
   * 销毁组件
   */
  destroy(): void;
}

export interface LayerComponentProps<P> {
  layer?: LayerType<P>;
}

/**
 * 创建浮层
 * @param Component 子组件引用
 * @param root 挂载的根节点，默认#layer-root
 */
export default function create<P>(
    Component: ComponentType<P & LayerComponentProps<P>>,
    root?: HTMLElement,
): LayerType<P> {
  const container = root || getLayerRoot();
  const layer: LayerType<P> = {
    instance: null,
    render(props: P) {
      const layerElement = Component.prototype && Component.prototype.render ?
                  <Component ref={ref} layer={layer} {...props} /> : <Component layer={layer} {...props} />


      ReactDom.render(layerElement, container);
    },
    destroy() {
      ReactDom.unmountComponentAtNode(container);
      layer.instance = null;
      if (container.parentNode && !container.children.length)
        container.parentNode.removeChild(container);
    },
  };

  function ref(layerComponent: ReactInstance | null) {
    if (layerComponent) layer.instance = layerComponent;
  }

  return layer;
}

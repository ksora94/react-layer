import React, { ComponentType, ReactInstance, Suspense } from 'react';
import ReactDom from 'react-dom';

export function createRoot(id = 'layer-root'): HTMLElement {
  let root = document.getElementById(id);

  if (root) return root;
  root = document.createElement('div');
  root.setAttribute('id', id);
  document.body.appendChild(root);

  return root;
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
  /**
   * 组件挂载根节点
   */
  root: HTMLElement
}

export type LayerComponentProps<P> = {
  layer?: LayerType<P>;
} & P

export type LC<P> = ComponentType<LayerComponentProps<P>>

export function create<P>(
    Component: LC<P>,
    root?: HTMLElement | string,
): LayerType<P>

export function create<P>(
    Component: Promise<{default: LC<P>}>,
    root?: HTMLElement | string,
): Promise<LayerType<P>>

/**
 * 创建浮层
 * @param Component 子组件引用
 * @param root 挂载的根节点，默认#layer-root
 */
export function create<P>(
    Component: LC<P> | Promise<{default: LC<P>}>,
    root?: HTMLElement | string,
): LayerType<P> | Promise<LayerType<P>> {
  const layer: LayerType<P> = {
    instance: null,
    render() {},
    root: typeof root === 'string' ? createRoot(root) : root || createRoot(),
    destroy() {
      const {root} = layer;

      ReactDom.unmountComponentAtNode(root);
      layer.instance = null;
      if (root.parentNode && !root.children.length)
        root.parentNode.removeChild(root);
    }
  }

  function createElement(Comp: any, props: P) {
    function ref(layerComponent: ReactInstance | null) {
      if (layerComponent) layer.instance = layerComponent;
    }

    return Comp.prototype && Comp.prototype.render ? (
      <Comp ref={ref} layer={layer} {...props} />
    ) : (
      <Comp layer={layer} {...props} />
    );
  }

  if (Component instanceof Promise) {
    layer.render = function (props: P) {
      const LazyComponent = React.lazy<LC<P>>(() => Component);
      const element = (
        <Suspense fallback={null}>
          {createElement(LazyComponent, props)}
        </Suspense>
      );

      return ReactDom.render(element, layer.root);
    }

    return Component.then(() => layer);
  } else {
    layer.render = function (props: P) {
      return ReactDom.render(createElement(Component, props), layer.root)
    };
    return layer;
  }
}

import { ComponentType, ReactInstance } from 'react';
export declare function getLayerRoot(id?: string): HTMLElement;
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
    root: HTMLElement;
}
export declare type LayerComponentProps<P> = {
    layer?: LayerType<P>;
} & P;
export declare type LC<P> = ComponentType<LayerComponentProps<P>>;
/**
 * 创建浮层
 * @param Component 子组件引用
 * @param root 挂载的根节点，默认#layer-root
 */
export declare function create<P>(Component: LC<P>, root?: HTMLElement): LayerType<P>;

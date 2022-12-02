/* eslint-disable @typescript-eslint/ban-types */

import React, { forwardRef } from 'react'
import $ from '@master/literal'

type baseType = string | number | Record<string, boolean>;
type baseLoopType = baseType | Array<baseType>;
type extraType = { className?: baseLoopType | undefined, [key: string]: any };
type TagParams = Array<[TemplateStringsArray, any[]]>;

type IntrinsicElementsKeys = keyof JSX.IntrinsicElements;
type MasterComponentProps<K extends IntrinsicElementsKeys | React.ComponentType<any>, E extends Object = {}> = Omit<K extends IntrinsicElementsKeys
    ? JSX.IntrinsicElements[K] extends React.DetailedHTMLProps<infer Attributes, infer Element>
    ? Attributes & Partial<E>
    : never
    : K extends React.ComponentType<infer U>
    ? U & Partial<E>
    : never, 'className' | 'ref'> & extraType;
type MasterExoticComponent<K extends IntrinsicElementsKeys | React.ComponentType<any>, E extends Object = {}> = React.ForwardRefExoticComponent<MasterComponentProps<K, E> & React.RefAttributes<K>> & { tag: K, params: TagParams };

type ParamsType<K extends IntrinsicElementsKeys | React.ComponentType<any>, E extends Object = {}> = Array<((props: MasterComponentProps<K, E>) => baseLoopType | undefined) | baseLoopType>;
type ReturnType<K extends IntrinsicElementsKeys | React.ComponentType<any>, E extends Object = {}> = <F extends TemplateStringsArray | MasterExoticComponent<any>>(
    firstParam: F,
    ...params: F extends TemplateStringsArray ? ParamsType<K, E> : never
) => (F extends TemplateStringsArray
    ? MasterExoticComponent<K, E>
    : ReturnType<K, E>);

const element: {
    [key in IntrinsicElementsKeys]: <F extends TemplateStringsArray | MasterExoticComponent<any, any>, E extends Object = {}>(
        firstParam: F,
        ...params: F extends TemplateStringsArray ? ParamsType<key, E> : never
    ) => (F extends TemplateStringsArray ? MasterExoticComponent<key, E> : ReturnType<key, E>)
} & {
    <F extends TemplateStringsArray | MasterExoticComponent<any> | React.ComponentType<any>, E extends Object = {}>(
        firstParam: F,
        ...params: F extends TemplateStringsArray ? ParamsType<'div', E> : never
    ): (F extends TemplateStringsArray

        ? MasterExoticComponent<'div', E>
        : F extends MasterExoticComponent<infer K, infer E>
        ? ReturnType<K, E>
        : F extends React.ComponentType<any>
        ? ReturnType<F>
        : never);
} = new Proxy(
    ((firstParam, ...params) => {
        return (Array.isArray(firstParam) && 'raw' in firstParam)
            ? element.div(firstParam as any, ...params)
            : handle(firstParam.tag ?? firstParam, firstParam.params, firstParam.displayName)
    }) as any,
    {
        get: function (target, Tag: IntrinsicElementsKeys) {
            if (!(Tag in target)) {
                target[Tag] = handle(Tag, undefined, 'master.' + Tag)
            }
            return target[Tag]
        }
    }
)

function handle<K extends IntrinsicElementsKeys | React.ComponentType<any>, E extends Object = {}>(Tag: K, tagParams: TagParams, displayName: string) {
    const generateFunctionComponent = (defaultClassNames: TemplateStringsArray, ...params: any[]) => {
        const newTagParams: TagParams = [...(tagParams || []), [defaultClassNames, params]]
        const component = forwardRef<K, MasterComponentProps<K, E>>((props, ref) => {
            const classNames = []
            for (const eachNewTagParam of newTagParams) {
                const newParams = [...eachNewTagParam[1]]
                for (let i = 0; i < newParams.length; i++) {
                    if (typeof newParams[i] === 'function') {
                        newParams[i] = newParams[i](props) || ''
                    }
                }

                classNames.push($(eachNewTagParam[0], ...newParams))
            }

            const newProps: Record<string, any> = {}
            for (const key in props) {
                if (!key.startsWith('$')) {
                    newProps[key] = props[key]
                }
            }

            // @ts-ignore
            return <Tag ref={ref} {...newProps} className={$(classNames, props.className)} />
        }) as any as MasterExoticComponent<K, E>

        component.displayName = displayName
        component.tag = Tag
        component.params = newTagParams
        return component
    }

    return (...params: any[]) => {
        const firstParam = params[0]
        let newTagParams = tagParams || []
        if (firstParam.params) {
            newTagParams = [...newTagParams, ...firstParam.params]
        }
        return Array.isArray(firstParam) && 'raw' in firstParam
            ? generateFunctionComponent(firstParam, ...params.slice(1))
            : handle(Tag, newTagParams, firstParam.displayName)
    }
}

export default element
import React, { forwardRef } from 'react'
import line from 'to-line'

type baseType = string | number | Record<string, boolean> | { $: string, [key: string]: string | number | boolean } | Record<string, Record<string, string>>;
type baseLoopType = baseType | Array<baseType>;
type extraType = { className?: baseLoopType | undefined, [key: string]: any };
type TagParams = Array<[TemplateStringsArray, any[]]>;

type IntrinsicElementsKeys = keyof JSX.IntrinsicElements;
type MasterComponentProps<K extends IntrinsicElementsKeys | React.ComponentType<any>, E extends object = object> = Omit<K extends IntrinsicElementsKeys
    ? JSX.IntrinsicElements[K] extends React.DetailedHTMLProps<infer Attributes, infer Element>
        ? Attributes & Partial<E>
        : never
    : K extends React.ComponentType<infer U>
        ? U & Partial<E>
        : never, 'className' | 'ref'> & extraType;
type MasterExoticComponent<K extends IntrinsicElementsKeys | React.ComponentType<any>, E extends object = object> = React.ForwardRefExoticComponent<MasterComponentProps<K, E> & React.RefAttributes<K>> & { tag: K, params: TagParams };

type ParamsType<K extends IntrinsicElementsKeys | React.ComponentType<any>, E extends object = object> = Array<((props: MasterComponentProps<K, E>) => baseLoopType | undefined) | baseLoopType>;
type ReturnType<K extends IntrinsicElementsKeys | React.ComponentType<any>, E extends object = object> = <F extends TemplateStringsArray | MasterExoticComponent<any> | baseType>(
    firstParam: F,
    ...params: F extends MasterExoticComponent<any, any>
        ? never
        : ParamsType<K, E>
) => (F extends MasterExoticComponent<any, any>
    ? ReturnType<K, E>
    : MasterExoticComponent<K, E>)

const style: {
    [key in IntrinsicElementsKeys]: <F extends TemplateStringsArray | MasterExoticComponent<any, any> | baseType, E extends object = object>(
        firstParam: F,
        ...params: F extends MasterExoticComponent<any, any>
            ? never
            : ParamsType<key, E>
    ) => (F extends MasterExoticComponent<any, any>
        ? ReturnType<key, E>
        : MasterExoticComponent<key, E>)
} & {
    <F extends TemplateStringsArray | MasterExoticComponent<any> | React.ComponentType<any> | baseType, E extends object = object>(
        firstParam: F,
        ...params: F extends MasterExoticComponent<any, any>
            ? never
            : ParamsType<'div', E>
    ): (F extends MasterExoticComponent<infer K, infer E>
        ? ReturnType<K, E>
        : F extends React.ComponentType<any>
        ? ReturnType<F>
        : MasterExoticComponent<'div', E>)
} = new Proxy(
    ((firstParam, ...params) => {
        return (Array.isArray(firstParam) && 'raw' in firstParam || typeof firstParam !== 'object' || !('render' in firstParam))
            ? style.div(firstParam as any, ...params)
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

function handle<K extends IntrinsicElementsKeys | React.ComponentType<any>, E extends object = object>(Tag: K, tagParams: TagParams, displayName: string) {
    const generateFunctionComponent = (defaultClassNames: TemplateStringsArray, ...params: any[]) => {
        const newTagParams: TagParams = [...(tagParams || []), [defaultClassNames, params]]
        const component = forwardRef<K, MasterComponentProps<K, E>>((props, ref) => {
            const conditionalClassesMaps: Record<string, string | boolean | number>[] = []
            const propClassesMap: Record<string, Record<string, string>> = {}
            const classNames = []
            for (const eachNewTagParam of newTagParams) {
                const newParams = [...eachNewTagParam[1]]
                for (let i = 0; i < newParams.length; i++) {
                    let newParam = newParams[i]
                    if (typeof newParam === 'function') {
                        newParam = newParams[i] = newParam(props) || ''
                    }
                    if (typeof newParam === 'object' && !Array.isArray(newParam)) {
                        const keys = Object.keys(newParam)
                        if (keys.length) {
                            const handleCombinationsCondition = () => {
                                newParams[i] = ''

                                let duplicated = false
                                for (const conditionalClassesMap of conditionalClassesMaps) {
                                    const entries = Object.entries(conditionalClassesMap)
                                    if (
                                        entries.length === keys.length
                                        && entries.every(([key, value]) => keys.includes(key) && (key === '$' || newParam[key] === value))
                                    ) {
                                        duplicated = true
                                        conditionalClassesMap['$'] = newParam['$']
                                        break
                                    }
                                }

                                if (!duplicated) {
                                    conditionalClassesMaps.push(newParam)
                                }
                            }

                            switch (typeof newParam[keys[0]]) {
                                case 'object':
                                    newParams[i] = ''

                                    for (const name of keys) {
                                        if (name in propClassesMap) {
                                            const classesMap = propClassesMap[name]
                                            const newClassesMap = newParam[name]
                                            for (const value in newClassesMap) {
                                                classesMap[value] = newClassesMap[value]
                                            }
                                        } else {
                                            propClassesMap[name] = newParam[name]
                                        }
                                    }
                                    break
                                case 'string':
                                case 'number':
                                    handleCombinationsCondition()
                                    break
                                case 'boolean':
                                    if (keys.includes('$')) {
                                        handleCombinationsCondition()
                                    }
                                    break
                            }
                        } else {
                            newParams[i] = ''
                        }
                    }
                }

                classNames.push(line(eachNewTagParam[0], ...newParams))
            }

            for (const conditionalClassesMap of conditionalClassesMaps) {
                if (
                    Object.entries(conditionalClassesMap).every(([name, value]) => {
                        if (name === '$')
                            return true

                        const propValue = props[name] ?? props['$' + name]
                        if (value === propValue || value === false && propValue === undefined)
                            return true
                    })
                ) {
                    classNames.push(conditionalClassesMap['$'])
                }
            }

            for (const name in propClassesMap) {
                const value = props[name] || props['$' + name]
                if (value) {
                    const classes = propClassesMap[name][value]
                    if (classes) {
                        classNames.push(classes)
                    }
                }
            }

            const newProps: Record<string, any> = {}
            for (const key in props) {
                if (!key.startsWith('$')) {
                    newProps[key] = props[key]
                }
            }

            // @ts-ignore
            return <Tag ref={ref} {...newProps} className={line(classNames, props.className)} />
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

        if (Array.isArray(firstParam) && 'raw' in firstParam) {
            return generateFunctionComponent(firstParam as TemplateStringsArray, ...params.slice(1))
        } else if (typeof firstParam === 'object' && 'render' in firstParam) {
            return handle(Tag, newTagParams, firstParam.displayName)
        } else {
            const templateStringsArray = []
            const newParams = []
            for (const eachParam of params) {
                (typeof eachParam === 'string' ? templateStringsArray : newParams).push(eachParam)
            }

            return generateFunctionComponent(templateStringsArray as any, ...newParams)
        }
    }
}

export default style
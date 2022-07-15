import React, { forwardRef } from 'react'

type baseType = string | number | Record<string, boolean>;
type baseLoopType = baseType | Array<baseType>;
type extraType = { className?: baseLoopType | undefined, [key: string]: any };
const element: {
    [key in keyof JSX.IntrinsicElements]: (defaultClassNames: TemplateStringsArray, ...params: Array<((props: Omit<JSX.IntrinsicElements[key], 'className'> & extraType) => baseLoopType | undefined) | baseLoopType>) => React.FunctionComponent<Omit<JSX.IntrinsicElements[key], 'className'> & extraType>
} = new Proxy(
    {} as any,
    {
        get: function (target, Tag: string) {
            if (!(Tag in target)) {
                target[Tag] = (() => {
                    return (defaultClassNames: TemplateStringsArray, ...params: any[]) => {
                        const component = forwardRef((props: any, ref) => {
                            const newParams = [...params];
                            for (let i = 0; i < newParams.length; i++) {
                                if (typeof newParams[i] === 'function') {
                                    newParams[i] = newParams[i](props) || '';
                                }
                            }

                            return <Tag ref={ref} {...props} className={$(defaultClassNames, ...newParams, props.className)} />;
                        })
                        component.displayName = Tag;
                        return component;
                    };
                })();
            }
            return target[Tag];
        }
    }
);

function $(defaultClassNames: TemplateStringsArray, ...params: baseLoopType[]) {
    let newClassName = '';
    for (let i = 0; i < defaultClassNames.length; i++) {
        newClassName += defaultClassNames[i];
        if (i < params.length) {
            (function handleDeep(value: any, delimiter = '') {
                if (typeof value === 'string' || typeof value === 'number') {
                    newClassName += delimiter + value
                } else if (typeof value === 'object') {
                    if (Array.isArray(value)) {
                        for (const eachVal of value) {
                            handleDeep(eachVal, ' ');
                        }
                    } else {
                        for (const key in value) {
                            if (value[key]) {
                                newClassName += ' ' + key
                            }
                        }
                    }
                }
            })(params[i])
        }
    }
    return newClassName
        .trim()
        .replace(/\s\s+/g, ' ');
}

export default element
export { $ }
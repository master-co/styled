import React from 'react';

type baseType = string | number | Record<string, boolean>;
const el: {
    [key in keyof JSX.IntrinsicElements]: (defaultClassNames: TemplateStringsArray) => React.FunctionComponent<Omit<JSX.IntrinsicElements[key], 'className'> & { className?: baseType | Array<baseType> }>
} = new Proxy(
    {} as any,
    {
        get: function (target, tag: string) {
            if (!(tag in target)) {
                target[tag] = createElement(tag);
            }

            return target[tag];
        }
    }
);

function createElement(Tag: string) {
    return (defaultClassNames: TemplateStringsArray) => {
        function component(props: any) {
            return <Tag { ...props } className = { clsx(defaultClassNames, props.className) } > </Tag>;
        }
        component.displayName = Tag;

        return component;
    };
}

function clsx(...args: any[]) {
    const results: any[] = [];

    const handleDeep = (value: any) => {
        if (value) {
            if (typeof value === 'string' || typeof value === 'number') {
                results.push(value);
            } else if (typeof value === 'object') {
                if (Array.isArray(value)) {
                    for (const eachVal of value) {
                        handleDeep(eachVal);
                    }
                } else {
                    for (const key in value) {
                        if (value[key]) {
                            results.push(key);
                        }
                    }
                }
            }
        }
    };

    for (const eachArg of args) {
        handleDeep(eachArg);
    }

    return results.join(' ');
}

export { el };
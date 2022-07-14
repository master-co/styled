import React, { forwardRef } from 'react'
import clsx from 'clsx'

type baseType = string | number | Record<string, boolean>
const el: {
    [key in keyof JSX.IntrinsicElements]: (defaultClassNames: TemplateStringsArray) => React.FunctionComponent<Omit<JSX.IntrinsicElements[key], 'className'> & { className?: baseType | Array<baseType> }>
} = new Proxy({} as any, {
    get: function (target, tag: string) {
        if (!(tag in target)) {
            target[tag] = createElement(tag)
        }
        return target[tag]
    }
}
)

function createElement(Tag: string) {
    return (defaultClassNames: TemplateStringsArray) => {
        const component = forwardRef((props: any, ref) => {
            return <Tag {...props} ref={ref} className={clsx(defaultClassNames, props.className)} />
        })
        component.displayName = Tag
        return component
    }
}

export default el
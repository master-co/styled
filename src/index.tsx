import React, { forwardRef } from 'react';
import $ from '@master/literal';

type baseType = string | number | Record<string, boolean>;
type baseLoopType = baseType | Array<baseType>;
type extraType = { className?: baseLoopType | undefined, [key: string]: any };
type TagParams = Array<[TemplateStringsArray, any[]]>;

type IntrinsicElementsKeys = keyof JSX.IntrinsicElements;
type MasterComponentProps<T extends React.ComponentType<any> | IntrinsicElementsKeys, P extends Object> = React.ComponentPropsWithoutRef<T> & React.RefAttributes<T> & P;
type MasterExoticComponent<T extends React.ComponentType<any> | IntrinsicElementsKeys, P extends Object> = React.ForwardRefExoticComponent<MasterComponentProps<T, P>> & { tag?: T, params?: TagParams };
type ReturnType<T extends IntrinsicElementsKeys, P extends Object> = <F extends TemplateStringsArray | MasterExoticComponent<T, P>>(firstParam: F, ...params: any[]) => (F extends TemplateStringsArray ? MasterExoticComponent<T, P> : ReturnType<T, P>);

const element: {
    [key in IntrinsicElementsKeys]: <F extends TemplateStringsArray | MasterExoticComponent<any, any>>(defaultClassNames: F, ...params: Array<((props: Omit<JSX.IntrinsicElements[key], 'className'> & extraType) => baseLoopType | undefined) | baseLoopType>) => F extends TemplateStringsArray ? MasterExoticComponent<key, Omit<JSX.IntrinsicElements[key], 'className'> & extraType> : ReturnType<key, Omit<JSX.IntrinsicElements[key], 'className'> & extraType>
} & { <T extends IntrinsicElementsKeys, P extends Object>(Element: MasterExoticComponent<T, P>): ReturnType<T, P>} = new Proxy(
    ((Element) => handle(Element.tag, Element.params, Element.displayName)) as any,
    {
        get: function (target, Tag: IntrinsicElementsKeys) {
            if (!(Tag in target)) {
                target[Tag] = handle(Tag, undefined, 'master.' + Tag);
            }
            return target[Tag];
        }
    }
);

function handle<T extends React.ComponentType<any> | IntrinsicElementsKeys>(Tag: T, tagParams: TagParams, displayName: string) {
    const generateFunctionComponent = (defaultClassNames: TemplateStringsArray, ...params: any[]) => {
        const newTagParams: TagParams = [...(tagParams || []), [defaultClassNames, params]];
        const component: MasterExoticComponent<T, any> = forwardRef<any, any>((props, ref) => {
            const classNames = [];
            for (const eachNewTagParam of newTagParams) {
                const newParams = [...eachNewTagParam[1]];
                for (let i = 0; i < newParams.length; i++) {
                    if (typeof newParams[i] === 'function') {
                        newParams[i] = newParams[i](props) || '';
                    }
                }

                classNames.push($(eachNewTagParam[0], ...newParams));
            }
    
            return <Tag ref={ref} {...props} className={$(classNames, props.className)} />;
        });

        component.displayName = displayName;
        component.tag = Tag;
        component.params = newTagParams;
        return component;
    };

    return (...params: any[]) => {
        const firstParam = params[0];
        let newTagParams = tagParams || [];
        if (firstParam.params) {
            newTagParams = [...newTagParams, ...firstParam.params]
        }
        return Array.isArray(firstParam) && 'raw' in firstParam
            ? generateFunctionComponent(params[0], ...params.slice(1))
            : handle(Tag, newTagParams, firstParam.displayName);
    };
}

export default element;
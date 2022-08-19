import React, { forwardRef, PropsWithoutRef } from 'react';
import $ from '@master/literal';

type baseType = string | number | Record<string, boolean>;
type baseLoopType = baseType | Array<baseType>;
type extraType = { className?: baseLoopType | undefined, [key: string]: any };
type TagParams = Array<[TemplateStringsArray, any[]]>;

type IntrinsicElementsKeys = keyof JSX.IntrinsicElements;
type MasterComponentProps<K extends IntrinsicElementsKeys> = Omit<JSX.IntrinsicElements[K], 'className'> & extraType;
type MasterExoticComponent<K extends IntrinsicElementsKeys> = React.ForwardRefExoticComponent<PropsWithoutRef<MasterComponentProps<K>> & React.RefAttributes<K>> & { tag?: K, params?: TagParams };
type ParamsType<K extends IntrinsicElementsKeys> = Array<((props: MasterComponentProps<K>) => baseLoopType | undefined) | baseLoopType>;
type ReturnType<K extends IntrinsicElementsKeys> = <F extends TemplateStringsArray | MasterExoticComponent<any>>(firstParam: F, ...params: F extends TemplateStringsArray ? ParamsType<K> : never) => (F extends TemplateStringsArray ? MasterExoticComponent<K> : ReturnType<K>);

const element: {
    [key in IntrinsicElementsKeys]: <F extends TemplateStringsArray | MasterExoticComponent<any>>(defaultClassNames: F, ...params: ParamsType<key>) => F extends TemplateStringsArray ? MasterExoticComponent<key> : ReturnType<key>
} & { <K extends IntrinsicElementsKeys>(Element: MasterExoticComponent<K>): ReturnType<K> } = new Proxy(
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

function handle<K extends IntrinsicElementsKeys>(Tag: K, tagParams: TagParams, displayName: string) {
    const generateFunctionComponent = (defaultClassNames: TemplateStringsArray, ...params: any[]) => {
        const newTagParams: TagParams = [...(tagParams || []), [defaultClassNames, params]];
        const component: MasterExoticComponent<K> = forwardRef<K, MasterComponentProps<K>>((props, ref) => {
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
    
            //@ts-ignore
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
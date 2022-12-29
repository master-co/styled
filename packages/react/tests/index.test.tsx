import style from '../src/index'
import React, { forwardRef } from 'react'
import ReactDOMServer from 'react-dom/server'

const { renderToStaticMarkup } = ReactDOMServer

const Button = style.button<TemplateStringsArray, { $color: string }>`
    inline-flex center-content
    ${['font:14', 'font:semibold']}
    ${{ test: true, test2: false, test3: true }}
    fg:white px:18 h:40 r:4
    bg:${({ $color }) => $color}
`

test('Basic', () => {
    expect(renderToStaticMarkup(<Button $color="red">Basic</Button>))
        .toBe('<button class="inline-flex center-content font:14 font:semibold test test3 fg:white px:18 h:40 r:4 bg:red">Basic</button>')
})

test('Extend', () => {
    const ExtendButton = style(Button)`bg:${({ $color }: any) => $color}-54:hover`
    expect(renderToStaticMarkup(<ExtendButton $color="blue">Extend</ExtendButton>))
        .toBe('<button class="inline-flex center-content font:14 font:semibold test test3 fg:white px:18 h:40 r:4 bg:blue bg:blue-54:hover">Extend</button>')

    const AButton = style.a<typeof Button, { $color: string }>(Button)``
    expect(renderToStaticMarkup(<AButton $color="purple">Tag Extend</AButton>))
        .toBe('<a class="inline-flex center-content font:14 font:semibold test test3 fg:white px:18 h:40 r:4 bg:purple">Tag Extend</a>')

    const CustomComponent = forwardRef((props: { $type: string }, ref: any) => <a ref={ref} {...props}></a>)
    const ExtendCustomComponent = style(CustomComponent)`inline-flex center-content font:14 font:semibold ${(props) => props.$type}`
    expect(renderToStaticMarkup(<ExtendCustomComponent $type="CustomType">Extend Custom Component</ExtendCustomComponent>))
        .toBe('<a class="inline-flex center-content font:14 font:semibold CustomType">Extend Custom Component</a>')
})

test('Prop composition', () => {
    const Button = style.button`font:semibold rounded
        ${{
            intent: {
                primary: 'bg:blue-50 fg:white bg:blue-60:hover',
                secondary: 'bg:white fg:gray-80 b:gray-40 bg:gray-50:hover',
            },
            size: {
                sm: 'font:20 py:1 px:2',
                md: 'font:16 py:2 px:4'
            }
        }}
        ${{ intent: 'primary', size: 'md', $: 'uppercase' }}
        ${({ $intent, $size }) => $intent && $size && 'font:italic'}
    `
    expect(renderToStaticMarkup(<Button $intent="primary" $size="md" />))
        .toBe('<button class="font:semibold rounded font:italic uppercase bg:blue-50 fg:white bg:blue-60:hover font:16 py:2 px:4"></button>')

    expect(renderToStaticMarkup(<Button intent="secondary" />))
        .toBe('<button intent="secondary" class="font:semibold rounded bg:white fg:gray-80 b:gray-40 bg:gray-50:hover"></button>')

    const ExtendButton = style(Button)`
        ${{
            intent: {
                primary: 'bg:blue-70 fg:black bg:blue-80:hover'
            },
            size: {
                lg: 'font:32 py:5 px:7'
            }
        }}
        ${{ intent: 'primary', size: 'md', $: 'lowercase' }}
    `
    expect(renderToStaticMarkup(<ExtendButton $intent="primary" $size="md" />))
        .toBe('<button class="font:semibold rounded font:italic bg:blue-70 fg:black bg:blue-80:hover font:16 py:2 px:4"></button>')

    expect(renderToStaticMarkup(<ExtendButton intent="secondary" />))
        .toBe('<button intent="secondary" class="font:semibold rounded bg:white fg:gray-80 b:gray-40 bg:gray-50:hover"></button>')

    expect(renderToStaticMarkup(<ExtendButton intent="secondary" $size="lg" />))
        .toBe('<button intent="secondary" class="font:semibold rounded bg:white fg:gray-80 b:gray-40 bg:gray-50:hover font:32 py:5 px:7"></button>')
})

test('Alternative syntax', () => {
    const Div = style(
        'font:semibold rounded',
        {
            intent: {
                primary: 'bg:blue-50 fg:white bg:blue-60:hover',
                secondary: 'bg:white fg:gray-80 b:gray-40 bg:gray-50:hover',
            },
            size: {
                sm: 'font:20 py:1 px:2',
                md: 'font:16 py:2 px:4'
            }
        },
        { intent: 'primary', size: 'md', $: 'uppercase' },
        ({ $intent, $size }) => $intent && $size && 'font:italic'
    )
    expect(renderToStaticMarkup(<Div $intent="primary" $size="md" />))
        .toBe('<div class="font:semibold rounded font:italic uppercase bg:blue-50 fg:white bg:blue-60:hover font:16 py:2 px:4"></div>')

    const Button = style.button(
        'font:semibold rounded',
        {
            intent: {
                primary: 'bg:blue-50 fg:white bg:blue-60:hover',
                secondary: 'bg:white fg:gray-80 b:gray-40 bg:gray-50:hover',
            },
            size: {
                sm: 'font:20 py:1 px:2',
                md: 'font:16 py:2 px:4'
            }
        },
        {
            HIHI: false
        },
        { intent: 'primary', size: 'md', disabled: false, $: 'uppercase' },
        ({ $intent, $size }) => $intent && $size && 'font:italic'
    )
    expect(renderToStaticMarkup(<Button $intent="primary" $size="md" />))
        .toBe('<button class="font:semibold rounded font:italic uppercase bg:blue-50 fg:white bg:blue-60:hover font:16 py:2 px:4"></button>')

    const ExtendButton = style(Button)(
        {
            intent: {
                primary: 'bg:blue-70 fg:black bg:blue-80:hover'
            },
            size: {
                lg: 'font:32 py:5 px:7'
            }
        },
        { intent: 'primary', size: 'md', disabled: true, $: 'lowercase' }
    )

    expect(renderToStaticMarkup(<ExtendButton disabled $intent="primary" $size="md" />))
        .toBe('<button disabled="" class="font:semibold rounded font:italic lowercase bg:blue-70 fg:black bg:blue-80:hover font:16 py:2 px:4"></button>')
})

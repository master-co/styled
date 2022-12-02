import element from '../src/index'
import React, { forwardRef } from 'react'
import ReactDOMServer from 'react-dom/server'

const Button = element.button<TemplateStringsArray, { $color: string }>`
    inline-flex center-content
    ${['font:14', 'font:semibold']}
    ${{ test: true, test2: false, test3: true }}
    font:white px:18 h:40 r:4
    bg:${({ $color }) => $color}
`

test('Basic', () => {
    expect(ReactDOMServer.renderToStaticMarkup(<Button $color="red">Basic</Button>)).toBe('<button class="inline-flex center-content font:14 font:semibold test test3 font:white px:18 h:40 r:4 bg:red">Basic</button>')
})

test('Extend', () => {
    const ExtendButton = element(Button)`bg:${({ $color }: any) => $color}-54:hover`
    expect(ReactDOMServer.renderToStaticMarkup(<ExtendButton $color="blue">Extend</ExtendButton>)).toBe('<button class="inline-flex center-content font:14 font:semibold test test3 font:white px:18 h:40 r:4 bg:blue bg:blue-54:hover">Extend</button>')

    const AButton = element.a<typeof Button, { $color: string }>(Button)``
    expect(ReactDOMServer.renderToStaticMarkup(<AButton $color="purple">Tag Extend</AButton>)).toBe('<a class="inline-flex center-content font:14 font:semibold test test3 font:white px:18 h:40 r:4 bg:purple">Tag Extend</a>')

    const CustomComponent = forwardRef((props: { $type: string }, ref: any) => <a ref={ref} {...props}></a>)
    const ExtendCustomComponent = element(CustomComponent)`inline-flex center-content font:14 font:semibold ${(props) => props.$type}`
    expect(ReactDOMServer.renderToStaticMarkup(<ExtendCustomComponent $type="CustomType">Extend Custom Component</ExtendCustomComponent>)).toBe('<a class="inline-flex center-content font:14 font:semibold CustomType">Extend Custom Component</a>')
})


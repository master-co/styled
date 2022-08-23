<br><br>
<div align="center">

<p align="center">
    <img src="https://raw.githubusercontent.com/master-co/package/document/images/logo-and-text.svg" alt="logo" width="142">
</p>
<p align="center">
    <b><!-- name -->@master/style-element.react<!----></b>
</p>
<p align="center"><!-- package.description -->Quickly create reusable React elements driven by class names. ~800B<!----></p>
<p align="center">
<!-- badges.map((badge) => `\n[![${badge.alt}](${badge.src})](${badge.href})`).join('&nbsp;')-->

[![MIT License](https://flat.badgen.net/github/license/master-co/style-element.react?color=yellow)](https://github.com/master-co/css/blob/main/LICENSE)
[![Latest Release](https://flat.badgen.net/npm/v/@master/style-element.react?icon=npm&label&color=yellow)](https://www.npmjs.com/package/@master/style-element.react)
[![Bundle Size](https://flat.badgen.net/bundlephobia/minzip/@master/style-element.react?icon=packagephobia&label&color=yellow)](https://bundlephobia.com/package/@master/style-element.react 'gzip bundle size (including dependencies)')
[![Package Size](https://flat.badgen.net/badgesize/brotli/https://cdn.jsdelivr.net/npm/@master/style-element.react?icon=jsdelivr&label&color=yellow)](https://unpkg.com/@master/style-element.react 'brotli package size (without dependencies)')
[![Github](https://flat.badgen.net/badge/icon/master-co%2Fstyle-element.react?icon=github&label&color=yellow)](https://github.com/master-co/style-element.react)
[![CI](https://flat.badgen.net/github/status/master-co/style-element.react/main/ci/circleci?icon=circleci)](https://circleci.com/gh/master-co/workflows/style-element.react/tree/main)
<!-- -->
</p>
</div>

🔴 Traditionally, you would extract a reusable element into a functional component.
```jsx
function Button(props) {
    return (
        <button {...props} className={"inline-flex font:14" + (props.className ? ' ' + props.className : '')}>
            {props.children}
        </button>
    )
}
```
🟢 Now, implement the same in one line with **~80% code less**
```jsx
const Button = el.button`inline-flex font:14`
```
---
Then apply it as usual:
```jsx
export default function App() {
    return (
        <Button className="uppercase">submit</Button>
    )
}
```

###### On this page

- [Features](#features)
- [Install](#install)
- [Import](#import)
- [Usage](#usage)
  - [Create a basic styled element](#create-a-basic-styled-element)
  - [Apply additional class names](#apply-additional-class-names)
  - [Apply class names based on properties](#apply-class-names-based-on-properties)
  - [Transform tag names](#transform-tag-names)
  - [Extend styled elements](#extend-styled-elements)
- [Inspiration](#inspiration)
- [Related](#related)

# Features
- Styled elements **driven by class names**.
- Quickly create **reusable** styled elements.
- Create styled elements with **less code**.
- **Extend** existing styled elements.
- **Conditionally construct class names** and strings with template literals.

# Install

```sh
npm install @master/style-element.react
```

# Import
```js
import el from '@master/style-element.react';
```

# Usage
Make it easier and faster to implement functional components using syntactic sugar.

## Create a basic styled element
```jsx
import React from 'react'
import el from '@master/style-element.react'

const Button = el.button`inline-flex font:14`

export default function App() {
    return (
        <Button>...</Button>
    )
}
```
rendered as:
```html
<button class="inline-flex font:14">...</button>
```

## Apply additional class names
Add `uppercase` for the button here.
```jsx
const Button = el.button`inline-flex font:14`

return (
    <Button className="uppercase">...</Button>
)
```
rendered as:
```html
<button class="inline-flex font:14 uppercase">...</button>
```

## Apply class names based on properties
```jsx
const Button = el.button`
    inline-flex
    font:14
    ${(props) => (props.color ? 'font:white bg:' + props.color : '')}
`

return (
    <Button color="blue">...</Button>
    <Button color="red">...</Button>
    <Button disabled>...</Button>
)
```
rendered as:
```html
<button class="inline-flex font:14 font:white bg:blue">...</button>
<button class="inline-flex font:14 font:white bg:red">...</button>
<button class="inline-flex font:14" disabled>...</button>
```

## Transform tag names
If you just want to transform a styled element tag name, leave `` empty.
```jsx
const Button = el.button`inline-flex font:14` // <button>
const Anchor = el.a(Button)`` // <button> -> <a>

return (
    <Button>Button</Button>
    <Anchor href="https://css.master.co" target="blank">Anchor</Anchor>
)
```
rendered as:
```html
<button class="inline-flex font:14">Button</button>
<a class="inline-flex font:14" href="https://css.master.co" target="blank">Anchor</a>
```
⚠️ The target to transform only accept styled elements.

## Extend styled elements
```jsx
const Button = el.button`inline-flex font:14`

 // extend Button with addtional class names
const Button1 = el(Button)`text:center`

// extend Button with addtional class names and transform it into <a>
const Button2 = el.a(Button)`italic`

// extend Button1 and Button2 with addtional class names
const Button3 = el(Button1)(Button2)`font:bold`

return (
    <Button>Button</Button>
    <Button1>Button 1</Button1>
    <Button2>Button 2</Button2>
    <Button3>Button 3</Button3>
)
```
rendered as:
```html
<button class="inline-flex font:14">Button</button>
<button class="inline-flex font:14 text:center">Button 1</button>
<a class="inline-flex font:14 italic">Button 2</a>
<button class="inline-flex font:14 text:center italic font:bold">Button 3</button>
```
⚠️ The target to extend only accept styled elements.

# Inspiration
Some of our core concepts and designs are inspired by these giants.
- **Template Literal** - The use of template literals as syntactic sugar for reusing components is inspired by [Styled Components](https://styled-components.com/).

# Related
- [@master/css](https://github.com/master-co/css) - A Virtual CSS language with enhanced syntax. ~13KB
- [@master/literal](https://github.com/master-co/literal) - Conditionally construct class names and strings with template literals. ~600B
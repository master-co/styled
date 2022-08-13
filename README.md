<br><br>
<div align="center">

<p align="center">
    <img src="https://raw.githubusercontent.com/master-co/package/document/images/logo-and-text.svg" alt="logo" width="142">
</p>
<p align="center">
    <b><!-- name -->@master/style-element.react<!----></b>
</p>
<p align="center"><!-- package.description -->Quickly create styled React elements with conditional class names.<!----></p>
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

###### On this page

- [Features and Purpose](#features-and-purpose)
- [Install](#install)
- [Import](#import)
- [Usage](#usage)
  - [Basic](#basic)
  - [Add additional class names](#add-additional-class-names)
  - [Apply class names based on properties](#apply-class-names-based-on-properties)
  - [Extend styled elements with additional class names](#extend-styled-elements-with-additional-class-names)
  - [Transform element tag names](#transform-element-tag-names)
- [Related](#related)

# Features and Purpose
- Styled elements **driven by class names**.
- Quickly create **reusable** styled elements.
- Create styled elements with **less code**.
- **Extend** existing styled elements.
- **Conditionally construct class names** and strings with template literals. [@master/literal](https://github.com/master-co/literal)

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

## Basic
```tsx
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
<button className="inline-flex font:14">...</button>
```

## Add additional class names
Add `uppercase` for the button here.
```tsx
const Button = el.button`inline-flex font:14`

return (
    <Button className="uppercase">...</Button>
)
```
rendered as:
```html
<button className="inline-flex font:14 uppercase">...</button>
```

## Apply class names based on properties
```tsx
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
<button className="inline-flex font:14 font:white bg:blue">...</button>
<button className="inline-flex font:14 font:white bg:red">...</button>
<button className="inline-flex font:14" disabled>...</button>
```

## Extend styled elements with additional class names
```tsx
const Button = el.button`inline-flex font:14`
const HomeButton = el(Button)`text:center p:12|20`

return (
    <Button>Button</Button>
    <HomeButton>Home Button</HomeButton>
)
```
rendered as:
```html
<button className="inline-flex font:14">Button</button>
<button className="inline-flex font:14 text:center p:12|20">Home Button</button>
```

## Transform element tag names
```tsx
const Button = el.button`inline-flex font:14` // <button>
const Anchor = el.a(Button) // <button> -> <a>
const Link = el.a(Button)`underline` // <button> -> <a> with `underline`

return (
    <Button>Button</Button>
    <Anchor href="https://css.master.co" target="blank">Anchor</Anchor>
    <Link href="#usage">Link</Link>
)
```
rendered as:
```html
<button className="inline-flex font:14">Button</button>
<a className="inline-flex font:14" href="https://css.master.co" target="blank">Anchor</a>
<a className="inline-flex font:14 underline" href="#usage">Link</a>
```

# Related
- [@master/literal](https://github.com/master-co/literal) - Conditionally construct class names and strings with template literals. ~600B
- [@master/css](https://github.com/master-co/css) - A Virtual CSS language with enhanced syntax. ~13KB
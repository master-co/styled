<br>
<div align="center">

<p align="center">
    <a href="https://master.co">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/33840671/205238939-3cf526f7-8d92-4fa0-8ca3-6c7e4c545f9c.svg">
            <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/33840671/205238945-3295c4f5-a88a-4b58-bca9-770fe7bf894e.svg">
            <img alt="Master CSS" src="https://user-images.githubusercontent.com/33840671/205238945-3295c4f5-a88a-4b58-bca9-770fe7bf894e.svg" width="100%">
        </picture>
    </a>
</p>
<p align="center">Quickly create reusable React elements driven by class names ~800B</p>

<p align="center">
    <a aria-label="GitHub release (latest by date including pre-releases)" href="https://github.com/master-co/style-element/releases">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/github/v/release/master-co/style-element?include_prereleases&color=212022&label=&style=for-the-badge&logo=github&logoColor=fff">
            <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/github/v/release/master-co/style-element?include_prereleases&color=f6f7f8&label=&style=for-the-badge&logo=github&logoColor=%23000">
            <img alt="NPM Version" src="https://img.shields.io/github/v/release/master-co/style-element?include_prereleases&color=f6f7f8&label=&style=for-the-badge&logo=github">
        </picture>
    </a>
    <a aria-label="NPM Package" href="https://www.npmjs.com/package/@master/style-element.react">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/dm/@master/style-element.react?color=212022&label=%20&logo=npm&style=for-the-badge">
            <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/npm/dm/@master/style-element.react?color=f6f7f8&label=%20&logo=npm&style=for-the-badge">
            <img alt="NPM package ( download / month )" src="https://img.shields.io/npm/dm/@master/style-element.react?color=f6f7f8&label=%20&logo=npm&style=for-the-badge">
        </picture>
    </a>
    <a aria-label="Discord Community" href="https://discord.gg/sZNKpAAAw6">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/discord/917780624314613760?color=212022&label=%20&logo=discord&style=for-the-badge">
            <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/discord/917780624314613760?color=f6f7f8&label=%20&logo=discord&style=for-the-badge">
            <img alt="Discord online" src="https://img.shields.io/discord/917780624314613760?color=f6f7f8&label=%20&logo=discord&style=for-the-badge">
        </picture>
    </a>
    <a aria-label="Follow @mastercorg" href="https://twitter.com/mastercorg">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/static/v1?label=%20&message=twitter&color=212022&logo=twitter&style=for-the-badge">
            <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/static/v1?label=%20&message=twitter&color=f6f7f8&logo=twitter&style=for-the-badge">
            <img alt="Follow @mastercorg" src="https://img.shields.io/static/v1?label=%20&message=twitter&color=f6f7f8&logo=twitter&style=for-the-badge">
        </picture>
    </a>
    <a aria-label="Github Actions" href="https://github.com/master-co/style-element/actions/workflows/release.yml">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/github/actions/workflow/status/master-co/style-element/release.yml?branch=beta&label=%20&message=twitter&color=212022&logo=githubactions&style=for-the-badge">
            <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/github/actions/workflow/status/master-co/style-element/release.yml?branch=beta&label=%20&message=twitter&color=f6f7f8&logo=githubactions&style=for-the-badge&logoColor=%23000">
            <img alt="Github release actions" src="https://img.shields.io/github/actions/workflow/status/master-co/style-element/release.yml?branch=beta&label=%20&message=twitter&color=f6f7f8&logo=githubactions&style=for-the-badge&logoColor=%23000">
        </picture>
    </a>
</p>

</div>

</div>

- Styled elements **driven by class names**.
- Quickly create **reusable** styled elements.
- Create styled elements with **less code**.
- **Extend** existing styled elements.
- **Conditionally construct class names** and strings with template literals.

</br>

## Concepts

<sub><sup>🔴</sup></sub> Traditionally, you would extract a reusable element into a functional component.
```jsx
function Button(props) {
    return (
        <button {...props} className={"inline-flex font:14" + (props.className ? ' ' + props.className : '')}>
            {props.children}
        </button>
    )
}
```
<sub><sup>🟢</sup></sub> Now, implement the same in one line with **~80% code less**
```jsx
const Button = style.button`inline-flex font:14`
```
---
then apply it as usual:
```jsx
export default function App() {
    return (
        <Button className="uppercase">submit</Button>
    )
}
```
rendered as:
```html
<button class="inline-flex font:14 uppercase">submit</button>
```

## Feature Overview
```jsx
const Button = style.button(
    'font:semibold rounded',
    {
        intent: {
            // <Button $intent="primary">
            primary: 'bg:blue-50 fg:white bg:blue-60:hover',
            // <Button $intent="secondary">
            secondary: 'bg:white fg:gray-80 b:gray-40 bg:gray-50:hover',
        },
        size: {
            // <Button $size="sm">
            sm: 'font:20 py:1 px:2',
            // <Button $size="md">
            md: 'font:16 py:2 px:4'
        }
    },
    // <Button $intent="primary" $size="md"> -> <button class="uppercase">
    { intent: 'primary', size: 'md', $: 'uppercase' },
    // <Button $color="blue"> -> <button class="bg:blue-40 bg:blue-50:hover">
    ({ $color }) => `bg:${$color}-40 bg:${$color}-50:hover`
)
```

## Installation

```sh
npm install @master/style-element.react
```
```js
import style from '@master/style-element.react';
```

## Getting Started
Make it easier and faster to implement functional components using syntactic sugar.

### Create a basic styled element
```jsx
import React from 'react'
import style from '@master/style-element.react'

const Button = style.button`inline-flex font:14`

export default function App() {
    return (
        <Button>...</Button>
        <button class="inline-flex font:14">...</button>
    )
}
```

### Apply additional class names
Add `uppercase` for the button here.
```jsx
const Button = style.button`inline-flex font:14`

return (
    <Button className="uppercase">...</Button>
    <button class="inline-flex font:14 uppercase">...</button>
)
```

### Apply class names based on properties
If the custom property name isn't the part of the element, you must prefix it with `$` to prevent it from being reflected to the element's attribute or getting type errors.
```jsx
const Button = style.button(
    'inline-flex font:14',
    ({ $color }) => $color && `font:white bg:${$color}`)
)

return (
    <Button $color="blue">...</Button>
    <button class="inline-flex font:14 font:white bg:blue">...</button>

    <Button $color="red">...</Button>
    <button class="inline-flex font:14 font:white bg:red">...</button>

    <Button disabled>...</Button>
    <button class="inline-flex font:14" disabled>...</button>
)
```

### Transform tag names
If you just want to transform a styled element tag name, leave `` empty.
```jsx
const Button = style.button`inline-flex font:14` <button>
const Anchor = style.a(Button)`` <button> -> <a>

return (
    <Button>Button</Button>
    <button class="inline-flex font:14">Button</button>

    <Anchor href="https://css.master.co" target="blank">Anchor</Anchor>
    // <a class="inline-flex font:14" href="https://css.master.co" target="blank">Anchor</a>
)
```

⚠️ Extended sources only accept styled elements.

### Extend styled elements
```jsx
const Button = style.button`inline-flex font:14`

 // extend Button with addtional class names
const Button1 = el(Button)`text:center`

// extend Button with addtional class names and transform it into <a>
const Button2 = style.a(Button)`italic`

// extend Button1 and Button2 with addtional class names
const Button3 = el(Button1)(Button2)`font:bold`

return (
    <Button>Button</Button>
    <button class="inline-flex font:14">Button</button>

    <Button1>Button 1</Button1>
    <button class="inline-flex font:14 text:center">Button 1</button>

    <Button2>Button 2</Button2>
    <a class="inline-flex font:14 italic">Button 2</a>

    <Button3>Button 3</Button3>
    <button class="inline-flex font:14 text:center italic font:bold">Button 3</button>
)
```

⚠️ Extended sources only accept styled elements.

## Related
- [@master/css](https://github.com/master-co/css) - A Virtual CSS language with enhanced syntax
- [@master/literal](https://github.com/master-co/literal) - Conditionally construct class names and strings with template literals. ~600B
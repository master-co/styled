<br>
<div align="center">

<p align="center">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/33840671/205238939-3cf526f7-8d92-4fa0-8ca3-6c7e4c545f9c.svg">
        <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/33840671/205238945-3295c4f5-a88a-4b58-bca9-770fe7bf894e.svg">
        <img alt="Master" src="https://user-images.githubusercontent.com/33840671/205238945-3295c4f5-a88a-4b58-bca9-770fe7bf894e.svg" width="100%">
    </picture>
</p>
<p align="center">Create reusable and extensible styled elements in one line</p>

<p align="center">
    <a aria-label="GitHub release (latest by date including pre-releases)" href="https://github.com/master-co/styled/releases">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/github/v/release/master-co/styled?include_prereleases&color=212022&label=&style=for-the-badge&logo=github&logoColor=fff">
            <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/github/v/release/master-co/styled?include_prereleases&color=f6f7f8&label=&style=for-the-badge&logo=github&logoColor=%23000">
            <img alt="NPM Version" src="https://img.shields.io/github/v/release/master-co/styled?include_prereleases&color=f6f7f8&label=&style=for-the-badge&logo=github">
        </picture>
    </a>
    <a aria-label="NPM Package" href="https://www.npmjs.com/package/class-variant">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/dm/class-variant?color=212022&label=%20&logo=npm&style=for-the-badge">
            <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/npm/dm/class-variant?color=f6f7f8&label=%20&logo=npm&style=for-the-badge">
            <img alt="NPM package ( download / month )" src="https://img.shields.io/npm/dm/class-variant?color=f6f7f8&label=%20&logo=npm&style=for-the-badge">
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
    <a aria-label="Github Actions" href="https://github.com/master-co/styled/actions/workflows/release.yml">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/github/actions/workflow/status/master-co/styled/release.yml?branch=rc&label=%20&message=twitter&color=212022&logo=githubactions&style=for-the-badge">
            <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/github/actions/workflow/status/master-co/styled/release.yml?branch=rc&label=%20&message=twitter&color=f6f7f8&logo=githubactions&style=for-the-badge&logoColor=%23000">
            <img alt="Github release actions" src="https://img.shields.io/github/actions/workflow/status/master-co/styled/release.yml?branch=rc&label=%20&message=twitter&color=f6f7f8&logo=githubactions&style=for-the-badge&logoColor=%23000">
        </picture>
    </a>
</p>

</div>

## Features
Vanilla.js, React, Vue.js, Tailwind CSS, and [Master CSS](https://rc.css.master.co/docs/installation) are available:

* ⚡️ Ultra-lightweight **~1.5KB**, powered by [`Proxy`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
* 🛡️ Type safety
* 🌈 Dynamically change styles based on properties
* 💫 Re-expand existing elements, like `NextLink`
* 🧩 Compatible with server and client components
* 🪄 Built-in first-class [`clsx`](https://github.com/lukeed/clsx) handling

## Why?
😰 Traditionally, creating a simple styled element using a FunctionalComponent is unpleasant.
```tsx
function Button(props) {
    return (
        <button {...props} className={"inline-flex font:14" + (props.className ? ' ' + props.className : '')}>
            {props.children}
        </button>
    )
}
```
🥳 Now it's in one line and ~80% code less.
```tsx
import styled from '@master/styled.react' // or .vue

const Button = styled.button`inline-flex font:14`
```
Then apply it as usual:
```tsx
export default function App() {
    return (
        <Button className="uppercase">submit</Button>
    )
}
```
It will be rendered as:
```html
<button class="inline-flex font:14 uppercase">submit</button>
```

## Getting Started
Install the package `npm i class-variant`, `npm i @master/styled.react`, or `npm i @master/styled.vue` depending on your framework:

### Vanilla JS
```js
import cv from 'class-variant'

const btn = cv(...params)
const btn = cv`...` // or

btn(props) // -> string
```

### React, Vue
```js
import styled from '@master/styled.react'
import styled from '@master/styled.vue' // or

const Button = styled.button(...params)
const Button = styled.button`...` // or

<Button {...props}>
```

## Basic usage
### Create a styled element
Declared in two ways: function or template literal, and parameters inherit all features of [`clsx`](https://github.com/lukeed/clsx).
```tsx
const Element = styled.div`flex text:center`
const Element = styled.div('flex text:center') // or

return (
    <Element className="uppercase">Hello World</Element>
)
```
```html
<div class="flex text:center uppercase">Hello World</div>
```

### Apply based on predefined variants
Predefine the class variant corresponding to the property.
```tsx
const Button = styled.button('flex', {
    $size: {
        sm: 'font:12 size:8x',
        md: 'font:14 size:12x'
    },
    disabled: 'opacity:.5',
    ...
})

return (
    <Button $size="sm" disabled />
)
```
```html
<button class="flex font:12 size:8x opacity:.5" disabled></button>
```
> ⚠️ Custom properties that are not element-owned properties must be prefixed with `$prop`, otherwise they will be reflected on the final element and an error may be thrown.

You can set default properties for elements.
```tsx
Button.defaultProps = {
    $size: 'md'
}

return (
    <Button />
)
```
```html
<button class="font:14 size:12x"></button>
```

### Apply based on function properties
Dynamically apply class names based on function properties.
```tsx
const Element = styled.div('fg:white',
    ({ $color }) => $color && `bg:${$color}`
)

return (
    <Element $color="blue" />
)
```
```html
<div class="inline-flex text:center fg:white bg:blue"></div>
```

### Apply based on matching properties
Applies the target class name matching all specified property keys and their values.
```tsx
const Button = styled.button('inline-flex',
    ['uppercase', { $intent: 'primary', $size: 'md' }]
)

return (
    <Button $intent="primary">Not matched</button>
    <Button $size="md">Not matched</button>
    <Button $intent="primary" $size="md">Matched</button>
)
```
```html
<button class="inline-flex">Not matched</button>
<button class="inline-flex">Not matched</button>
<button class="inline-flex uppercase">Matched</button>
```

## Extended
### Extend a styled element
Extend an existing styled element and add additional classes or conditions.
```tsx
const A = styled.p('a')
const B = styled.p(A)`b`

return (
    <A>A</A>
    <B>B</B>
)
```
```html
<p class="a">A</p>
<p class="a b">B</p>
```

### Change an element's tag name
Changing the original tag name of an element, such as `<button>` to `<a>`. Left empty '' even if there are no additional classes.
```tsx
const Button = styled.button('inline-flex')
const Link = styled.a(Button)``

return (
    <Button>button</Button>
    <Link href="#example">link</Link>
)
```
```html
<button class="inline-flex">button</button>
<a class="inline-flex" href="#example">link</a>
```

### Extend multiple styled elements
Extend multiple style elements at once.
```tsx
const A = styled.p`a`
const B = styled.p`b`
const C = styled.p`c`
const D = styled(A)(B)(C)`d`

return (
    <A>A</A>
    <B>B</B>
    <C>C</C>
    <D>D</D>
)
```
```html
<p class="a">A</p>
<p class="b">B</p>
<p class="c">C</p>
<p class="a b c d">D</p>
```

## Typings
```ts
declare type Props = {
    $size: 'sm' | 'md'
}

const Button = styled.button<Props>('flex', {
    $size: {
        sm: 'font:12 size:8x',
        md: 'font:14 size:12x'
    },
    disabled: 'opacity:.5'
})
```

## Overview `class-variant` APIs
```ts
import cv from 'class-variant'

const btn = cv(
    'inline-flex rounded',
    {
        intent: {
            primary: 'bg:blue fg:white bg:blue-60:hover',
            secondary: 'bg:white fg:slate-30 bg:slate-90:hover',
        },
        size: {
            sm: 'text:14 p:5|15',
            md: 'text:16 p:10|25'
        }
    },
    ['uppercase', { intent: 'primary', size: 'md' }],
    ({ indent, size }) => indent && size && 'font:semibold'
)

btn.default = {
    intent: 'primary',
    size: 'sm'
}

btn()
// inline-flex rounded bg:blue fg:white bg:blue-55:hover text:14 p:5|8 font:semibold

btn({ indent: 'secondary', size: 'sm' })
// inline-flex rounded bg:white fg:slate-30 bg:slate-90:hover text:14 p:5|8 font:semibold

btn({ indent: 'primary', size: 'md' })
// inline-flex rounded bg:blue fg:white bg:blue-55:hover text:16 p:10|25 uppercase font:semibold
```

## Community
The Master community can be found here:

- [Discuss on GitHub](https://github.com/master-co/styled/discussions) - Ask questions, voice ideas, and do any other discussion
- [Join our Discord Server](https://discord.com/invite/sZNKpAAAw6) - Casually chat with other people using the language <sup><sub>✓ 中文</sub></sup>

<sub>Our [《 Code of Conduct 》](https://github.com/master-co/styled/blob/main/.github/CODE_OF_CONDUCT.md) applies to all Master community channels.</sub>

## Contributing
Please see our [CONTRIBUTING](https://github.com/master-co/styled/blob/main/.github/CONTRIBUTING.md) for workflow.

## Inspiration
Some of our core concepts and designs are inspired by these giants.
- **Template Literal** - The use of template literals as syntactic sugar for reusing components is inspired by [Styled Components](https://styled-components.com/).

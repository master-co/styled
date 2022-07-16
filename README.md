<br><br>
<p align="center">
    <img src="https://raw.githubusercontent.com/master-co/package/document/images/logo-and-text.svg" alt="logo" width="142">
</p>
<p align="center">
    <b><!-- name -->@master/style-element.react<!----></b>
</p>
<p align="center"><!-- package.description -->Quickly create styled React elements using class names.<!----></p>

[![MIT License](https://flat.badgen.net/github/license/master-co/style-element.react?color=yellow)](https://github.com/master-co/style-element.react/blob/main/LICENSE)
[![Latest Release](https://flat.badgen.net/npm/v/@master/style-element.react?icon=npm&label&color=yellow)](https://www.npmjs.com/package/@master/style-element.react)
[![Bundle Size](https://flat.badgen.net/bundlephobia/minzip/@master/style-element.react?icon=packagephobia&label&color=yellow)](https://bundlephobia.com/package/@master/style-element.react 'gzip bundle size (including dependencies)')
[![Package Size](https://flat.badgen.net/badgesize/brotli/https://cdn.jsdelivr.net/npm/@master/style-element.react?icon=jsdelivr&label&color=yellow)](https://unpkg.com/@master/style-element.react 'brotli package size (without dependencies)')
[![Documentation](https://flat.badgen.net/badge/icon/Documentation?icon=awesome&label&color=yellow)](https://style-element.react.master.co)
[![Github](https://flat.badgen.net/badge/icon/master-co%2Fcss?icon=github&label&color=yellow)](https://github.com/master-co/style-element.react)
[![Discord](https://flat.badgen.net/badge/icon/discord?icon=discord&label&color=yellow)](https://discord.gg/sZNKpAAAw6)
[![CI](https://flat.badgen.net/github/status/master-co/style-element.react/main/ci/circleci?icon=circleci)](https://circleci.com/gh/master-co/workflows/style-element.react/tree/main)

###### On this page
- [Install](#install)
- [Principle](#principle)
- [Usage](#usage)
  - [Create a component](#create-a-component)
  - [Set class names with options/properties](#set-class-names-with-optionsproperties)

# Install
```sh
npm install @master/style-element.react
```

# Principle
Use syntactic sugar to implement functional components faster and styled.
```tsx
import React from 'react'
import el from '@master/style-element.react'

const Button = el.button`inline-flex center-content font:14 font:semibold font:white bg:indigo bg:indigo-54:hover px:18 h:40 r:4`

export default function App() {
    return (
        <Button className="uppercase" disabled>Submit</Button>
    )
}
```
The rendered HTML:
```html
<button className="uppercase inline-flex center-content font:14 font:semibold font:white bg:indigo px:18 h:40 r:4" disabled>
    Submit
</button>
```

# Usage

## Create a component
Let's take a reusable and styled section as an example.
```tsx
const Section = el.section`max-w:1200 mx:auto`
```
Apply it:
```tsx
return (
    <Section>section 1</Section>
    <Section>section 2</Section>
    ...
)
```

## Set class names with options/properties

```jsx
const Button = el.a`
    bg:${(props) => props.color}
    inline-flex
`
```
Apply it:
```tsx
return (
    <Button color="blue">...</Button>
    <Button color="red">...</Button>
)
```
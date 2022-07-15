<br><br>
<div align="center">

<p align="center">
    <img src="https://raw.githubusercontent.com/master-co/package/document/images/logo-and-text.svg" alt="logo" width="142">
</p>
<p align="center">
    <b><!-- name -->@master/style-element.react<!----></b>
</p>
</div>

On this page
- [Quick Start](#quick-start)
  - [1. Download](#1-download)
  - [2. Import into your js file](#2-import-into-your-js-file)

# Quick Start

## 1. Download
```sh
npm install @master/style-element.react
```
Or use a CDN

<!-- cdns.map((cdn) => ````html\n<script src="${cdn.href}"></script>\n```).join('') -->
<!-- -->

## 2. Import into your js file
```css
@import '{{ package.name }}';
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
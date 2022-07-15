<br><br>
<div align="center">

<p align="center">
    <img src="https://raw.githubusercontent.com/master-co/package/document/images/logo-and-text.svg" alt="logo" width="142">
</p>
<p align="center">
    <b><!-- name -->@master/style-element.react<!----></b>
</p>
<p align="center">
<!-- badges.map((badge) => `<a href="${badge.href}"><img src="${badge.src}" alt="${badge.alt}"></a>`).join('&nbsp;')-->

[![MIT License](https://flat.badgen.net/github/license/master-co/style-element.react?color=yellow)](https://github.com/master-co/css/blob/main/LICENSE)
[![Latest Release](https://flat.badgen.net/npm/v/@master/style-element.react?icon=npm&label&color=yellow)](https://www.npmjs.com/package/@master/style-element.react)
[![Bundle Size](https://flat.badgen.net/bundlephobia/minzip/@master/style-element.react?icon=packagephobia&label&color=yellow)](https://bundlephobia.com/package/@master/style-element.react 'gzip bundle size (including dependencies)')
[![Package Size](https://flat.badgen.net/badgesize/brotli/https://cdn.jsdelivr.net/npm/@master/style-element.react?icon=jsdelivr&label&color=yellow)](https://unpkg.com/@master/style-element.react 'brotli package size (without dependencies)')
[![Documentation](https://flat.badgen.net/badge/icon/Documentation?icon=awesome&label&color=yellow)](https://docs.master.co/css/reusing-design)
[![Github](https://flat.badgen.net/badge/icon/master-co%2Fstyle-element.react?icon=github&label&color=yellow)](https://github.com/master-co/style-element.react)
[![Discord](https://flat.badgen.net/badge/icon/discord?icon=discord&label&color=yellow)](https://discord.gg/sZNKpAAAw6)
[![CI](https://flat.badgen.net/github/status/master-co/style-element.react/main/ci/circleci?icon=circleci)](https://circleci.com/gh/master-co/workflows/style-element.react/tree/main)
<!---->
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
<!---->

## 2. Import into your js file
```css
@import '@master/style-element.react';
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
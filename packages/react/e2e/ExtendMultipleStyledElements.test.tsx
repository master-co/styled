import { test, expect } from '@playwright/experimental-ct-react'
import Element from './ExtendMultipleStyledElements'

test('element', async ({ mount }) =>
    await expect(await mount(<Element />))
        .toHaveClass('a b c d')
)

test('element tag name', async ({ mount }) =>
    await expect(await mount(<Element />))
        .toHaveJSProperty('tagName', 'P')
)
import { test, expect } from '@playwright/experimental-ct-react'
import Element from './ChangeAnElementTagName'

test('element', async ({ mount }) =>
    await expect(await mount(<Element />))
        .toHaveJSProperty('tagName', 'A')
)
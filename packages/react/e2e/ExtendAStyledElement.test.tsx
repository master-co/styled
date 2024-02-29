import { test, expect } from '@playwright/experimental-ct-react'
import Element from './ExtendAStyledElement'

test('element', async ({ mount }) =>
    await expect(await mount(<Element />))
        .toHaveClass('a b')
)
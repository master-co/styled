import { test, expect } from '@playwright/experimental-ct-react'
import Element from './ApplyBasedOnPredefinedVariants'

test('element', async ({ mount }) =>
    await expect(await mount(<Element $size="sm" disabled />))
        .toHaveClass('flex font:12 size:8x opacity:.5')
)
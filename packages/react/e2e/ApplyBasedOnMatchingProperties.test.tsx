import { test, expect } from '@playwright/experimental-ct-react'
import Element from './ApplyBasedOnMatchingProperties'

test('element', async ({ mount }) =>
    await expect(await mount(<Element $intent="primary" $size="md" />))
        .toHaveClass('inline-flex uppercase')
)

test('element without uppercase', async ({ mount }) =>
    await expect(await mount(<Element $intent="primary" />))
        .not.toHaveClass('uppercase')
)
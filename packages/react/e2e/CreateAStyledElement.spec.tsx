import { test, expect } from '@playwright/experimental-ct-react'
import Element from './CreateAStyledElement'

test('element', async ({ mount }) =>
    await expect(await mount(<Element className="uppercase" />))
        .toHaveClass('flex text:center uppercase')
)
import { test, expect } from '@playwright/experimental-ct-react'
import Element from './ApplyBasedOnProperties'

test('element', async ({ mount }) =>
    await expect(await mount(<Element color="blue" />))
        .toHaveClass('fg:white bg:blue')
)
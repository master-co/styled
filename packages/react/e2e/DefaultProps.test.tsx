import { test, expect } from '@playwright/experimental-ct-react'
import Element from './DefaultProps'

test('element', async ({ mount }) =>
    await expect(await mount(<Element $type={undefined} />))
        .toHaveClass('fg:white bg:red')
)
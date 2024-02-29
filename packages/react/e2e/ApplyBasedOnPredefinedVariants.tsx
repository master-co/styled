import styled from '../src';

const Element = styled.button('flex', {
    size: {
        sm: 'font:12 size:8x',
        md: 'font:14 size:12x'
    },
    disabled: 'opacity:.5'
})

export default Element
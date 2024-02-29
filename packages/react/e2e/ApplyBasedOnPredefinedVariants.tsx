import styled from '../src';

declare type Props = {
    $size: 'sm' | 'md'
}

const Button = styled.button<Props>('flex', {
    $size: {
        sm: 'font:12 size:8x',
        md: 'font:14 size:12x'
    },
    disabled: 'opacity:.5'
})

export default Button
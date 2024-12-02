import styled from '../src';

const Element = styled.div('fg:white', {
    $type: {
        a: 'bg:red',
        b: 'bg:blue'
    }
})

Element.default = {
    $type: 'a'
}

export default Element
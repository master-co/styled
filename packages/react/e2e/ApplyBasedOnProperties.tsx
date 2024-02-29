import styled from '../src';

const Element = styled.div('fg:white',
    ({ color }) => color && `bg:${color}`
)

export default Element
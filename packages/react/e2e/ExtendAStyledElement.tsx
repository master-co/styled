import styled from '../src';

const A = styled.p('a')
const B = styled.p(A)`b`

export default B
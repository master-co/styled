import styled from '../src';

const A = styled.p`a`
const B = styled.p`b`
const C = styled.p`c`
// todo: fix the issue with the following line
// @ts-expect-error
const D = styled(A)(B)(C)`d`

export default D
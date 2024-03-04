import styled from '../src'

const A = styled.p`a`
const B = styled.p`b`
const C = styled.p`c`
const D = styled(A)(B)(C)`d`

export default D
import type { NextPage } from 'next'
// @ts-ignore
import element from '!ts-loader!../../src'

const Button = element.button`
    inline-flex center-content 
    ${['font:14', 'font:semibold']}
    ${{ test: true, test2: false, test3: true}}
    font:white px:18 h:40 r:4
    bg:${({ color }: any) => color}
    bg:${({ color }: any) => color}-54:hover
`;

const Home: NextPage = () => {
    return (
        <div className="max-w:600 mx:auto p:50">
            <Button color="blue">Basic Button</Button>
        </div>
    )
}

export default Home

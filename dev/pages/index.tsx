import type { NextPage } from 'next'
// @ts-ignore
import el from '!ts-loader!../../src/index.tsx'

const BasicButton = el.button`inline-flex center-content font:14 font:semibold font:white bg:indigo bg:indigo-54:hover px:18 h:40 r:4`;

const Home: NextPage = () => {
    return (
        <div className="max-w:600 mx:auto p:50">
            <BasicButton>Basic Button</BasicButton>
        </div>
    )
}

export default Home

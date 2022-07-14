import type { NextPage } from 'next'
import { useRef } from 'react';
import el from '../../dist'

const BasicButton = el.button`inline-flex center-content font:14 font:semibold font:white bg:indigo px:18 h:40 r:4`;

const Home: NextPage = () => {
    const basicButtonRef = useRef<any>()
    return (
        <div className="max-w:600 mx:auto p:50">
            <BasicButton ref={basicButtonRef}>Basic Button</BasicButton>
            {basicButtonRef?.current?.className}
        </div>
    )
}

export default Home

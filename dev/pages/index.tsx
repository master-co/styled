import type { NextPage } from 'next'
import el from '../../dist'

const Button = el.button`inline-flex center-content font:14 font:semibold font:white bg:indigo px:18 h:40 r:4`;

const Home: NextPage = () => {
    return (
        <>
            <Button>Basic Button</Button>
        </>
    )
}

export default Home

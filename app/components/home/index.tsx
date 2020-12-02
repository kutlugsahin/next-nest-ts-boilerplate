import { useState } from 'react';
import { get } from '../../utils/fetch';
import Link from 'next/link';

export const Home = () => {
    const [foo, setFoo] = useState({foo: "unset"});

    async function getFoo() {
        const foo = await get('/foo');
        setFoo(foo);
    }

    return (
        <div>
            <h1>Home Page@@@</h1>
            <h2>{foo.foo}</h2>
            <button onClick={getFoo}>fetch Foo</button>
            <br/>
            <button>
                <Link href="/dashboard">goto dashboard</Link>
            </button>
        </div>
    )
}
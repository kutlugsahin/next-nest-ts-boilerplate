import { useState } from 'react';
import { get } from '../../utils/fetch';

export const Home = () => {
    const [foo, setFoo] = useState({foo: "unset"});

    async function getFoo() {
        const foo = await get('/foo');
        setFoo(foo);
    }

    return (
        <div>
            <h1>Home Page</h1>
            <h2>{foo.foo}</h2>
            <button onClick={getFoo}>fetch Foo</button>
        </div>
    )
}
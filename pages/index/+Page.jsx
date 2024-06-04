import { useAsync } from 'react-streaming'

const fetchSomething = async () => {
    await new Promise(r => setTimeout(r, 2_000));

    return Math.random();
}


const Index = () => {
    const data = useAsync('data', fetchSomething);

    return (
        <div>
            <h1>Home</h1>
            <h2>{data}</h2>
        </div>
    );
}

export default Index;
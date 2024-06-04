const Layout = ({ children }) => {
    return (
        <div>
            <h1>Homepage</h1>
            <ul>
                <li>
                    <a
                    href="/"
                    >Page with useAsync() hook</a>
                </li>
                <li>
                    <a
                    href="/data"
                    >Page with +data.js</a>
                </li>
                <li>
                    <a
                    href="/about"
                    >Page without fetching data</a>
                </li>
            </ul>
            <hr />
            {children}
        </div>
    );
}

export default Layout;
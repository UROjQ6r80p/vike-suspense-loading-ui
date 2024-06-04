import ReactDOM from 'react-dom/client'
import { App } from "./App";
import { withTransitionEnd } from "./withTransitionEnd";

let root;
function onRenderClient(pageContext) {
    const Page = withTransitionEnd(pageContext.Page);

    if (!Page) throw new Error('My onRenderClient() hook expects pageContext.Page to be defined')

    const container = document.getElementById('react-root')
    if (!container) throw new Error('DOM element #react-root not found')

    const page = (
        <App
        pageContext={pageContext}
        >
            <Page />
        </App>
    );

    if (pageContext.isHydration) {
        root = ReactDOM.hydrateRoot(container, page)
    } else {
        root ??= ReactDOM.createRoot(container)
        root.render(page)
    }
}

export {
    onRenderClient
}

import { escapeInject } from 'vike/server'
import { renderToStream } from 'react-streaming/server'
import { App } from './App';
import { withTransitionEnd } from "./withTransitionEnd";

async function onRenderHtml(pageContext) {
    const Page = withTransitionEnd(pageContext.Page);

    // Alternativly, we can use an HTML stream, see https://vike.dev/streaming
    const pageHtml = await renderToStream(
            <App
            pageContext={pageContext}
            >
                <Page />
            </App>,
            {
                disable: false
            }
        );

        const documentHtml = escapeInject`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>
            <body>
                <div id="react-root">${pageHtml}</div>
            </body>
            </html>`;

        return {
            documentHtml,
            pageContext: {
                // We can add custom pageContext properties here, see https://vike.dev/pageContext#custom
            }
        }
}

export { onRenderHtml }

import React, { Suspense } from 'react'
import { PageContextProvider } from './usePageContext';

export function App({
    pageContext,
    children
}) {

    const Page = pageContext.config.Page;

    if (!Page) {
        throw new Error(
            'My render() hook expects pageContext.Page to be defined'
        );
    }

    const PassThrough = ({ children }) => <>{children}</>;

    const loading = pageContext.config.loading;

    const SuspenseWrapper = ({ children }) => {
        return (
            <Suspense
            fallback={loading?.()}
            >{children}</Suspense>
        )
    }

    const SuspenseConditional = loading ? SuspenseWrapper : PassThrough;

    const Layout = pageContext.config.Layout ?? PassThrough;

    return (
        <React.StrictMode>
            <PageContextProvider
            pageContext={pageContext}
            >
                <Layout>
                    <SuspenseConditional>
                        {children}
                    </SuspenseConditional>
                </Layout>
            </PageContextProvider>
        </React.StrictMode>
    );
}

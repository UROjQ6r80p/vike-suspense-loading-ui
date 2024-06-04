import { useEffect } from "react";
import NProgress from "./nprogress";

const withTransitionEnd = (WrappedComponent) => {
        // Return a functional component
    return (props) => {
        useEffect(() => {
            NProgress.done();
    
            return () => {
                console.log('Component is unmounted');
            };
        }, []);
    
        // Render the WrappedComponent with its props
        return <WrappedComponent {...props} />
    }
}

export {
    withTransitionEnd
}

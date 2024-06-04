// https://vike.dev/config
export default {
    clientRouting: true,
    meta: {
        Page: {
            env: {
                client: true,
                server: true
            }
        },
        Layout: {
            env: {
                client: true,
                server: true
            }
        },
        loading: {
            env: {
                client: true,
                server: true
            }
        }
    },
    hydrationCanBeAborted: true
}

// @ts-check
import express from 'express';
import { renderPage } from 'vike/server';
import { ROOT_PATH } from './root-path.js';
import { join } from 'path';
import { once } from 'events';

const app = express();

if (process.env.NODE_ENV === 'production') {
    /**
     * bulletproof method, always works
     * instead of relying on process.cwd() that might be problematic
     * in e.g. vps using pm2
     */
    // @ts-ignore
    await import('../dist/server/entry.mjs');

    const sirv = (await import('sirv')).default;

    const DIST_PATH = join(ROOT_PATH, './dist/client');
    app.use(sirv(DIST_PATH, {
        maxAge: 31536000, // 1Y
        immutable: true
    }));
} else {
    const vite = await import('vite');

    const { middlewares } = await vite.createServer({
        root: ROOT_PATH,
        server: {
            middlewareMode: true
        }
    });

    app.use(middlewares);
}

app.get('*', async (req, res, next) => {
    try {
        const { httpResponse } = await renderPage({
            urlOriginal: req.originalUrl,
            userAgent: req.headers['user-agent']
        });

        if (!httpResponse) {
            return next();
        }

        const {
            statusCode,
            headers
        } = httpResponse;

        headers.forEach(([name, value]) => res.setHeader(name, value));
        res.status(statusCode);

        httpResponse.pipe(res);
    } catch (err) {
        next(err);
    }
});

// 'listening' is an event name
await once(app.listen(3000), 'listening');
console.log(`⚡ Server running at http://localhost:${3000}`);

// public/sw.js

// Use the exact, resolved URL so the Service Worker doesn't hit a redirect
importScripts('https://unpkg.com/@isomorphic-git/lightning-fs@4.6.0/dist/lightning-fs.min.js');

// Initialize the exact same database the frontend uses
const fs = new LightningFS('shesher_data').promises;

// Force the worker to activate immediately
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

// Force the worker to take control of the page immediately
self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// A simple dictionary to ensure the browser executes the files correctly
const mimeTypes = {
    '.html': 'text/html',
    '.js':   'application/javascript',
    '.css':  'text/css',
    '.json': 'application/json',
    '.png':  'image/png',
    '.jpg':  'image/jpeg',
    '.svg':  'image/svg+xml'
};

// THE PROXY INTERCEPTOR
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Only intercept requests that contain our virtual namespace "/~fs/"
    if (url.pathname.startsWith('/~fs/')) {
        event.respondWith(handleVirtualFetch(url.pathname));
    }
    // Otherwise, let the browser fetch it from the real internet normally
});

async function handleVirtualFetch(pathname) {
    try {
        // Strip the '/~fs' prefix to get the true LightningFS file path
        // e.g., "/~fs/projects/app.js" -> "/projects/app.js"
        const filePath = pathname.replace('/~fs', '');
        
        // Read the file from IndexedDB
        const content = await fs.readFile(filePath);
        
        // Determine the file extension to set the correct MIME type
        const ext = filePath.substring(filePath.lastIndexOf('.')).toLowerCase();
        const contentType = mimeTypes[ext] || 'text/plain';

        return new Response(content, {
            status: 200,
            headers: { 'Content-Type': contentType }
        });

    } catch (error) {
        console.error(`[Service Worker] 404 Not Found: ${pathname}`, error);
        return new Response('404 - Virtual File Not Found', { status: 404 });
    }
}
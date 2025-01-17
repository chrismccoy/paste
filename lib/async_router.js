const http = require('http');
const methods = http.METHODS.map(method => method.toLowerCase());

const asyncHandler = (handler) => (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
};

function toAsyncRouter(router) {
    methods.forEach(method => {
        const originalMethod = router[method];
        if (originalMethod) {
            router[method] = (path, ...callbacks) => {
                const asyncCallbacks = callbacks.map(asyncHandler);
                return originalMethod.call(router, path, ...asyncCallbacks);
            };
        }
    });
    return router;
}

module.exports = { toAsyncRouter };

class Controller {
    constructor(req, resp, next) {
        this.request = req;
        this.response = resp;
        this._next = next;
        this.data = {};
        this._nextCalled = false; // Renamed for clarity
    }

    get params() {
        return { ...this.request.params, ...this.request.body }; // Using spread operator for clarity
    }

    render(...args) {
        if (this._nextCalled) return;
        this.response.render(...args);
    }

    async handle(action) {
        const beforeAction = this.constructor.before[action];
        if (beforeAction) {
            await beforeAction.apply(this); // Awaiting the before action
        }
        await this[action]();
    }

    text(content, { contentType = "text" } = {}) { // Default parameter destructuring
        if (this._nextCalled) return;
        this.response.contentType(contentType);
        this.response.send(content);
    }

    redirect(url) {
        this.response.redirect(url);
    }

    next() {
        this._nextCalled = true;
        this._next();
    }
}

exports.Controller = Controller;

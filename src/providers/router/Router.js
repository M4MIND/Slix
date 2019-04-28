import AbstractController from "../../api/AbstractController";
import Route from "./Route";
import Request from "../../core/request/Request";
import RequestQuery from "../../core/request/query/RequestQuery";

export default class Router {
    constructor() {
        /** @type {Map<string, Map<string, Route>>} */
        this.collection = new Map();
    }

    /***
     * @param {string} route
     * @param {string} method
     * @param {function} handler
     * @param {AbstractController} controller
     * */
    mount(route, method, handler, controller = null) {
        let regExpRoute = route.replace(new RegExp(':(\\w+):', 'g'), this.constructor.pattern.full);
        let dynamic = !!route.match(new RegExp(':(\\w+):', 'g'));

        if (!this.collection.has(regExpRoute)) {
            this.collection.set(regExpRoute, new Map());
        }

        if (!this.collection.get(regExpRoute).has(method)) {
            this.collection.get(regExpRoute).set(method, new Route(regExpRoute, route, handler, controller, dynamic));
        }

        this.sorted();
    }

    sorted() {
        this.collection = new Map([...this.collection.entries()].sort((a, b) => {
            a = a[0] === '*' ? 0 : a[0].length;
            b = b[0] === '*' ? 0 : b[0].length;

            return b - a;
        }));
    }

    /**
     * @param {Request} request
     * @return Route
     * */
    findRoute(request) {
        /** Поиск статических путей */
        if (this.collection.has(request.path)) {
            if (this.collection.get(request.path).has(request.method)) {
                return this.collection.get(request.path).get(request.method);
            }
        }

        /** Поиск диамических путей */
        for (let key of this.collection.keys()) {
            if (key === '*') break;

            let matches = request.path.match(new RegExp(key, 'g'));

            if (!matches) continue;
            if (!this.collection.get(key).has(request.method)) continue;
            if (!this.collection.get(key).get(request.method).dynamic) continue;

            let route = this.collection.get(key).get(request.method);

            request.query.parse(route.pattern, route.route, request.path);
            return route;
        }

        /** 404 */
        if (this.collection.has('*')) {
            if (this.collection.get('*').has('*')) {
                return this.collection.get('*').get('*');
            }
        }
    }
}

Router.METHOD = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
    HEAD: "HEAD",
    CONNECT: "CONNECT",
    OPTIONS: "OPTIONS",
    TRACE: "TRACE",
    ALL: "*"
};

Router.pattern = {
    full: "([^?\\/]+)",
};
import Slix from "../Slix"
import Request from "../core/request/Request"

export default class AbstractController {

    /**
     * @param {Slix} App
     * */
    constructor(App) {
        this._App = App;
    };

    /** @param {Request} request */
    before = async (request) => {
        return null;
    };

    /** @param {Request} request */
    after = async (request) => {
        return null;
    };

    /** Function: Mounts the controller's request handler. */
    mount() {
        return null;
    };

    /**
     * @param {string} route
     * @param {function} handler
     * */
    ALL = (route, handler) => {
        this.App._mount(route, '*', handler, this);
    };

    /**
     * @param {string} route
     * @param {function} handler
     * */
    GET = (route, handler) => {
        this.App._mount(route, 'GET', handler, this);
    };

    /**
     * @param {string} route
     * @param {function} handler
     * */
    POST = (route, handler) => {
        this.App._mount(route, 'POST', handler, this);
    };

    /**
     * @param {string} route
     * @param {function} handler
     * */
    HEAD = (route, handler) => {
        this.App._mount(route, 'HEAD', handler, this);
    };

    /**
     * @param {string} route
     * @param {function} handler
     * */
    DELETE = (route, handler) => {
        this.App._mount(route, 'DELETE', handler, this);
    };

    /**
     * @param {string} route
     * @param {function} handler
     * */
    CONNECT = (route, handler) => {
        this.App._mount(route, 'CONNECT', handler, this);
    };

    /**
     * @param {string} route
     * @param {function} handler
     * */
    OPTIONS = (route, handler) => {
        this.App._mount(route, 'OPTIONS', handler, this);
    };

    /**
     * @param {string} route
     * @param {function} handler
     * */
    TRACE = (route, handler) => {
        this.App._mount(route, 'TRACE', handler, this);
    };

    /** @return {Slix} */
    get App() {
        return this._App
    }

    /** @param {Slix} value */
    set App(value) {
        this._App = value
    }
}
"use strict";

exports.default = void 0;

function _http() {
  const data = require("http");

  _http = function () {
    return data;
  };

  return data;
}

var _Request = require("../../core/request/Request");

var _PreparationResponse = require("../../core/response/PreparationResponse");

class HTTP {
  /**
   * @param {{
   *     host:string
   *     port:number
   *     callback: function
   * }} config
   * */
  constructor(config) {
    console.dir(config);
    this.http = (0, _http().createServer)((req, res) => {
      let body = [];
      req.on('err', err => {
        console.dir(err);
      }).on('data', data => {
        body.push(data);
      }).on('end', () => {
        req.body = body;
        config.callback(new _Request.default(req), new _PreparationResponse.default(res));
      });
    });
    this.http.listen({
      port: config.port,
      host: config.host
    });
  }

}

exports.default = HTTP;
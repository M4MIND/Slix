'use strict';

exports.default = void 0;

var _AbstractProvider = require('../api/AbstractProvider');

var _Log = require('./loggerServiceProvider/Log');

var _LogFile = require('./loggerServiceProvider/LogFile');

const config = {
    console: true,
    writeFile: true,
    pathFile: '/logs/',
    recordEventsLevel: [100, 200, 300, 500],
};

class LoggerServiceProvider extends _AbstractProvider.default {
    registration(App) {
        App.setParam(this.getName(), config);
    }

    boot(App) {
        App.set('log', (message, level = _Log.default.DEFAULT()) => {
            if (App.getParam(this.getName()).console) {
                _Log.default.console(message, level);
            }

            if (App.getParam(this.getName()).writeFile) {
                _LogFile.default.record();
            }
        });
    }
}

exports.default = LoggerServiceProvider;

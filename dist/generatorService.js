"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.printText = undefined;

var _generator = require("./generator");

var _generator2 = _interopRequireDefault(_generator);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _dotenv = require("dotenv");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)();

var setup = function setup() {
    if (_generator.hasLearned) return Promise.resolve();

    // TODO: Allow multiple input files?
    var filePath = process.env.INPUT_FILE_PATH;

    return new Promise(function (resolve, reject) {
        var data = _fs2.default.readFileSync(_path2.default.join(process.cwd(), filePath ? filePath : ".")).toString("utf8");

        (0, _generator.learn)(data.split("\n").flatMap(function (i) {
            return i.split(". ");
        }), 50);
        resolve();
    });
};

var printText = exports.printText = function printText(wordCount) {
    var initiator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    return setup().then(function () {
        console.log("--- " + (initiator ? initiator : "<No initiator>") + " ---");
        console.log((0, _generator2.default)(wordCount, initiator));
    });
};

exports.default = function () {
    var wordCount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 50;
    var initiator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    return setup().then(function () {
        return (0, _generator2.default)(wordCount, initiator);
    });
};
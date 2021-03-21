"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeObject = void 0;
var lodash_1 = require("lodash");
var sanitizeObject = function (root) {
    var childs = Object.keys(root);
    if (childs.length === 0)
        return {};
    var sanitizedRoot = {};
    var newRoot = {};
    lodash_1.forEach(childs, function (child) {
        var _a, _b;
        var value = root[child];
        if (!Array.isArray(value) && typeof value === "object") {
            newRoot = __assign(__assign({}, newRoot), (_a = {}, _a[child] = exports.sanitizeObject(value), _a));
        }
        else {
            newRoot = __assign(__assign({}, newRoot), (_b = {}, _b[child] = value, _b));
        }
    });
    lodash_1.forEach(childs, function (child) {
        var _a;
        var value = newRoot[child];
        if ((typeof value === "string" && value !== "") ||
            (Array.isArray(value) && value.length > 0) ||
            (typeof value === "object" && Object.keys(value).length > 0)) {
            sanitizedRoot = __assign(__assign({}, sanitizedRoot), (_a = {}, _a[child] = value, _a));
        }
    });
    return sanitizedRoot;
};
exports.sanitizeObject = sanitizeObject;
//# sourceMappingURL=sanitizeObject.js.map
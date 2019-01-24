"use strict";
exports.__esModule = true;
exports.Types = {
    array: function (transformInner, format) {
        return function (arr) {
            var res = [];
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                var obj = arr_1[_i];
                var key = Object.keys(obj)[0];
                obj[key] = transformInner(obj[key]);
                if (!isNaN(obj[key])) {
                    var row = {};
                    row[format.key] = key;
                    row[format.value] = obj[key];
                    res.push(row);
                }
            }
            return res;
        };
    },
    number: function (value) {
        return parseFloat(value.replace(/,/g, ''));
    },
    string: function (value) {
        return String(value);
    }
};
exports.validate = function (data, model) {
    var obj = {};
    for (var prop in model) {
        if (model.hasOwnProperty(prop)) {
            var value = data[prop];
            // remove property if contains N/A
            if (value.indexOf('N/A') === -1) {
                // transform value
                var validator = model[prop];
                obj[prop] = validator(value);
            }
            else {
                delete data[prop];
            }
        }
    }
    return obj;
};
//# sourceMappingURL=models.js.map
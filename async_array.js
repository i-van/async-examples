
var Q = require('q');

/**
 * @param {Array} [data]
 * @constructor
 */
function AsyncAray(data) {
    this._data = data || [];
}

/**
 * @param {string} index
 * @param {Function} [done]
 * @returns {Q.promise}
 */
AsyncAray.prototype.getByIndex = function(index, done) {
    var _this = this,
        deferred = Q.defer();
    done || (done = function() {});

    process.nextTick(function() {
        var res = _this._data[index];
        deferred.resolve(res);
        done(null, res);
    });

    return deferred.promise;
};

/**
 * @param {Function} [done]
 * @returns {Q.promise}
 */
AsyncAray.prototype.getLength = function(done) {
    var _this = this,
        deferred = Q.defer();
    done || (done = function() {});

    process.nextTick(function() {
        var res = _this._data.length;
        deferred.resolve(res);
        done(null, res);
    });

    return deferred.promise;
};

/**
 * @param {number} i
 * @param {number} j
 * @param {Function} [done]
 * @returns {Q.promise}
 */
AsyncAray.prototype.swap = function(i, j, done) {
    var _this = this,
        deferred = Q.defer();
    done || (done = function() {});

    process.nextTick(function() {
        var temp = _this._data[i];
        _this._data[i] = _this._data[j];
        _this._data[j] = temp;

        deferred.resolve();
        done();
    });

    return deferred.promise;
};

/**
 * @param {Function} [done]
 * @returns {Q.promise}
 */
AsyncAray.prototype.getData = function(done) {
    var _this = this,
        deferred = Q.defer();
    done || (done = function() {});

    process.nextTick(function() {
        var res = _this._data;
        deferred.resolve(res);
        done(null, res);
    });

    return deferred.promise;
};

module.exports = AsyncAray;

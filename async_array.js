
/**
 * @param {Array} [data]
 * @constructor
 */
function AsyncAray(data) {
    this._data = data || [];
}

/**
 * @param {string} index
 * @param {Function} done
 */
AsyncAray.prototype.getByIndex = function(index, done) {
    var _this = this;

    process.nextTick(function() {
        done(null, _this._data[index]);
    });
};

/**
 * @param {Function} done
 */
AsyncAray.prototype.getLength = function(done) {
    var _this = this;

    process.nextTick(function() {
        done(null, _this._data.length);
    });
};

/**
 * @param {number} i
 * @param {number} j
 * @param {Function} done
 */
AsyncAray.prototype.swap = function(i, j, done) {
    var _this = this;

    process.nextTick(function() {
        var temp = _this._data[i];
        _this._data[i] = _this._data[j];
        _this._data[j] = temp;

        done();
    });
};

/**
 * @param {Function} done
 */
AsyncAray.prototype.getData = function(done) {
    var _this = this;

    process.nextTick(function() {
        done(null, _this._data);
    });
};

module.exports = AsyncAray;

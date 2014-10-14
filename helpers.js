
var Q = require('q');

/**
 * @param {Function} condition
 * @param {Function} body
 * @returns {Q.promise}
 */
module.exports.while = function(condition, body) {
    var deferred = Q.defer();

    function loop() {
        if (!condition()) {
            return deferred.resolve();
        }
        Q.when(body(), loop, deferred.reject);
    }

    Q.nextTick(loop);

    return deferred.promise;
};


var AsyncArray = require('./async_array'),
    Q = require('q');

function sort(data) {
    var array = new AsyncArray(data);

    return array.getLength()
        .then(function(length) {
            var i = 0;

            return _while(
                function() {
                    return i < length;
                },
                function() {
                    var j = i + 1;

                    return _while(
                        function() {
                            return j < length;
                        },
                        function() {
                            return Q.all([array.getByIndex(i), array.getByIndex(j)])
                                .spread(function(first, second) {
                                    if (first < second) {
                                        return;
                                    }
                                    return array.swap(i, j);
                                })
                                .then(function() {
                                    return j++;
                                });
                        }
                    )
                    .then(function() {
                        return i++;
                    });
                }
            );
        })
        .then(function() {
            return array.getData();
        });
}

function _while(condition, body) {
    var deferred = Q.defer();

    function loop() {
        if (!condition()) {
            return deferred.resolve();
        }
        Q.when(body(), loop, deferred.reject);
    }

    Q.nextTick(loop);

    return deferred.promise;
}

sort([9, 5, 3, 7, 1]).then(
    function(res) {
        console.log(res);
    },
    function(err) {
        console.log(err);
    }
);

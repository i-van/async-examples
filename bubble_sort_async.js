
var AsyncArray = require('./async_array'),
    async = require('async');

function sort(data, done) {
    var array = new AsyncArray(data);

    async.waterfall([
        function(next) {
            array.getLength(next);
        },
        function(length, next) {
            var i = 0;

            async.whilst(
                function() {
                    return i < length;
                },
                function(done) {
                    var j = i + 1;

                    async.waterfall([
                        function(next) {
                            async.whilst(
                                function() {
                                    return j < length;
                                },
                                function(done) {
                                    async.waterfall([
                                        function(next) {
                                            async.series({
                                                first:  array.getByIndex.bind(array, i),
                                                second: array.getByIndex.bind(array, j)
                                            }, next);
                                        },
                                        function(res, next) {
                                            if (res.first < res.second) {
                                                return next();
                                            }
                                            array.swap(i, j, next);
                                        },
                                        function(next) {
                                            next(null, ++j);
                                        }
                                    ], done);
                                },
                                next
                            )
                        },
                        function(next) {
                            next(null, ++i);
                        }
                    ], done);
                },
                next
            );
        },
        function(next) {
            array.getData(next);
        }
    ], done);
}

sort([9, 5, 3, 7, 1], function(err, data) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(data);
});


var AsyncArray = require('./async_array'),
    helpers = require('./helpers'),
    Q = require('q');

function sort(data) {
    var array = new AsyncArray(data);

    return array.getLength()
        .then(function(length) {
            var i = 0;

            return helpers.while(
                function() {
                    return i < length;
                },
                function() {
                    var j = i + 1;

                    return helpers.while(
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

sort([9, 5, 3, 7, 1]).then(
    function(res) {
        console.log(res);
    },
    function(err) {
        console.log(err);
    }
);

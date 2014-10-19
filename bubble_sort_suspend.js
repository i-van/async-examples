
var AsyncArray = require('./async_array'),
    suspend = require('suspend');

var sort = suspend.async(function*(data) {
    var array = new AsyncArray(data),
        length = yield array.getLength(),
        first,
        second;

    for (var i = 0; i < length; i++) {
        for (var j = i + 1;  j < length; j++) {
            first = yield array.getByIndex(i);
            second = yield array.getByIndex(j);
            if (first > second) {
                yield array.swap(i, j);
            }
        }
    }

    return yield array.getData();
});

sort([9, 5, 3, 7, 1], function(err, data) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(data);
});

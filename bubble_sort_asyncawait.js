
var AsyncArray = require('./async_array'),
    async = require('asyncawait/async'),
    await = require('asyncawait/await');

var sort = async.cps(function(data) {
    var array = new AsyncArray(data),
        length = await(array.getLength());

    for (var i = 0; i < length; i++) {
        for (var j = i + 1;  j < length; j++) {
            if (await(array.getByIndex(i)) > await(array.getByIndex(i))) {
                await(array.swap(i, j));
            }
        }
    }

    return await(array.getData());
});

sort([9, 5, 3, 7, 1], function(err, data) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(data);
});

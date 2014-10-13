
var i = 0;
var j = 0;
var prevI = 0;
var arr = [9, 5, 3, 7, 1];
var n = arr.length;

for (; i < n - 1; i++) {
    j++;
    if (j < n) {
        i = prevI;
    } else {
        j = i + 1;
    }
    prevI = i;

    if (arr[i] > arr[j]) {
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

console.log(arr);

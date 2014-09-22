if (typeof String.prototype.startsWith != 'function') {
    // see below for better implementation!
    String.prototype.startsWith = function (str) {
        return this.indexOf(str) == 0;
    };
}

if (typeof array_rand != 'function') {
    function array_rand(min, max, qty) {
        var arr = new Array();
        while (arr.length < qty) {
            var n = Math.floor(Math.random() * (max - min + 1)) + min;
            if (!in_array(n, arr)) {
                arr.push(n);
            }
        }
        return arr;
    }
}

if (typeof in_array != 'function') {
    function in_array(needle, haystack) {
        var length = haystack.length;
        for (var i = 0; i < length; i++) {
            if (haystack[i] == needle) return true;
        }
        return false;
    }
}

if (typeof numeric_sort != 'function') {
    function numeric_sort(a, b) {
        return a - b;
    }
}

